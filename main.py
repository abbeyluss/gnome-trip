import os
import random

from dotenv import load_dotenv, dotenv_values

from flask import Flask, redirect, session, url_for, request

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

from auth import authenticate,cache_handler
from gnomeinfo import *

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

sp, sp_oauth = authenticate()

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
    token_info = sp_oauth.get_access_token(request.args['code'])
    session['token_info'] = token_info
    return redirect(url_for('get_recs'))

# get_playlists endpoint: validate token, fetch & print a user's playlists (this function is just an example and should be changed to fit our project)
# @app.route('/get_playlist')
# def get_playlists():
#     if not sp_oauth.validate_token(cache_handler.get_cached_token()): # code duplication! abstract this if statement into its own method 
#         auth_url = sp_oauth.get_authorize_url()
#         return redirect(auth_url)
    
#     playlists = sp.current_user_playlists()
#     playlists_info = [(pl['name'], pl['external_urls']['spotify']) for pl in playlists['items']]
#     playlists_html = '<br>'.join([f'{name}: {url}' for name, url in playlists_info])

#     return playlists_html

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
        albums = sp.artist_albums(artist['id'], album_type='album', limit=50)
        all_albums.extend(albums['items'])

    all_songs = []

    # get all songs from all albums
    for album in all_albums:
        songs = sp.album_tracks(album['id'])
        all_songs.extend(songs['items'])

    # randomly pick songs
    bella_list = []

    count = 0
    while count <= 30:
        x = random.randint(0, (len(all_songs) - 1))
        bella_list.append(all_songs[x])
        all_songs.pop(x)
        count += 1
    

    song_names = [(a['name']) for a in bella_list]
    print(song_names)
    songs_html  = [f'{name}' for name in song_names]

    return songs_html

    # song_details = [
    #     f"{song['name']} - {', '.join(artist['name'] for artist in song['artists'])}"
    #     for song in bella_list
    # ]

    # print(song_details)

    # user = sp.current_user()
    # user_id = user['id']
    # print(user_id)
    # uri_list = []
    # sp.user_playlist_create(user_id, "Gnome Trip Playlist!", public=True, collaborative=False, description='A playlist for your travels')
    # for song in bella_list:
    #     uri_list.append(str(song['uri']))
    # for item in uri_list:
    #     item.replace("spotify:track:", "")
    # print(uri_list)
    # playlist = sp.playlist_add_items(user_id, uri_list, position=None)
    # playlist_url = playlist['spotify']
    # print(playlist_url)

    # songs_html = [f'{detail}' for detail in song_details]

    # return songs_html





# logout endpoint: clear the session and redirect the user to the home page 
@app.route('/logout') 
def logout():
    session.clear()
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
