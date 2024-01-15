from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Specify the path to the saved pickle file
file_path = 'health.pkl'

# Load the trained model from the pickle file
with open(file_path, 'rb') as f:
    loaded_model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the frontend
    data = request.json

    # Extract features from the data
    features = [data['calories'], data['cal_fat'], data['saturated_fat'], data['trans_fat'], data['cholesterol'], data['sodium'], data['total_carb']]

    # Predict using the loaded model
    prediction = loaded_model.predict([features])

    # Determine safety based on the prediction
    result = {"predicted_value": float(prediction[0]), "safety": "Safe" if prediction[0] > 4 else "Not Safe"}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)