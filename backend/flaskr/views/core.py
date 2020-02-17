import json

from flask import request, redirect, render_template
from flask_login import login_required

from . import main
from flaskr.db_manager import DatabaseManager
from flaskr.model import VisibilityType, PostType

db_manager = DatabaseManager.get_instance()


@main.route('/<shortlink>', methods=['GET'])
def get_links(shortlink):
    link_id = db_manager.shortlink_to_link_id(shortlink)['id']
    link = db_manager.get_link(link_id)
    permissions = db_manager.check_permissions(link)
    # fine
    if permissions == 0:
        return {'links': links['links']}
    # age-restricted
    elif permissions == 1:
        return {'error': 'This content has been age-restricted'}
    # private / not logged in
    elif permissions == 2:
        return {'error': 'This link is private. If it is yours, you need to log in.'}


@main.route('/add_link', methods=['POST'])
@login_required
def add_link():
    payload = request.get_json(force=True)
    parameters = ['name', 'links']

    if not all(param in payload for param in parameters):
        return Response('Name or Links is missing.', status=400, mimetype='applicaton/text')

    db_payload = {
        'name': payload['name'],
        'links': payload['links'],
        'visibility': payload.get('visibility', VisibilityType.PRIVATE),
        'post_type': payload.get('post_type', PostType.DEFAULT),
        'repost_id': payload.get('repost_id', -1)
    }

    add_link_response = db_manager.add_link(db_payload)
    if 'error' in link_success:
        return Response(add_link_response['error'], status=500, mimetype='application/text')
    else:
        return Response({'message': 'Link Successfully Created.', 'shortlink': add_link_response['shortlink']}, status=201, mimetype='application/json')


@main.route('/gallery', methods=['GET'])
@login_required
def get_private():
    limit = request.args.get('limit', 10)
    offset = request.args.get('offset', 0)
    return db_manager.get_authored_links(limit, offset)


@main.route('/feed', methods=['GET'])
def get_public():
    limit = request.args.get('limit', 10)
    offset = request.args.get('offset', 0)
    return db_manager.get_public_links(limit, offset)
