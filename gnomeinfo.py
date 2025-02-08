import os

from dotenv import load_dotenv, dotenv_values

from flask import Flask, redirect, session, url_for, request

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

from auth import sp

def gnomeFunc():
    print(sp)
    print(sp.current_user_top_tracks(40))
    tracks = sp.current_user_top_tracks(40)
    items = tracks['items']
    tracks_info = [(t['']) for t in items['TrackObject']]
    playlists = sp.current_user_playlists()
    playlists_info = [(pl['name'], pl['external_urls']['spotify']) for pl in playlists['items']]
    playlists_html = '<br>'.join([f'{name}: {url}' for name, url in playlists_info])


#get users top songs

#do some analysis

#get some colors


