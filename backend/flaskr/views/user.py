import json

from flask import request, redirect, render_template, Response
from flask_login import login_required

from . import main
from flaskr.db_manager import DatabaseManager

db_manager = DatabaseManager.get_instance()


@main.route('/create_user', methods=['POST'])
def sign_up():
    payload = request.get_json(force=True)

    parameters = ['username', 'email', 'password']
    if not all(param in payload for param in parameters):
        return Response('Name, Email, and/or Password is missing.', status=400, mimetype='applicaton/text')

    new_user = db_manager.add_user(payload)
    if new_user:
        return Response('User Successfully Created.', status=201, mimetype='application/text')
    else:
        return Response('Duplicate user exists', status=409, mimetype='application/text')


@main.route('/edit_user', methods=['POST'])
@login_required
def edit_user():
    if (db_manager.edit_user(request.get_json(force=True))):
        return {'message': 'Success'}


@main.route('/get_name', methods=['GET'])
@login_required
def get_name():
    return {'username': db_manager.get_username()}
