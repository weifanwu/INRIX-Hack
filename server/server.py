from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

# create the app instance
app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins="*")
CORS(app)

@app.route('/')
def index():
    return "<h1 > Home Page </hi>"

@app.route('/postData', methods=['POST'])
def postData():
    data = request.get_json()
    print(data['start'], data['end'])
    return {"response": 'success'}

"""
post_data = {
    {
        post_id = 1;
        start: Space Needle, Broad Street, Seattle, WA;
        end: Nana’s Green Tea, Stewart Street, Seattle, WA;
    }

    {
        post_id = 2;
        start: [47.625168, -122.337751]
        end: [47.625168, -122.337751];
    }

    {
        post_id = 3;
        start: [47.625168, -122.337751]
        end: [47.625168, -122.337751];
    }
}
"""

@app.route('/testGetPost', methods=['GET'])
def testGetPost():
    # get all post data from database
    # find the nearest posts for start and end position
    # try to print information
    data = [
        {
            "post_id": 1,
            "start": [47.625168, -122.337751],
            "end": [47.618956, -122.344144]
        },
        {
            "post_id": 2,
            "start": [47.625168, -122.337751],
            "end": [47.613086, -122.347959]
        },
    ]
    return jsonify(data)
    # return json.dumps(data)

@app.route('/json')
def send_json():
    data = {
        "name": "John",
        "age": 30,
        "city": "New York"
    }
    return json.dumps(data)

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit("connected")

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    emit('message', message, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)