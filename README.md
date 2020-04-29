# FaceSpace

Copyright © 2020 Mic Ruopp. All rights reserved.

___


## Setting up the server environment

### Understanding the structure of the server

NGINX / gunicorn / uvicorn / Django



FaceSpace is run on a Django server. In order to get this server running locally, a few things need to be done first:
1. Ensure the correct version of Python is running.
	- Per [Django release notes](https://docs.djangoproject.com/en/3.0/releases/3.0/): Django 3.0 supports Python 3.6, 3.7, and 3.8. We highly recommend and only officially support the latest release of each series.
1. Set up the Python virtual environment.
1. 

### Setting up the virtual environment

1. `pip install virtualenv`
1. `python -m virtualenv .env`
1. `source .env/bin/activate`
1. `pip install django`

## Resources
* https://jaydenwindle.com/writing/django-websockets-zero-dependencies/