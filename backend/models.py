# Where we interact with the database
from config import db # We import our database object from our config file to get access to SQLAlchemy and we can create our models

# Database model that will be represented as a python class 
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True) # Creates a column in our database to store our ids, we set the data type of the column to be an integer, and primary key says that this will be how we uniquely identify rows in our column
    due_date = db.Column(db.Date, unique=False, nullable=False) # Column to store due date for task with data type date, we state that is not unique to every row and the value cannot be null
    task_name = db.Column(db.String(100), unique=False, nullable=False) # Column to store the task names with data type string with a maximum length of 100 characters (you must set a max length when you set the data type as a string)

    # Allows us to send data from our database to communicate iwth the frontend using a JSON by converting our data into a python dictionary which can easily be converted to a JSON that can be taken in by the frontend
    def to_json(self):
        return {
            "id": self.id,
            "dueDate": self.due_date,
            "taskName": self.task_name
        }


    