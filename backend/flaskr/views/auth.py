import json

from flask import request, redirect, render_template
from flask_login import login_required

from . import main

@main.route('/', methods=['GET', 'POST']) 
def index():
    return 'Test'