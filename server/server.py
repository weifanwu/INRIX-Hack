from flask import Flask, request, json, jsonify
from flask_cors import CORS

# create the app instance
app = Flask(__name__)
# CORS(app)

@app.route('/')
def index():
    return "<h1 > Home Page </hi>"


@app.route('/postData', methods=['POST'])
def postData():
    data = request.get_json()
    print(data['start'], data['end'])

    print("End: " + str(data['end']))
    print("Start: " + str(data['start']))
    print("Date: " + data['date'])
    print("Content: " + data['content'])

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

if __name__ == '__main__':
    app.run(debug = True)   # developer mode