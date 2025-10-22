from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

#token logowania
app.secret_key = os.urandom(24)

app.config['MONGO_URI'] = "mongodb://localhost:27017/user_db"
mongo = PyMongo(app)

users_collection = mongo.db.users

@app.route('/api/register', methods=['GET', 'POST'])
    def register():
        if request.method == "POST":

            username = request.form.get('username')
            password = request.form.get('password')

            #czy juz istnieje
            existing_user = users_collection.find_one({'username' : username})

            if existing_user:
                return jsonify("error" : "Taki user juz istnieje")

            hashed_password = generate_password_hash(password)

            users_collection.insert_one({
                'username' : username,
                'password' : hashed_password,
                'balance' : 100
            })

            return redirect(url_for('login'))


@app.route('/api/login', methods=['GET', 'POST'])
    def login():
        if request.method == "POST":

            username = request.form.get('username')
            password = request.form.get('password')

            #czy juz istnieje
            user = users_collection.find_one({'username' : username})

            if  user and check_password_hash(user['password'], password):

                session['loggend_in'] = True
                session['username'] = username

                return redirect(url_for('/'))

            else:
                return jsonify("error" : "Bledne haslo lub login :/")

@app.route('/')
    def main():
        return "../index.html" #nie ma jeszcze balansu i czy jest zalogowany czy nie

if __name__ == '__main__':
    app.run(debug=True)