import os

from spotipy import *

from main import sp

# get values (& seed values) for top artists and tracks
top_artists = sp.current_user_top_artists(limit=5, time_range='short_term')
top_tracks = sp.current_user_top_tracks(limit=5, time_range='short_term')
seed_artist_ids = [artist['id'] for artist in top_artists['items']]
seed_track_ids = [track['id'] for track in top_tracks['items']]


recommendations=sp.recommendations(seed_artist_ids, seed_track_ids) # add code for target dancability, energy, etc. 

for track in recommendations['tracks']:
    track_name = track['name']
    artists = ", ".join(artist['name'] for artist in track['artists'])
    print(f"{track_name} by {artists}")



