from flask import Flask, jsonify, request

app = Flask(__name__)

#To-do list content 
todo_list = [
    {"id": 1, "task": "Read a book", "completed": False},
    {"id": 2, "task": "Go to the GYM", "completed": True},
    {"id": 3, "task": "Drink coffee", "completed": False},
    {"id": 4, "task": "Plant a tree", "completed": True},
]


#The main route for our API (Home page)
@app.route("/", methods=["GET"])
def home():
    return "Hello!! This is my-Do List API!", 200


#GET method to retrieve all tasks in the to-do list
@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(todo_list), 200


#POST method to add a new task to the to-do list
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    #Create a new task object with a unique ID
    new_task = {
        "id": len(todo_list) + 1,
        "task": data["task"],
        "completed": data.get("completed", False) #Default to False if not provided
    }
    todo_list.append(new_task) # Add the new task to the list
    return jsonify(new_task), 201


#PUT method to update an existing task in the to-do list
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.json  
    task = next((task for task in todo_list if task["id"] == task_id), None)  # Find the task by ID

    if not task:
        # Return an error if the task doesn't exist
        return jsonify({"error": "Task not found"}), 404  

    #Update the task details if provided, otherwise keep the current values
    task["task"] = data.get("task", task["task"]) 
    task["completed"] = data.get("completed", task["completed"]) 
    # Return the updated task
    return jsonify(task), 200  


#DELETE method to remove a task from the to-do list by ID
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    #Find the task in the list by ID
    task = next((task for task in todo_list if task["id"] == task_id), None)

    if not task:
        # Return an error if the task doesn't exist
        return jsonify({"error": "Task not found"}), 404
    
    # Remove the task from the list
    todo_list.remove(task)
    return jsonify({"message": f"Task {task_id} has been deleted"}), 200



if __name__ == "__main__":
    app.run(debug=True)
