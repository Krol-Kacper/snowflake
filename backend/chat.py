import jwt
from flask import jsonify
from datetime import datetime

def write_message(messages_collection, data, token, jwt_secret, jwt_algorithm):
    if not token:
        return jsonify({'message': 'Missing token'}), 401

    payload = jwt.decode(token, jwt_secret, algorithms=[jwt_algorithm])

    email = payload.get('sub')
    if not email:
        return jsonify({'message': 'Invalid token payload'}), 401

    text = data.get('message') or ""
    if not text:
        return jsonify({'message': 'Message cannot be empty'}), 400
    if len(text) > 160:
        return jsonify({'message': 'Message too long'}), 400

    msg_doc = {
        "email": email,
        "message": text,
        "timestamp": datetime.utcnow(),
        "isWin": False
    }
    messages_collection.insert_one(msg_doc)

    messages = list(messages_collection.find().sort("timestamp", 1).limit(100))
    for m in messages:
        m["_id"] = str(m["_id"])
        m["timestamp"] = m["timestamp"].isoformat() + "Z"
    return jsonify({"messages": messages}), 201

def read_messages(messages_collection):
    messages = list(messages_collection.find().sort("timestamp", 1).limit(100))
    for m in messages:
        m["_id"] = str(m["_id"])
        m["timestamp"] = m["timestamp"].isoformat() + "Z"
    return jsonify({"messages": messages}), 200
