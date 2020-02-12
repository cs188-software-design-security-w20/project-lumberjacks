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
