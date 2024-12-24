import requests
def fetch_cat_fact():

# API endpoint
    url = "https://catfact.ninja/fact"  

    try:
        # Send a GET request to the API with a timeout of 10 seconds to avoid long waits
        response = requests.get(url, timeout=10)  

        # Raise an exception if the response status code indicates an error 
        response.raise_for_status() 

        # Parse the JSON response into a Python dictionary
        fact = response.json()

        # Display the cat fact in a formatted way
        print("\nRandom Cat Fact:")
        print(f"  {fact['fact']}\n")

    except requests.exceptions.Timeout:
        # Handle cases where the API request takes too long to respond
        print("Error: The request timed out. The API may be slow or unavailable.")

    except requests.exceptions.HTTPError as http_err:
        # Handle HTTP errors (e.g., 404, 500)
        print(f"HTTP error occurred: {http_err} (Status Code: {response.status_code})")

    except requests.exceptions.ConnectionError:
        # Handle network-related errors
        print("Error: Unable to connect to the API. Please check your internet connection.")
        
# Call the function
fetch_cat_fact()
