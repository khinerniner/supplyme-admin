from flask_testing import TestCase
from server import app
from server.utils import firestore
import os
from setup import basedir
import json
# from celery import Celery

class BaseTestConfig(TestCase):
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4MGVkMGQ3ODY2ODk1Y2E0M2MyMGRhZmM4NTlmMThjNjcwMWU3OTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbW92ZWhhcHB5LTYxZWY5IiwiYXVkIjoibW92ZWhhcHB5LTYxZWY5IiwiYXV0aF90aW1lIjoxNTYwMjMwMDg0LCJ1c2VyX2lkIjoiQ2loakVyeE5tcWVtNnNTV0V1eWRwRXgyM0pKMyIsInN1YiI6IkNpaGpFcnhObXFlbTZzU1dFdXlkcEV4MjNKSjMiLCJpYXQiOjE1NjA5ODE5MTYsImV4cCI6MTU2MDk4NTUxNiwiZW1haWwiOiJkZW5pc2FuZ2VsbEBoYXJwYW5nZWxsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkZW5pc2FuZ2VsbEBoYXJwYW5nZWxsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.b6z1qaumyH6TGm8bVwmPHAFz9PzNpRybHZvIHsBiFgKAP1zO8Ls2VT7RNnPlxctqGfCPltnIY0Q0Z3bweaIhansFmHJZNZXLpIpZCPJAM9aAu4xv-pbRnX0ritpwzxPNrTQ0te_OzE_xX0WWZ6dejqFWMoJSMYPeFzlas1mHHZOPLnaCNYN5uGwE6GFHVl29_h5MvvRMchOYoalC1S8u6vo9BnCbIvBcI6h_GMwLsSjOYi_1JZjp91ni9J8LBvidV6BORAyozAONqkz8D8ZpNBKq246XI1rxfImmz2heIGA86cfu4kz_iJ_7ew7jLgz68qPBvF39ECL6alKMxYKrgg'

    headers = {
        'Authorization': 'Bearer {}'.format(token),
    }

    def create_app(self):
        app.config.from_object('server.config.DevelopmentConfig')
        # celery = Celery(app.import_name, broker=app.config['BROKER_URL'])
        # celery.conf.update(app.config)
        return app

    def setUp(self):
        self.app = self.create_app().test_client()

    def tearDown(self):
        print('Tear Down')
