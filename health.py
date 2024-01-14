from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the trained model
with open("health.pkl", "rb") as f:
    reg = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extracting values from the JSON data
    a = data['calories']
    b = data['calories_from_fat']
    c = data['saturated_fat']
    d = data['trans_fat']
    e = data['cholesterol']
    f = data['sodium']
    g = data['total_carb']

    # Make predictions using the model
    val = reg.predict([[a, b, c, d, e, f, g]])

    # Check the condition and return the result
    result = "Not Safe" if val < 4 else "Safe"
    
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
