from flask import Flask, render_template, jsonify, request
import add_event

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)


@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Get the JSON data from the request
    message = data.get("message", "")

    response = {"reply": message}
    
    print(message)
    add_event.dumpEventToJSON(message, 'static/JSON/events.json')
    
    print(message)
    
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, port=5500)