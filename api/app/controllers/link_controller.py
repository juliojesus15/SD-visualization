from flask import Blueprint, jsonify, request

class LinkController:
	def __init__(self, link_service):
		self.link_service = link_service
		
		self.blueprint = Blueprint('link', __name__)
		self.blueprint.route('/api/link', methods=['GET'])(self.get_links_within_range)
		
		
	def get_links_within_range(self):
		try:				
			semester_from = request.args.get('semester_from')
			semester_to = request.args.get('semester_to')

			links = self.link_service.get_links_within_range(semester_from, semester_to)
			
			return jsonify({'status': True, 'links': links}), 200
		
		except Exception as e:
			error_message = str(e)
			return jsonify({ 'status': False, 'links': None }), 500

