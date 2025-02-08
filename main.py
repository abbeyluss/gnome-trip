import os

from dotenv import load_dotenv, dotenv_values

from flask import Flask, redirect, session, url_for, request

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler


load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)


client_id='bcbf028279894f78b9502f436ebf01d7'
client_secret='f8cbebfebfea44b2badb2178c7977376'
redirect_uri= 'http://localhost:5000/callback'
scope = 'playlist-read-private, user-read-recently-played, playlist-modify-private' # search for scopes page in API documentation and modify as needed

cache_handler = FlaskSessionCacheHandler(session)

sp_oauth = SpotifyOAuth(
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri=redirect_uri,
    scope=scope,
    cache_handler=cache_handler,
    show_dialog=True    # optional 
)

sp = Spotify(auth_manager=sp_oauth)


# endpoints

@app.route('/')
def home():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    return(url_for('get_playlists')) # name of the method should go in the (), 'get_playlists' will need to be changed 


@app.route('/callback')
def callback():
    sp_oauth.get_access_token(request.args['code'])
    return(url_for('get_playlists'))

if __name__ == '__main__':
    app.run(debug=True)


