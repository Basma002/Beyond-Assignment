class ToDoList:

    def __init__(self):
        self.list = ["Read a book", "shower", "Finish the assignment"]
        self.completed_list = set() 

    # Method for adding an activity to the to-do list
    def add_activity(self, activity_name):
        self.list.append(activity_name)

    # Method for removing an activity from the to-do list
    def remove_activity(self, activity_name):
        if activity_name in self.list:
            self.list.remove(activity_name)
        else:
            raise ValueError(f"'{activity_name}' is not in the to-do list.")

    # Method for marking an activity as completed
    def completed_activity(self, activity_name):
        if activity_name in self.list:
            self.completed_list.add(activity_name)  # Mark as completed
        else:
            raise ValueError(f"'{activity_name}' is not in the to-do list.")

    # Method for displaying all activities in the to-do list
    def display(self):
        tasks = "\n".join(self.list)
        completed_activity = "\n".join(self.completed_list)
        return f"To-Do List:\n{tasks}\n\nCompleted Tasks:\n{completed_activity}"


myList = ToDoList()
myList.add_activity("sleep")
myList.remove_activity("shower")
myList.completed_activity("Finish the assignment")
print(myList.display())
