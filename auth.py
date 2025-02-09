import os

from dotenv import load_dotenv, dotenv_values

from flask import Flask, redirect, session, url_for, request

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

client_id='bcbf028279894f78b9502f436ebf01d7'
client_secret='0a25b41c4f384887be1f8822a55305f8'
redirect_uri= 'http://localhost:5001/callback'
scope = 'user-top-read' # search for scopes page in API documentation and modify as needed
cache_handler = FlaskSessionCacheHandler(session)

global sp
sp = 0
def authenticate():
    sp_oauth = SpotifyOAuth( # use this variable for authorizations and tokens 
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri=redirect_uri,
    scope=scope,
    cache_handler=cache_handler,
    show_dialog=True    # optional 
    )
    sp = Spotify(auth_manager=sp_oauth) # spotify client, use to call functions on Spotify API (calls sp_oauth for authorization validation)
    return sp, sp_oauth

