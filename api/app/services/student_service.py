from domain.repositories.student_repository import StudentRepository

student_repository = StudentRepository()

class StudentService:
	def get_students(self):
		return student_repository.get_students()

