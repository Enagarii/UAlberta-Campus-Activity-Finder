import json

def dumpEventToJSON(event, json_file):
    # First Get the list of events
    read_file = open(json_file, 'r')
    event_arr = json.load(read_file)
    read_file.close()
    
    # Then write to the .json file
    write_file = open(json_file, 'w')
    event_arr.append(event)
    write_file.write(json.dumps(event_arr))
    write_file.close()
    
    
def getPins():
    # Read the decode the objects from the events.json file and return it
    file = open('static/JSON/events.json', 'r')
    pinList = json.load(file)
    file.close()
    
    return pinList