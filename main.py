import os

from dotenv import load_dotenv, dotenv_values

from flask import Flask, session

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler


load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)


if __name__ == '__main__':
    app.run(debug=True)

client_id='bcbf028279894f78b9502f436ebf01d7'
client_secret='f8cbebfebfea44b2badb2178c7977376'
redirect_uri= 'http://localhost:5000/callback'
scope = 'playlist-read-private, user-read-recently-played, playlist-modify-private' # search for scopes page in API documentation and modify as needed


