import json

# Converting a Python dictionary to a JSON string and back to a dictionary
def dictionary_to_json_and_back(data):
    
    # Serialize the dictionary into a JSON string 
    json_string = json.dumps(data, indent=4)
    print("JSON String:")
    print(json_string)

    # Deserialize the JSON string back into a Python dictionary
    python_dict = json.loads(json_string)
    print("\nConverted Back to Dictionary:")
    print(python_dict)


# Example dictionary to test JSON serialization and deserialization
example_dict = {
    "name": "Basma Alhajji",
    "age": 22,
    "skills": ["Python", "Data Analysis", "Machine Learning"]
}

dictionary_to_json_and_back(example_dict)
