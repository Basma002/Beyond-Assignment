import requests
import json

# Function to fetch a random cat fact from the API 
def fetch_cat_fact():
    url = "https://catfact.ninja/fact"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Check for HTTP errors
        fact = response.json()  # Parse JSON response
        return fact
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Function to save (serialize) data to a JSON file
def save_to_file(file_name, data):
    try:
        with open(file_name, "w") as file:
            json.dump(data, file, indent=4)
        print(f"Data saved to {file_name}")
    except IOError as e:
        print(f"Error saving data to file: {e}")

# Function to read (deserialize) data from a JSON file
def read_from_file(file_name):
    try:
        with open(file_name, "r") as file:
            data = json.load(file)
        return data
    except (IOError, json.JSONDecodeError) as e:
        print(f"Error reading data from file: {e}")
        return None


def main():
    file_name = "catFacts.json"

    # Fetch a random cat fact from the API
    fact_data = fetch_cat_fact()
    if fact_data:
        print("\nFetched Cat Fact:")
        print(f"  {fact_data['fact']}\n")

        # Serialize the data to a JSON file
        save_to_file(file_name, fact_data)

        # Deserialize the data from the JSON file
        print("\nReading data from file:")
        saved_data = read_from_file(file_name)
        if saved_data:
            print(f"Cat Fact from File:\n  {saved_data['fact']}\n")

if __name__ == "__main__":
    main()
