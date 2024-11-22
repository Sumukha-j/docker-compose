from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

# Connect to the PostgreSQL database
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        database=os.getenv("DB_NAME", "mydatabase"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "password")
    )
    return conn

@app.route('/add', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data['name']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (name) VALUES (%s)", (name,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": f"User {name} added!"}), 201

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(users)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
