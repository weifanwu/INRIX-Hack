from flask import Flask, request, jsonify
from flask_cors import CORS

# Create the app instance
app = Flask(__name__)
CORS(app)

# Sample post data
post_data = [
    {
        'post_id': 1,
        'start': 'Space Needle, Broad Street, Seattle, WA',
        'end': 'Nana’s Green Tea, Stewart Street, Seattle, WA'
    },
    {
        'post_id': 2,
        'start': [47.625168, -122.337751],
        'end': [47.625168, -122.337751]
    },
    {
        'post_id': 3,
        'start': [47.625168, -122.337751],
        'end': [47.625168, -122.337751]
    }
]

@app.route('/')
def index():
    return "<h1>Home Page</h1>"

@app.route('/postData', methods=['POST'])
def postData():
    print("Post Data")
    data = request.get_json()
    return jsonify({"response": 'success'})

@app.route('/getPost', methods=['GET'])
def getPost():
    # Here, you might want to implement logic to retrieve data from a database
    # and find the nearest posts for start and end positions.
    # For now, let's just return the sample post_data.
    return jsonify({"posts": ""})

if __name__ == '__main__':
    app.run(debug=True)
