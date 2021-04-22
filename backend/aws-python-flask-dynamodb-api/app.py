import os

import boto3
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)
cors = CORS(app, resources={r"/venues": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# if os.environ.get('IS_OFFLINE'):
#     dynamodb_client = boto3.client(
#         'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
#     )
# else:
dynamodb_client = boto3.client('dynamodb')


USERS_TABLE = os.environ['USERS_TABLE']
VENUES_TABLE = os.environ['VENUES_TABLE']


# @app.route('/users/<string:user_id>')
# def get_user(user_id):
#     result = dynamodb_client.get_item(
#         TableName=USERS_TABLE, Key={'userId': {'S': user_id}}
#     )
#     item = result.get('Item')
#     if not item:
#         return jsonify({'error': 'Could not find user with provided "userId"'}), 404

#     return jsonify(
#         {'userId': item.get('userId').get(
#             'S'), 'name': item.get('name').get('S')}
#     )


# @app.route('/users', methods=['POST'])
# def create_user():
#     user_id = request.json.get('userId')
#     name = request.json.get('name')
#     if not user_id or not name:
#         return jsonify({'error': 'Please provide both "userId" and "name"'}), 400

#     dynamodb_client.put_item(
#         TableName=USERS_TABLE, Item={
#             'userId': {'S': user_id}, 'name': {'S': name}}
#     )

#     return jsonify({'userId': user_id, 'name': name})


@app.route('/venues', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def create_venue():
    token = request.headers['Authorization']
    req = requests.Request()

    try:
        id_token.verify_firebase_token(token, req)

        body = request.get_json(force=True)
        if not body:
            return make_response(jsonify(error='Missing Body!'), 400)
        
        name = body['name']
        photoUrl = body['photoUrl']
        venue = body['venue']
        contact = body['contact']
        tags = body['tags']

        dynamodb_client.put_item(
            TableName=VENUES_TABLE, Item={
                'userId': {'S': token}, 
                'name': {'S': name},
                'photoUrl': {'S': photoUrl},
                'venue': {'S': venue},
                'contact': {'S': contact},
                'tags': {'S': tags}
            }
        )

        return make_response(jsonify(message='Success!'), 200)
    except Exception as e:
        print(e)
        return make_response(jsonify(error='Unauthorized!'), 401)


@app.route('/venues', methods=['GET', 'OPTIONS'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_venues():
    token = request.headers['Authorization']
    req = requests.Request()

    try: 
        id_token.verify_firebase_token(token, req)

        results = []
        scan = dynamodb_client.scan(
            TableName=VENUES_TABLE
        )

        for item in scan['Items']:
            name = item['name']['S']
            photoUrl = item['photoUrl']['S']
            venue = item['venue']['S']
            contact = item['contact']['S']
            tags = item['tags']['S']
            results.append({
                'name': name,
                'photoUrl': photoUrl,
                'venue': venue,
                'contact': contact,
                'tags': tags
            })

        return jsonify(results)

        # return jsonify([
        #     {
        #         'name': 'John',
        #         'photoUrl':
        #         "https://s9739.pcdn.co/wp-content/uploads/2013/02/white-barn-wedding-decorations.jpg.optimal.jpg",
        #         'venue': "Old John's Barn",
        #         'contact': 'john@gmail.com',
        #         'tags': "indoor barn"
        #     },
        #     {
        #         'name': 'Jill',
        #         'photoUrl':
        #         "http://cheersbabephoto.com/wp-content/uploads/2018/09/CheersBabePhoto-753.jpg",
        #         'venue': "Saratoga Springs",
        #         'contact': 'jill@gmail.com',
        #         'tags': "forest trees"
        #     },
        #     {
        #         'name': 'Whitney',
        #         'photoUrl': "https://s.hdnux.com/photos/71/60/01/15138892/3/1200x0.jpg",
        #         'venue': "Whitney's Botanical Garden",
        #         'contact': 'whitney@gmail.com',
        #         'tags': "garden indoor"
        #     },
        #     {
        #         'name': 'Ryan',
        #         'photoUrl':
        #         "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=725&h=483&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2018%2F07%2F18%2Fbackyard-wedding1.jpg",
        #         'venue': "Ryan's Backyard",
        #         'contact': 'ryan@gmail.com',
        #         'tags': "backyard trees"
        #     },
        #     {
        #         'name': 'Mick',
        #         'photoUrl':
        #         "https://www.butfirstcoffeeblog.com/wp-content/uploads/2017/01/KALLIE-MICHAEL-9.jpg",
        #         'venue': "Mick's Beautiful Acreage",
        #         'contact': 'mick@gmail.com',
        #         'tags': "forest trees"
        #     },
        #     {
        #         'name': 'Sadie',
        #         'photoUrl':
        #         "https://apracticalwedding.com/wp-content/uploads/2019/01/APW-Weddings-94873-46410.jpg",
        #         'venue': "Sadie's Oasis",
        #         'contact': 'sadie@gmail.com',
        #         'tags': "backyard"
        #     },
        #     {
        #         'name': 'Dante',
        #         'photoUrl':
        #         "https://woodncratedesigns.com/wp-content/uploads/2019/10/backyard-reception-lighting.jpg",
        #         'venue': "Dante's Inferno",
        #         'contact': 'dante@gmail.com',
        #         'tags': "dancefloor dance floor backyard"
        #     },
        #     {
        #         'name': 'Jenny',
        #         'photoUrl':
        #         "https://i2.wp.com/davincibridal.com/blog/wp-content/uploads/2016/11/wedding-venue4-1.jpg",
        #         'venue': "Jenny's Lookout",
        #         'contact': 'jenny@gmail.com',
        #         'tags': "mountains overlook"
        #     },
        #     {
        #         'name': 'Colin',
        #         'photoUrl':
        #         "https://www.lookslikefilm.com/wp-content/uploads/2019/01/7V2A5632.jpg",
        #         'venue': "Forest Lover's Dream",
        #         'contact': 'colin@gmail.com',
        #         'tags': "forest trees"
        #     },
        #     {
        #         'name': 'Bob',
        #         'photoUrl':
        #         "https://yeahweddings-11993.kxcdn.com/wp-content/uploads/2020/09/outdoor-wedding-740x492.jpg",
        #         'venue': "Lakeview Wedding Lot",
        #         'contact': 'bob@gmail.com',
        #         'tags': "lake water mountains"
        #     },
        #     {
        #         'name': 'Vanessa',
        #         'photoUrl':
        #         "https://s3.us-west-2.amazonaws.com/images.herecomestheguide.com/images/articles/IndoorOutdoorWeddings-OakTreeManor.jpg",
        #         'venue': "Married Under the Tree",
        #         'contact': 'vanessa@gmail.com',
        #         'tags': "trees"
        #     },
        #     {
        #         'name': 'Joe',
        #         'photoUrl':
        #         "https://getordained.org/assets/getordained/blog/large-outdoor-wedding-setup.jpg",
        #         'venue': "Parkland Wedding",
        #         'contact': 'joe@gmail.com',
        #         'tags': "backyard dancefloor"
        #     },
        #     {
        #         'name': 'Emily',
        #         'photoUrl':
        #         "https://images.squarespace-cdn.com/content/v1/547b5805e4b0ac0fb96026bd/1566252816798-XSXGHFP8K1OT7BGZV5YL/ke17ZwdGBToddI8pDm48kCa8xVeeoiuu2MYgxenCQWhZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx6TfU7SMEJyCJnxig_qQDhXkSr5GQTMa2m1phSewwr6KsD8BDDMnZd_SWGdW536_s/outdoor-wedding-venue-orange-county-weddings-venues-oc.jpg",
        #         'venue': "Garden Getaway",
        #         'contact': 'emily@gmail.com',
        #         'tags': "backyard garden"
        #     },
        # ])
    except:
        return make_response(jsonify(error='Unauthorized!'), 401)


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
