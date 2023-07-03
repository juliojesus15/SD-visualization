from flask import Blueprint, jsonify, request

class SankeyController:
	def __init__(self, sankey_service):
		self.sankey_service = sankey_service
		
		self.blueprint = Blueprint('sankey', __name__)
		self.blueprint.route('/api/sankey', methods=['GET'])(self.get_data)

	def get_data(self):
		try:				
			semester_from = request.args.get('semester_from')
			semester_to = request.args.get('semester_to')
			
			nodes, links, semesters = self.sankey_service.get_data(semester_from, semester_to)
			
			return jsonify({'status': True, 'nodes': nodes, 'links': links, 'semesters': semesters }), 200
		
		except Exception as e:
			error_message = str(e)
			return jsonify({'status': False, 'nodes': None, 'links': None, 'semesters': None}), 500
