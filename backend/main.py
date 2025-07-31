# Contains our main roots and endpoints for our application
# We want to create API endpoints to be able to create, read, update, and delete data in our database
# Create -> POST request, Read -> GET request, Update -> PUT or PATCH request, Delete -> DELETE request 
# Requests will have a type (POST, GET, etc.) and the json data that will be the data manipulated based on the request.
# The response to these requests have a status, with common ones being 200(success), 404(not found), 400(bad request), and they also have JSON alongside it which would be filled with data request such as for GET request.

# When the frontend calls one of these api endpoints in my main.py, since my Flask backend is running on localhost:5000, it will be sent as an http request to the url, for example, localhost:5000/create_task, and the backend will listen at that url and process the request and the method that we set it in our app.route, and runs the code associated with it.
# When I deploy my website I need to host my backend on a platform like AWS so my backend can run a public domain and listen to requests on the standard HTTP ports associated with that domain

from flask import request, jsonify
from config import app, db
from models import Task
from datetime import datetime

# This is a decerator, we define what route we're going to go to and we specify the valid methods for that endpoint
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all() # Uses Flask SQLAlchemy to get all of the tasks that exist in the tasks database
    json_tasks = list(map(lambda x: x.to_json(), tasks)) # The map function just loops through every task in tasks and creates a list of them
    return jsonify({"tasks": json_tasks}) # Since this is a function for a get where we will be sending data to the front end we must do it through a JSON so we jsonify our list

@app.route("/create_task", methods=["POST"])
def create_task():
    task_name = request.json.get("taskName") # Access the taskName from the json sent from the frontend with the user inputs
    # We put this in a try except block because the user may enter an invalid due date and we need to catch the error so we can return that to the frontend as our reason for the issue
    try:
        due_date = datetime.strptime(request.json.get("dueDate"), "%m-%d-%Y").date() # Our due date is a Date type so if the string we get is not in the fromat we need for conversion we return that error to the frontend
    except ValueError:
        return jsonify({"message": "Due date does not match MM-DD-YYYY format."}), 400

    if not task_name or not due_date: # We want to avoid adding empty task or due date items to the database and send an error
        return jsonify({"message": "You need a task name and a due date."}),400

    new_task = Task(task_name=task_name, due_date=due_date) # Create a new instance of our task class from models.py
    try:
        db.session.add(new_task) # Think of this try block like git, we have to add our change first and then commit it to the database
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)})
    return jsonify({
        "id": new_task.id,
        "taskName": new_task.task_name,
        "due_date": str(new_task.due_date)
        }), 201

@app.route("/update_task/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    task = Task.query.get(task_id)
    new_task_name = request.json.get("taskName")
    if not new_task_name:
        return jsonify({"message": "You need to enter a task name"}), 400
    try:
        new_task_date = datetime.strptime(request.json.get("dueDate"), "%m-%d-%Y").date()
    except (ValueError, TypeError): # Instead of checking not due date like in create_task, i am also catching type errors to avoid null inputs
        return jsonify({"message": "Due date does not match MM-DD-YYYY format."}), 400
    task.task_name = new_task_name
    task.due_date = new_task_date
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)})
    return jsonify({"message": "Sucessfully edited task"}), 200

@app.route("/delete_task/<int:task_id>", methods=["DELETE"]) # The <int:task_id> portion of the string will pass the task_id into our function as a parameter
def delete_task(task_id):
    task = Task.query.get(task_id)
    task_name = task.task_name
    if not task:
        return jsonify({"message": "Cannot delete a task that doesn't exist."}), 400
    try:
        db.session.delete(task)
        db.session.commit()
    except Exception as e:
        return jsonify("message", str(e))
    return jsonify({"message": f"Successfully deleted {task_name} task"}), 200

# This ensures the server only starts if this file is run directly, and not when it's imported into another file
if __name__ == "__main__":
    # Creates all of the models that we made for our database if we havent created the databse yet
    with app.app_context():
        db.create_all()

    app.run(debug=True)
