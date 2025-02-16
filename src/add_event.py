import json

class pin:
    def __init__(self, lat, lon):
        self.lat = lat
        self.lon = lon
        
    

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
    file = open('static/JSON/events.json', 'r')
    pinList = json.load(file)
    file.close()
    
    return pinList