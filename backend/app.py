# A Flask API that handles user signup, login, and authentication, along with a machine learning prediction endpoint.
#app.py
import pickle
import os
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime, date
import joblib
from sklearn.svm import SVC
import pandas as pd


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Sandy0841@localhost/mind_therapy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class ActiveUser(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)

class SeverityLevels(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    depression_level = db.Column(db.String(20))
    anxiety_level = db.Column(db.String(20))
    stress_level = db.Column(db.String(20))

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    dob = db.Column(db.String(10))
    age = db.Column(db.Integer)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime)

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

    # Generate the user_id automatically starting from 1001
    last_user_id = User.query.order_by(User.user_id.desc()).first()
    user_id = 1001 if not last_user_id else last_user_id.user_id + 1

    # Create a new user
    new_user = User(user_id=user_id, username=username, email=email, dob=dob, age=age, password=hashed_password)
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
            active_user = ActiveUser.query.filter_by(user_id=user.user_id).first()

            if active_user:
                # User is already active, update the existing entry
                active_user.timestamp = datetime.now()  # Update the timestamp or any other field as needed
            else:
                # User is not active, create a new entry
                active_user = ActiveUser(user_id=user.user_id)
                db.session.add(active_user)

            db.session.commit()

            return jsonify(message='Login successful')
        else:
            return jsonify(message='Invalid username or password'), 401

    except IntegrityError as e:
        db.session.rollback()
        print(f"Error during login: {e}")
        return jsonify(message='An unexpected error occurred. Please try again.'), 500
    except Exception as e:
        db.session.rollback()
        print(f"Error during login: {e}")
        return jsonify(message='An unexpected error occurred. Please try again.'), 500

@app.route('/logout')
def logout():
    try:
        # Get the active user's entry from the ActiveUser table
        active_user = ActiveUser.query.first()
        
        if active_user:
            # Delete the active user's entry from the ActiveUser table
            db.session.delete(active_user)
            db.session.commit()
            return jsonify(message='Logout successful')
        else:
            return jsonify(message='No active user to logout'), 404

    except Exception as e:
        db.session.rollback()
        print(f"Error during logout: {e}")
        return jsonify(message='An unexpected error occurred. Please try again.'), 500

    
app.route

Depression_model_path = os.path.abspath('C:/sk/projects/mind theraphy/backend/models/Depression_svm_model.pkl')

with open(Depression_model_path, 'rb') as file:
    Depression_svm_model = pickle.load(file)

# Map predicted values to severity levels
severity_levels = {
    0: 'Extremely Severe',
    1: 'Severe',
    2: 'Moderate',
    3: 'Mild',
    4: 'Normal'
}

@app.route('/depression_predict', methods=['POST'])
def depression_predict():
    try:
        data = request.get_json()

        new_data = pd.DataFrame(data)

        predictions = Depression_svm_model.predict(new_data)
        
        predicted_severity = severity_levels[predictions[0]]  # Assuming predictions is a single value array

        active_user = ActiveUser.query.first()
        if active_user:
            active_user_id = active_user.user_id
        else:
            return jsonify(error='No active user'), 404  # Handle the case where no active user is found
        
        existing_entry = SeverityLevels.query.filter_by(user_id=active_user_id).first()

        if existing_entry:
            existing_entry.depression_level = predicted_severity
        else:
            new_entry = SeverityLevels(user_id=active_user_id, depression_level=predicted_severity)
            db.session.add(new_entry)

        db.session.commit()
        return jsonify(message="Depression severity stored")

    except Exception as e:
        return jsonify(error=str(e)), 500





anxiety_model_path = os.path.abspath('C:/sk/projects/mind theraphy/backend/models/anxiety_svm_model.pkl')

with open(anxiety_model_path, 'rb') as file:
    anxiety_svm_model = pickle.load(file)

@app.route('/AnxietyPredict', methods=['POST'])
def AnxietyPredict():
    try:
        data = request.get_json()
        new_data = pd.DataFrame(data)
        predictions = anxiety_svm_model.predict(new_data)
        predicted_severity = severity_levels[predictions[0]]  # Assuming predictions is a single value array

        active_user = ActiveUser.query.first()
        if active_user:
            active_user_id = active_user.user_id
        else:
            return jsonify(error='No active user'), 404  # Handle the case where no active user is found
        
        existing_entry = SeverityLevels.query.filter_by(user_id=active_user_id).first()

        if existing_entry:
            existing_entry.anxiety_level = predicted_severity
        else:
            new_entry = SeverityLevels(user_id=active_user_id, anxiety_level=predicted_severity)
            db.session.add(new_entry)

        db.session.commit()
        return jsonify(message="anxiety severity stored")

    except Exception as e:
        return jsonify(error=str(e)), 500
    


stress_model_path = os.path.abspath('C:/sk/projects/mind theraphy/backend/models/stress_svm_model.pkl')

with open(stress_model_path, 'rb') as file:
    stress_svm_model = pickle.load(file)

@app.route('/stressPredict', methods=['POST'])
def stressPredict():
    try:
        data = request.get_json()
        new_data = pd.DataFrame(data)
        predictions = stress_svm_model.predict(new_data)
        predicted_severity = severity_levels[predictions[0]]  # Assuming predictions is a single value array

        active_user = ActiveUser.query.first()
        if active_user:
            active_user_id = active_user.user_id
        else:
            return jsonify(error='No active user'), 404  # Handle the case where no active user is found
        
        existing_entry = SeverityLevels.query.filter_by(user_id=active_user_id).first()

        if existing_entry:
            existing_entry.stress_level = predicted_severity
        else:
            new_entry = SeverityLevels(user_id=active_user_id, stress_level=predicted_severity)
            db.session.add(new_entry)

        db.session.commit()
        return jsonify(message="Stress severity stored")

    except Exception as e:
        return jsonify(error=str(e)), 500


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    active_user = ActiveUser.query.first()
    if active_user:
        active_user_id = active_user.user_id
        return jsonify(user_id=active_user_id)
    else:
        return jsonify(message='No active user'), 404

if __name__ == "__main__":
    initialize_database()
    app.run(debug=True)
