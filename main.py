import os

from dotenv import load_dotenv, dotenv_values

from flask import Flask, redirect, session, url_for, request

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

from auth import sp, sp_oauth, cache_handler
from gnomeinfo import *

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

# home endpoint: initial check for authetication
@app.route('/')  
def home():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()): # check if user is autheticated, if not redirect to spotify login
        auth_url = sp_oauth.get_authorize_url()
        print(auth_url)
        return redirect(auth_url)   
    return redirect(url_for('get_playlists')) # name of the method should go in the (), 'get_playlists' will need to be changed 

# callback endpoint: after authetication, get access token & redirect back to Gnome Trips 
@app.route('/callback')
def callback():
    token_info = sp_oauth.get_access_token(request.args['code'])
    print('Am I HERE')
    print(token_info)
    session['token_info'] = token_info
    return redirect(url_for('get_playlists'))

# get_playlists endpoint: validate token, fetch & print a user's playlists (this function is just an example and should be changed to fit our project)
@app.route('/get_playlist')
def get_playlists():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()): # code duplication! abstract this if statement into its own method 
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    
    playlists = sp.current_user_playlists()
    playlists_info = [(pl['name'], pl['external_urls']['spotify']) for pl in playlists['items']]
    playlists_html = '<br>'.join([f'{name}: {url}' for name, url in playlists_info])

    return playlists_html

# logout endpoint: clear the session and redirect the user to the home page 
@app.route('/logout') 
def logout():
    session.clear()
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

#gnomeFunc()