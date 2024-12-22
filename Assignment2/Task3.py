#Task 3


#Parent class "Animal"
class Animal:

#Method for eating.
    def eat(self):
        return "The animal is eating."
    
#Method for sleeping.
    def sleep(self):
        return "The animal is sleeping."

#Child class "Dog"
class Dog(Animal):
    def bark(self):
        return "The dog is barking."

#Child class "Bird"
class Bird(Animal):
    def fly(self):
        return "The bird is flying."

dog = Dog()
print(dog.eat())  
print(dog.sleep())
print(dog.bark()) 

bird = Bird()
print(bird.eat()) 
print(bird.sleep())
print(bird.fly())  