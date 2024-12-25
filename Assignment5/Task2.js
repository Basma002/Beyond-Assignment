
// Function to format user details using template literals
const userDetails = (name, age, occupation) => {
    return `Hello, ${name}!
You are ${age} years old and work as a ${occupation}.
Thank you for providing your details.`;
};


const userName = "Basma";
const userAge = 22;
const userOccupation = "Software Engineer";

const formattedDetails = userDetails(userName, userAge, userOccupation);
console.log(formattedDetails);
