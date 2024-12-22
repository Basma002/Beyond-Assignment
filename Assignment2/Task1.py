#Task 1

class Car:
    def __init__(self, make, model, year, mileage):
        self.make = make
        self.model = model
        self.year = year
        self.mileage = mileage

#Method for displaying the car's details.
    def display_details(self):
        return f"Make: {self.make}, Model: {self.model}, Year: {self.year}, Mileage: {self.mileage} km"
    
#Method for updating the car's mileage.
    def update_mileage(self, new_mileage):
        if new_mileage >= self.mileage:
            self.mileage = new_mileage
        else:
            raise ValueError("New mileage cannot be less than current mileage.")
        
#Method fro checking if the car is old (more than 10 years old).
    def is_old(self):
        current_year = 2024
        return current_year - self.year > 10


car = Car(make="Toyota", model="Corolla", year=2024, mileage=120000)
print(car.display_details()) 
car.update_mileage(140000)  
print(car.display_details())  
print("Is the car old?", car.is_old()) 









