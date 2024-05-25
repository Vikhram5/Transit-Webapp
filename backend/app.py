
import pandas as pd
from flask import Flask, jsonify, request , session
from flask_cors import CORS
import os
from flask_bcrypt import Bcrypt
import numpy as np
from visualize import visualize_bus_loading
from passcount import process_data
from od_matrix import generate_od_matrix
from buscount import bus_count
from revenue import revenue_analysis
from visualize_ticket import visualize_bus_ticket

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)

@app.route('/visualize_loading',methods=['POST'])
def visualize_loading():
    res=visualize_bus_loading()
    return res


@app.route('/visualize_ticket',methods=['POST'])
def visualize_ticket():
    res=visualize_bus_ticket()
    return res

@app.route('/get_schedule_names', methods=['POST'])
def get_schedule_names():
    filename = request.json['filename']

    df=pd.read_csv(filename)
    unique_sources = np.sort(df['Schedule Name'].unique())
    
    return jsonify({'scheduleNames': unique_sources.tolist()})

@app.route('/get_bus_numbers', methods=['POST'])
def get_bus_numbers():
    filename = request.json['filename']
    df=pd.read_csv(filename)
    temp_df = df['Schedule Name'].str.split('-').str[0]
    unique_sources = temp_df.unique()
    return jsonify({'busNumbers': unique_sources.tolist()})


@app.route('/get_source', methods=['POST'])
def get_source():
    filename = request.json['filename']
    if 'busNumber' in request.json:
        bus_number = request.json['busNumber']
        df = pd.read_csv(filename)
        df = df[df['Schedule Name'].str.contains(rf'\b{bus_number}\b')]
    elif 'schedule' in request.json:
        schedule = request.json['schedule']
        df = pd.read_csv(filename)
        df = df[df['Schedule Name'] == schedule]
    else:
        return jsonify({'error': 'Neither busNumber nor schedule provided'})

    unique_sources = df['Source'].unique()
    return jsonify({'sources': unique_sources.tolist()})


@app.route('/get_destination', methods=['POST'])
def get_destination():
    filename = request.json['filename']
    df = pd.read_csv(filename)
    
    # Check if either busNumber or schedule is provided
    if 'busNumber' in request.json:
        bus_number = request.json['busNumber']
        df = df[df['Schedule Name'].str.contains(rf'\b{bus_number}\b')]
    elif 'schedule' in request.json:
        schedule = request.json['schedule']
        df = df[df['Schedule Name'] == schedule]
    else:
        return jsonify({'error': 'Neither busNumber nor schedule provided'})

    if 'source' in request.json:
        source = request.json['source']
        df = df[df['Source'] == source]
    else:
        return jsonify({'error': 'Source not provided'})

    unique_destinations = df['Destination'].unique()
    return jsonify({'destinations': unique_destinations.tolist()})


@app.route('/generate_od_matrix', methods=['POST'])
def od_matrix():
    res=generate_od_matrix()
    return res

@app.route('/process_bus', methods=['POST'])
def processbus():
    res=bus_count()
    return res

@app.route('/process_revenue', methods=['POST'])
def process_revenue():
    res=revenue_analysis()
    return res


@app.route('/process_data', methods=['POST'])
def process():
    res=process_data()
    return res




bcrypt = Bcrypt(app)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

users = {
    'user1': {
        'username': 'user1',
        'password': bcrypt.generate_password_hash('password').decode('utf-8')
    }
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username in users and bcrypt.check_password_hash(users[username]['password'], password):
        session['username'] = username
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})


if __name__ == '__main__':
    app.run(debug=True)
