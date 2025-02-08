import os

from dotenv import load_dotenv, dotenv_values

from flask import Flask, redirect, session, url_for, request

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

from auth import sp

def gnomeFunc():
    print(sp)
    print(sp.current_user_playlists())