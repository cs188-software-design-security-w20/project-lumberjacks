import json

from flask import request, redirect, render_template
from flask_login import login_required

from . import main
from flaskr.db_manager import DatabaseManager

db_manager = DatabaseManager.get_instance()


@main.route('/', methods=['GET', 'POST'])
def index():
    return 'Test'


@main.route('/login', methods=['POST'])
def login():
    payload = request.get_json(force=True)
    user_info = db_manager.log_in(payload)
    if user_info == -1:
        return {'error': 'User doesn\'t exist'}
    elif user_info == -2:
        return {'error': 'Incorrect password'}
    elif user_info == -3:
        return {'error': 'Server error'}
    else:
        return user_info


@main.route('/logout')
@login_required
def logout():
    db_manager.logout()
    return {'message': 'Success'}


@main.route('/auth', methods=['GET'])
def auth():
    user_info = db_manager.auth()
    if user_info is not None:
        return user_info
    else:
        return {'error': 'Could not authenticate'}
