import json

from flask import request, redirect, render_template
from flask_login import login_required

from . import main

@main.route('/create_user', methods=['POST']) 
def sign_up():
    new_user = db_manager.add_user(request.get_json(force=True))
    if new_user:
        return {'message': 'Success'}
    else:
        return {'message': 'User exists'}

@main.route('/edit_user', methods=['POST'])
@login_required
def edit_user():
    if (db_manager.edit_user(request.get_json(force=True))):
        return {'message': 'Success'}

@main.route('/get_name', methods=['GET'])
@login_required
def get_name():
    return {'username': db_manager.get_username()}
