import json

from flask import request, redirect, render_template, Response, jsonify
from flask_login import login_required

from . import main
from .. import db_manager
from ..model import VisibilityType, PostType, SortType


@main.route('/<shortlink>', methods=['GET'])
def get_links(shortlink):
    link_id = db_manager.shortlink_to_link_id(shortlink)['id']
    link = db_manager.get_link(link_id)
    permissions = db_manager.check_permissions(link)
    # fine
    if permissions == 0:
        # return Response({'links': link['links']}, status=201, mimetype='application/json')
        return jsonify({'links': link['links']}), 201

    # age-restricted
    elif permissions == 1:
        return Response('This content has been age-restricted', status=402, mimetype='application/text')
    # private / not logged in
    elif permissions == 2:
        return Response('This link is private. If it is yours, you need to log in.', status=401, mimetype='application/text')


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
    if 'error' in add_link_response:
        return Response(add_link_response['error'], status=500, mimetype='application/text')
    else:
        # return Response({'message': 'Link Successfully Created.', 'shortlink': add_link_response['shortlink']}, status=201, mimetype='application/json')
        return jsonify({'message': 'Link Successfully Created.', 'shortlink': add_link_response['shortlink']}), 201


@main.route('/gallery', methods=['GET'])
@login_required
def get_private():
    limit = request.args.get('limit', 10)
    offset = request.args.get('offset', 0)
    priv_links = db_manager.get_authored_links(limit, offset)
    return jsonify(priv_links), 201


@main.route('/feed', methods=['GET'])
def get_public():
    limit = request.args.get('limit', 10)
    offset = request.args.get('offset', 0)
    sort_by = request.args.get('sort', SortType.CHRONO)
    pub_links = db_manager.get_public_links(limit, offset, sort_by)
    return jsonify(pub_links), 201


@main.route('/upvote', methods=['POST'])
@login_required
def upvote_post():
    payload = request.get_json(force=True)
    post_id = payload['post_id']

    upvote_response = db_manager.upvote_post(post_id)
    if 'error' in upvote_response:
        return Response(upvote_response['error'], status=500, mimetype='application/text')
    else:
        return Response({'message': 'Post upvoted.'}, status=201, mimetype='application/json')
