from flask import Flask

# create the app instance
app = Flask(__name__)

@app.route('/')
def index():
    return "<h1 > Home Page </hi>"

@app.route('/members')
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == '__main__':
    app.run(debug = True)   # developer mode