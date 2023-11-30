from datetime import datetime

from flask import render_template, request, jsonify, current_app, session, redirect, url_for, flash
from flask import render_template, request, jsonify, current_app, redirect, url_for, session
from sqlalchemy import desc
from app import db
from app.models import User, Rider
from config import Config
from . import main


@main.route('/')
def index():
    db.drop_all()
    db.create_all()
    u1 = User(id=1, email="test@gmail.com", username="test", gender="non-binary", age=18, city="Seattle", mbti="REST")
    r1 = Rider(id=1, start=-33.8, end=442.5, content="Travel", time=datetime.utcnow(), user_id=1)
    r2 = Rider(id=2, start=-33.8, end=442.5, content="Travel", time=datetime.utcnow(), user_id=1)
    r3 = Rider(id=3, start=-33.8, end=442.5, content="Travel", time=datetime.utcnow(), user_id=1)
    db.session.add(u1)
    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.commit()
    return "<h1 > Home Page </hi>"

@main.route('/postData', methods=['POST'])
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

@main.route('/getPost', methods=['GET'])
def getPost():
    # get all post data from database
    # find the nearest posts for start and end position
    # try to print information
    posts = Rider.query.all()
    post_list = []
    for post in posts:
        post_dic = dict(id=post.id, start=post.start, end=post.end, time=post.time)
        post_list.append(post_dic)
    print(post_list)

