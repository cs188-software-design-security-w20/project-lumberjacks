import json

from flask import request, redirect, render_template
from flask_login import login_required

from . import main

@main.route('/add_link', methods=['POST'])
@login_required
def add_link():
    link_success = db_manager.add_link(request.get_json(force=True))
    if 'error' in link_success:
      return link_success
    else:
      return {'error': link_success['error']}

@main.route('/gallery', methods=['GET'])
@login_required
def get_private():
    limit = request.args.get('limit', 10)
    offset = request.args.get('offset',0)
    return db_manager.get_authored_links(limit, offset)

@main.route('/feed', methods=['GET'])
def get_public():
    limit = request.args.get('limit', 10)
    offset = request.args.get('offset',0)
    return db_manager.get_public_links(limit, offset)