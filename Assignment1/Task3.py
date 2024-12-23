#Task 3

class Students:

    def __init__(self):
        self.student_ids = set()

#Method for adding a new student ID to the set.
    def add_student(self, student_id):
        self.student_ids.add(student_id)

#Method for removing a student ID from the set.
    def remove_student(self, student_id):
        if student_id in self.student_ids:
            self.student_ids.remove(student_id)
        else:
            raise ValueError(f"Student ID '{student_id}' is not in the set.")

#Method for checking if a student ID is in the collection.
    def check_student(self, student_id):
        return student_id in self.student_ids


#Method for displaying all student IDs in the collection.
    def display_students(self):
       return "\n".join([str(student_id) for student_id in sorted(self.student_ids)])


students = Students()

students.add_student(20202263)
students.add_student(20202256)
print(students.display_students())

students.remove_student(20202256)
print("Is 20202263 in the collection?", students.check_student(20208637))
print("All students:")
print(students.display_students())
