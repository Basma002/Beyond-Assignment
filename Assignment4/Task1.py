import json
from tabulate import tabulate  

# Load book data from a JSON file or return an empty list if the file is missing or invalid.
def load_books(file_name):
    try:
        with open(file_name, 'r') as file:
            return json.load(file)  # Load data from JSON file
    except FileNotFoundError:
        print("File not found. Starting with an empty book collection.")
        return []
    except json.JSONDecodeError:
        print("Error reading JSON file. Starting with an empty book collection.")
        return []

# Save the current book collection to a JSON file with proper formatting.
def save_books(file_name, books):
    with open(file_name, 'w') as file:
        json.dump(books, file, indent=4)
        print(f"Books successfully saved to {file_name}.")

# Display all books in a formatted table. Print a message if the collection is empty.
def display_books(books):
    if not books:
        print("\nNo books in the collection.\n")
        return
    headers = ["Title", "Author", "Year", "Genre"]
    rows = [[book["title"], book["author"], book["year"], book["genre"]] for book in books]
    print("\nBooks in Collection:")
    print(tabulate(rows, headers=headers, tablefmt="grid"))

# Collect book details from the user and add them to the collection.
def add_book(books):
    print("\nAdd a New Book")
    title = input("Enter title: ")
    author = input("Enter author: ")
    year = input("Enter year: ")
    genre = input("Enter genre: ")
    books.append({"title": title, "author": author, "year": year, "genre": genre})
    print(f"\nBook '{title}' added to the collection!")

# Main function to manage the book collection workflow: load, view, add, save, and exit.
def main():
    file_name = "books.json"
    books = load_books(file_name)

    while True:
        print("\nBook Collection Manager")
        print("1. View all books")
        print("2. Add a new book")
        print("3. Save and Exit")
        choice = input("Enter your choice (1/2/3): ")

        if choice == "1":
            display_books(books)
        elif choice == "2":
            add_book(books)
        elif choice == "3":
            save_books(file_name, books)
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

# Run the program only if executed directly (not imported as a module).
if __name__ == "__main__":
    main()
