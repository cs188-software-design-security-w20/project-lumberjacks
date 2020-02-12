# flake8 compatible
import os
from flask import Flask
from flask_login import UserMixin
from . import db


class User(UserMixin, db.Model):
    '''
    Stores users
    '''
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index = True)
    email = db.Column(db.String(128), unique=True, index = True)
    password_hash = db.Column(db.String(128))

    def is_authenticated(self):
        return True