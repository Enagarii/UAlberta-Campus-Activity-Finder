import json

def dumpEventToJSON(event, json_file):
    write_file = open(json_file, 'w')
    write_file.write(json.dumps(event))
    write_file.close()