# flake8 compatible
import sqlalchemy
import uuid

from collections import defaultdict
from datetime import datetime, date, time, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .model import User, Link, PostType, VisibilityType
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
        Update user info
        '''
        current_user.username = user_json['username']
        current_user.email = user_json['email']
        if (len(user_json['password'])>2) :
            current_user.password_hash = str(generate_password_hash(user_json['password']))

        db.session.commit()
        return True

    @login_required
    def add_link(self, link_json):
        '''
        Create link
        '''
        shortlink = uuid.uuid4().hex.upper()[0:6]
        name = link_json['name']
        links = link_json['links']
        visibility = link_json['visibility']
        post_type = link_json['post_type']
        repost_id = link_json['repost_id'] if post_type == PostType.REPOST \
             else -1
        time_created = datetime.now()
        author_id = current_user.id

        new_link = Link(
                shortlink=shortlink,
                name=name,
                links=links,
                visibility=visibility,
                post_type=post_type,
                repost_id=repost_id,
                time_created=time_created,
                author_id=author_id
            )
        try:
            db.session.add(new_link)
            db.session.commit()
            return {'shortlink': shortlink}
        except sqlalchemy.exc.IntegrityError:
            return {'error': 'Server error'}

    def shortlink_to_link_id(self, shortlink):
        '''
        Convert from shortlink to link_id
        '''
        link = Link.query.filter_by(
                    shortlink=shortlink
                ).first()

        if not link:
            return {'error': 'Shortlink not found'}
        else:
            return {'id': link.id}     

    def get_link(self, link_id):
        '''
        Get link
        '''
        link = Link.query.filter_by(
                    id=link_id
                ).first()

        if not link:
            return {'error': 'Link not found'}
        else:
            return link.as_dict()

    @login_required
    def get_authored_links(self, limit, offset):
        '''
        Get links authored by self
        '''
        authored_links = Link.query.filter_by(author_id=current_user.id).\
            offset(offset).limit(limit)
        return [authored_link.as_dict() for authored_link in authored_links]

    def get_public_links(self, limit, offset):
        '''
        Get most recent public links
        '''
        public_links = Link.query.filter_by(visibility=VisibilityType.PUBLIC).\
            order_by(Link.time_created).offset(offset).limit(limit)
        return [public_link.as_dict() for public_link in public_links]

    def check_permissions(self, link):
        '''
        Check permissions of viewing
        Return code 0 = okay
        code 1 = age-restricted
        code 2 = not viewable
        '''       
        if link['visibility'] == VisibilityType.PUBLIC and \
            link['age_restricted'] and \
             ((current_user is not None and current_user.age < 18) or \
             current_user is None):
            return 1

        if link['visibility'] == VisibilityType.PUBLIC or \
             (current_user is not None and current_user.id == link['author_id']):
            return 0

        return 2

