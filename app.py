import os
from flask import Flask, render_template, jsonify, send_from_directory, request
from flask_cors import CORS, cross_origin
import pymongo
import sys
sys.path.insert(1, "./services")
import startup_dir_services
import ml_services
import config
conn = f'mongodb+srv://{config.user}:{config.password}@project-cluster.5a5e9.mongodb.net/LATAM_STARTUP_DB?retryWrites=true&w=majority'
client = pymongo.MongoClient(conn)
db = client.LATAM_STARTUP_DB
db2 = client.ML_DATASET_DB
collection_startup_dir = db.startup_dir
collection_microprocessor_speed = db2.microprocessor_clock_speed
collection_supercomputer_power_flops = db2.supercomputer_power_flops
collection_transistors_per_microprocessor = db2.transistors_per_microprocessor
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

@app.route("/bootcamp-final-project/api/last-year", methods=['GET'])
@cross_origin()
def get_last_year():
    last_year_auto_correlations = {};
    term1 = "microprocessor"
    last_year_registry_microprocessors = collection_microprocessor_speed.find().sort("Year", pymongo.DESCENDING).limit(4)
    last_year_auto_correlation = ml_services.createLastYearCorrelation(last_year_registry_microprocessors, "Microprocessor clock speed (Hertz (pulses per second))", term1)
    last_year_auto_correlations[term1] = [last_year_auto_correlation]
    term2 = "flip-flops"
    last_year_registry_flip_flops = collection_supercomputer_power_flops.find().sort("Year", pymongo.DESCENDING).limit(4)
    last_year_auto_correlation = ml_services.createLastYearCorrelation(last_year_registry_flip_flops, "Floating-Point Operations per Second (FLOPS)", term2)
    last_year_auto_correlations[term2] = [last_year_auto_correlation]
    term3 = "transistors"
    last_year_registry_transistors = collection_transistors_per_microprocessor.find().sort("Year", pymongo.DESCENDING).limit(4)
    last_year_auto_correlation = ml_services.createLastYearCorrelation(last_year_registry_transistors, "Transistors per microprocessor (transistors per chip)", term3)
    last_year_auto_correlations[term3] = [last_year_auto_correlation]
    print(f"Body {last_year_auto_correlations}")
    return jsonify(last_year_auto_correlations)

@app.route("/bootcamp-final-project/api/ml-value", methods=['POST'])
@cross_origin()
def get_last_registry():
    json_request = request.get_json()
    print(f"last_year_auto_correlation {json_request}")
    new_year_correlation = ml_services.createNewYearCorrelation(json_request)
    print(new_year_correlation);
    return jsonify(new_year_correlation)

if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True, debug=True)