// Function to fetch data from the Cat Facts API with error handling
const fetchCatFact = async () => {
    const url = "https://catfact.ninja/fact";

    try {
        const response = await fetch(url);

        // Check if the response status is not OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Display the fetched fact
        console.log("Random Cat Fact:", data.fact);
    } catch (error) {
        // Handle any errors that occur during fetch or processing
        console.error("Error fetching cat fact:", error.message);
    }
};

fetchCatFact();
