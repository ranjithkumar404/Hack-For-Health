from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('health.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    product_name = data['product']

    # Make predictions using the model
    prediction = model.predict([product_name])[0]

    return jsonify({'result': prediction})

if __name__ == '__main__':
    app.run(debug=True)
