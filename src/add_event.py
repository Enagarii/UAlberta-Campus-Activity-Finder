import json

class pin:
    def __init__(self, lat, lon):
        self.lat = lat
        self.lon = lon
        
    

def dumpEventToJSON(event, json_file):
    write_file = open(json_file, 'a')
    write_file.write(json.dumps(event))
    write_file.write('\n')
    write_file.close()
    
    
def getPins():
    file = open('static/JSON/events.json', 'r')
    lines = file.readlines()
    file.close()
    
    decoder = json.JSONDecoder()
    
    pinList = []
    
    for line in lines:
        print(line)
        pinDict = json.loads(line)
        #pinInfo = pin(pinDict["lat"], pinDict["lon"])
    
        pinList.append(pinDict)
    
    return pinList