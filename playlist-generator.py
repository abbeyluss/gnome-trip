import os

from spotipy import *

from main import sp

# get values for top artists and tracks

top_artists = sp.current_user_top_artists(limit=5, time_range='short_term')
top_tracks = sp.current_user_top_tracks(limit=5, time_range='short_term')

