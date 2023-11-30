from flask import request

from app import create_app, db
# from flask_migrate import Migrate

app = create_app('development')

# -------- Server Deployment Configuration -------- #
HOST = '127.0.0.1'
PORT = 7080
# -------------------------------------------------------- #

if __name__ == '__main__':
    # app.run(host=HOST, port=PORT, debug=True, ssl_context='adhoc')
    app.run(host=HOST, port=PORT, debug=True)
    