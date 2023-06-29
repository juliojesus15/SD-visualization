from flask import Blueprint, jsonify

from services.student_service import StudentService

student_service = StudentService()

class StudentController:
	def __init__(self):
		self.blueprint = Blueprint('students', __name__)
		self.blueprint.route('/students')(self.get_students)

	def get_students(self):        
		students = student_service.get_students()
		return jsonify({ 'message': students})


