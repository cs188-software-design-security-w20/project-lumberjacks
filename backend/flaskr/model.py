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
    username = db.Column(db.String(64), index=True)
    email = db.Column(db.String(128), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    age = db.Column(db.Integer)

    def is_authenticated(self):
        return True

class VisiilityType:
    '''
    Enum for diff visibilities 
    '''
    PRIVATE = 0
    PUBLIC = 1
    AGE_RESTRICTED = 2 # implies public

class PostType:
    '''
    Enum for diff post types
    '''
    DEFAULT = 0
    REPOST = 1

class Link(db.Model):
    __tablename__ = 'links'
    id = db.Column(db.Integer, primary_key=True, index=True)
    shortlink = db.Column(db.String(64), unique=True)
    links = db.Column(db.ARRAY(db.String, dimensions=1), nullable=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
    repost_id = db.Column(db.Integer, nullable=True)
    visibility = db.Column(db.Integer, default=VisiilityType.PRIVATE)
    post_type = db.Column(db.Integer, default=PostType.DEFAULT)
    upvotes = db.Column(db.Integer, default=0)
