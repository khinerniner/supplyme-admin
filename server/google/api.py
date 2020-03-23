# tabs-admin/server/google/api.py

import logging

logger = logging.getLogger('tabs.google.api.py')

from flask import Blueprint, request, make_response, jsonify, json
from flask.views import MethodView

from server.utils.google.places.utils import (
    search_google_places,
    geocode_google_place,
    parse_google_geocode
)
# from server.google import notifications
from server.utils.firestore import verify_firebase_token

import time

google_blueprint = Blueprint('google', __name__)

# Search Google Places
# TODO: None
# [START Search Google Places]
class SearchGooglePlaces(MethodView):
    def get(self):
        try:
            incoming = request.args
            query = incoming['query']
            type = incoming['type']
            print(query)
            print(type)
            places = search_google_places(type, query)
            responseObject = {
                'status': 'success',
                'statusText': 'Searched Places',
                'data': places['results']
            }
            return make_response(jsonify(responseObject)), 200

        except Exception as e:
            logger.error('Error SearchGooglePlaces.post; Error: %s', e)
            responseObject = {
                'status': 'failed',
                'statusText': str(e)
            }
            return make_response(jsonify(responseObject)), 403
# [END Search Google Places]

# Geocode Google Place
# TODO: None
# [START Geocode Google Place]
class GeocodeGooglePlace(MethodView):
    def get(self):
        try:
            id_token = request.headers.get('Authorization').split(' ').pop()
            claims = verify_firebase_token(id_token)
            if not claims:
                responseObject = {
                    'status': 'failed',
                    'statusText': 'Invalid Token'
                }
                return make_response(jsonify(responseObject)), 403
            incoming = request.args
            place = incoming['place']
            print(place)
            result = geocode_google_place(place)
            address = parse_google_geocode(result)
            responseObject = {
                'status': 'success',
                'statusText': 'Geocoded Place',
                'data': address
            }
            return make_response(jsonify(responseObject)), 200

        except Exception as e:
            logger.error('Error GeocodeGooglePlace.post; Error: %s', e)
            responseObject = {
                'status': 'failed',
                'statusText': str(e)
            }
            return make_response(jsonify(responseObject)), 403
# [END Geocode Google Place]

# Define API resources
google_places_search = SearchGooglePlaces.as_view('google_places_search')
google_place_geocode = GeocodeGooglePlace.as_view('google_place_geocode')
# Specify API Version

# Add rules for endpoints
google_blueprint.add_url_rule(
    '/api/google/v1/places/search',
    view_func=google_places_search,
    methods=['GET']
)
google_blueprint.add_url_rule(
    '/api/google/v1/places/geocode',
    view_func=google_place_geocode,
    methods=['GET']
)
