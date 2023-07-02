from flask import Blueprint, jsonify, request

class SemesterController:
	def __init__(self, semester_service):
		self.semester_service = semester_service
		
		self.blueprint = Blueprint('semester', __name__)
		self.blueprint.route('/api/semester', methods=['GET'])(self.get_semesters)
		
		
	def get_semesters(self):
		try:				
			semester_from = request.args.get('semester_from')
			semester_to = request.args.get('semester_to')
			semesters = self.semester_service.get_semesters(semester_from, semester_to)
			return jsonify({'status': True, 'semesters': semesters}), 200
		
		except Exception as e:
			error_message = str(e)
			return jsonify({'status': False, 'nodes': None}), 500
