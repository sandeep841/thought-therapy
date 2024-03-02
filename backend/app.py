import pickle
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime, date
import joblib
from sklearn.svm import SVC


# Import the SVM model
svm_model = joblib.load('svm_model.pkl')

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Sandy0841@localhost/mind_therapy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    dob = db.Column(db.String(10), nullable=False)  # Store dob as string in dd/mm/yyyy format
    age = db.Column(db.Integer)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.username}>'

def calculate_age(dob):
    today = date.today()
    birth_date = datetime.strptime(dob, "%d/%m/%Y").date()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

def initialize_database():
    with app.app_context():
        db.create_all()
        print("Database initialized successfully!")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    dob = data.get('dob')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    # Check if password and confirm_password match
    if password != confirm_password:
        return jsonify(message='Password and Confirm Password do not match'), 400

    # Check if the username or email already exists
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify(message='Username or Email already exists'), 400

    # Calculate age from the provided date of birth
    age = calculate_age(dob)

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new user
    new_user = User(username=username, email=email, dob=dob, age=age, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(status='success', message='Signup successful'), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    try:
        if user and bcrypt.check_password_hash(user.password, password):
            return jsonify(message='Login successful')
        else:
            return jsonify(message='Invalid username or password'), 401

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify(message='An unexpected error occurred. Please try again.'), 500

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = data.get('features')

    # Ensure that the feature names and order match the SVM model's expectations
    feature_values = [features[f'Q{i}A'] for i in range(1, 43)]
    prediction = svm_model.predict([feature_values])

    return jsonify(prediction=prediction[0])



if __name__ == "__main__":
    initialize_database()
    app.run(debug=True)
