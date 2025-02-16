from flask import Flask, render_template, jsonify, request
import add_event
import json

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/api/data', methods=['GET'])
def get_data():
    message = add_event.getPins()
    response = {"reply": message}
    return jsonify(response)


@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Get the JSON data from the request
    message = data.get("message", "")

    response = {"reply": message}
    
    add_event.dumpEventToJSON(message, 'static/JSON/events.json')
    
    return jsonify(response)

@app.route('/api/desc', methods=['POST'])
def description_data():
    data = request.get_json()
    message = data.get("message", "")
    
    response = {"reply": message}
    
    ## print("EDESCRIPTION DUMP")
    # Dump into the json file
    write_file = open("static/JSON/edescription.json", 'w')
    write_file.write(json.dumps(message))
    write_file.close()
    
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True, port=5500)