# flake8 compatible
import sqlalchemy

from collections import defaultdict
from datetime import datetime, date, time, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .model import User
from flask_login import login_user, login_required, current_user, logout_user

class DatabaseManager():
    __instance = None

    @staticmethod
    def get_instance():
        if DatabaseManager.__instance is None:
            DatabaseManager()
        return DatabaseManager.__instance

    def __init__(self):
        if DatabaseManager.__instance is not None:
            raise Exception("You can only create one database manager!")
        else:
            DatabaseManager.__instance = self

    def add_user(self, user_json):
        '''
        Add new user if information not duplicate
        '''
        has_user = User.query.filter(db.or_(
            User.email == user_json['email'],
            User.username == user_json['username'],
        )).first()
        if not has_user:
            new_user = User(
                username=user_json['username'],
                email=user_json['email'],
                password_hash=generate_password_hash(user_json['password']),
            )
            db.session.add(new_user)
            db.session.commit()
            return True
        return False

    def log_in(self, user_json):
        '''
        Logs in using email or username and password
        '''
        if len(user_json['email'] > 0):
            current_user = User.query.filter_by(
                email=user_json['email']
                ).first()

        if not current_user:
            if len(user_json['username'] > 0):
                current_user = User.query.filter_by(
                    username=user_json['username']
                    ).first()

        if not current_user:
            return -1

        remember = user_json['remember'] == 'true'
        if check_password_hash(current_user.password_hash, user_json['password']):
            login_user(current_user, remember=remember)
            return {'name': current_user.username, 'email': current_user.email}
        else:
            return -2
        return -3
    
    def auth(self):
        '''
        Auth which can be polled for
        '''
        if current_user.is_authenticated:
            return {'name': current_user.username, 'email': current_user.email}
        else:
            return None
    
    @login_required
    def logout(self):
        logout_user()
    
    @login_required
    def get_username(self):
        return current_user.username

    @login_required
    def edit_user(self, user_json):
        '''
        Takes in a json-converted dict including 4 fields about a user:
        username: string, email: string,
        password: string, is_instructor: string
        Updates existing user info in the database.
        '''
        current_user.username = user_json['username']
        current_user.email = user_json['email']
        if (len(user_json['password'])>2) :
            current_user.password_hash = str(generate_password_hash(user_json['password']))

        db.session.commit()
        return True