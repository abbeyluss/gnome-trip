import os

from flask import Flask, session

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

client_id
client_secret
redirect_uri
scope

if __name__ == '__main__':
    app.run(debug=True)
