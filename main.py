import os
import random

from dotenv import load_dotenv, dotenv_values

from flask import Flask, redirect, session, url_for, request, jsonify
from flask_cors import CORS

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

from auth import authenticate,cache_handler, client_secret, client_id, redirect_uri
import requests
import base64


load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests
app.config['SECRET_KEY'] = os.urandom(64)

sp, sp_oauth = authenticate()

SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
FRONTEND_URL = "http://localhost:5173/setup"

# home endpoint: initial check for authetication
@app.route('/')  
def home():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()): # check if user is autheticated, if not redirect to spotify login
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)   
    return redirect(url_for('get_recs')) # name of the method should go in the (), 'get_playlists' will need to be changed 

# callback endpoint: after authetication, get access token & redirect back to Gnome Trips 
@app.route('/callback')
def callback():
    #Handle Spotify callback and exchange code for an access token
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Authorization code missing"}), 400
    
    token_info = sp_oauth.get_access_token(request.args['code'])
    session['token_info'] = token_info
    #return redirect(url_for('get_recs'))

    token_response = requests.post(
        SPOTIFY_TOKEN_URL,
        headers={
            "Authorization": "Basic " + base64.b64encode(f"{client_id}:{client_secret}".encode()).decode(),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data={"grant_type": "authorization_code", "code": code, "redirect_uri": redirect_uri},
    )

    token_data = token_response.json()
    return redirect(url_for('get_recs'))

@app.route('/get_recs')
def get_recs():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()): # code duplication! abstract this if statement into its own method 
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    
    # get top 50 artists
    top_artists = sp.current_user_top_artists(limit=50, time_range='short_term')  

    all_albums = []

    # get values for top albums from top 50 artists 
    for artist in top_artists['items']:
        albums = sp.artist_albums(artist['id'], album_type='album', limit=3)
        all_albums.extend(albums['items'])

    all_songs = []

    # get all songs from all albums
    for album in all_albums:
        songs = sp.album_tracks(album['id'])
        all_songs.extend(songs['items'])

    # randomly pick songs
    bella_list = []

    # making playlist 30 songs long
    count = 0
    while count < 30:
        x = random.randint(0, (len(all_songs) - 1))
        bella_list.append(all_songs[x])
        all_songs.pop(x)
        count += 1
    
    #creating playlist
    user = sp.current_user()
    user_id = user['id']
    uri_list = []
    playlist_creator = sp.user_playlist_create(user_id, "Gnome Trip Playlist!", public=True, collaborative=False, description='A playlist for your travels')
    playlist_id = playlist_creator['id']
    #print(playlist_id)

    #adding songs to playlist
    for song in bella_list:
        uri_list.append(song['uri'])
    sp.playlist_add_items(playlist_id, uri_list, position=None)

    #getting url for playlist
    url = sp.playlist(playlist_id, fields='external_urls', market=None, additional_types=('track',))
    url = url['external_urls']['spotify']
    print(url)


    #return url
    return redirect(f"{FRONTEND_URL}?playlistUrl={url}")
    




# logout endpoint: clear the session and redirect the user to the home page 
@app.route('/logout') 
def logout():
    session.clear()
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
