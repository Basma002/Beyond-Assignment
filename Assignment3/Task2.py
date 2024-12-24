import requests

def fetch_cat_fact():
#Fetches a random cat fact from the Cat Facts API 

    # API endpoint
    url = "https://catfact.ninja/fact"
    
    try:
        # Send a GET request to the API
        response = requests.get(url)

        # Raise an exception if the response status code indicates an error
        response.raise_for_status()  
        
        # Parse the JSON response into a Python dictionary
        fact = response.json()
        
        # Display the cat fact in a formatted way
        print("\nRandom Cat Fact:")
        print(f"  {fact['fact']}\n")
    
    except requests.exceptions.RequestException as e:
         # Handle any request-related errors, such as connection issues or invalid responses
        print(f"An error occurred: {e}")

# Call the function
fetch_cat_fact()
