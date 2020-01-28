import os
from flaskr import create_app

app = create_app(os.getenv('FLASK_CONFIG') or 'dev')
