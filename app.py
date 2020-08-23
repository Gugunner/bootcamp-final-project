import os
from flask import Flask, render_template, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import pymongo
import sys
sys.path.insert(1, "./services")
import startup_dir_services
import config
conn = f'mongodb+srv://{config.user}:{config.password}@project-cluster.5a5e9.mongodb.net/LATAM_STARTUP_DB?retryWrites=true&w=majority'
client = pymongo.MongoClient(conn)
db = client.LATAM_STARTUP_DB
collection_startup_dir = db.startup_dir
app = Flask(__name__, static_folder='build', template_folder='build', static_url_path='')
cors = CORS(app, resources={r"bootcamp-final-project/api/*": {"origins": "*"}})
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/bootcamp-final-project/api/startups', methods=['GET'])
@cross_origin()
def get_all_startups():
    startup_dirs = collection_startup_dir.find()
    return jsonify(startup_dir_services.get_all_startups(startup_dirs))

if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True, debug=True)