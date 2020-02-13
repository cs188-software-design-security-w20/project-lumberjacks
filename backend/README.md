# LUMBERJACK SERVER

## Basic Setup

`pip3 install -r requirements.txt`

## To start server

- Run `scripts/setup.sh` to initialize some envvars
- Run `python run.py db upgrade` to init the db if schema has changed
- Run `python run.py start` to start the server

### If you make a change to schema

- Run `python run.py db migrate -m <message>`
- Run `python run.py db upgrade` again
- Commit the migration
