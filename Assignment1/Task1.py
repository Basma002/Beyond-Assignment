#Task 1

class Inventory:

    def __init__(self):
        self.shop = {"shirts": 5, "socks": 9, "pants": 2, "scarfs": 12}

#Method for adding items to the inventory.
    def add_item(self, item_name, quantity):
        self.shop[item_name] = quantity

#Method for removing items from the inventory.
    def remove_item(self, item_name):
        if item_name in self.shop:
            del self.shop[item_name]
        else:
            raise ValueError(f"Item '{item_name}' is not in the inventory.")

#Methos for updating the quantity of a specific item.
    def update_quantity(self, item_name, quantity):
        if item_name in self.shop:
            self.shop[item_name] = quantity
        else:
            raise ValueError(f"Item '{item_name}' is not in the inventory.")
        
#Method for displaying all items in the inventory.
    def display(self):
       return "\n".join(map(str, self.shop.items()))


inventory = Inventory()
inventory.add_item("hats", 10)
inventory.update_quantity("socks", 15)
inventory.remove_item("pants")
print(inventory.display())
