from flask import Blueprint, jsonify, request

class LinkController:
	def __init__(self, link_service):
		self.link_service = link_service
		
		self.blueprint = Blueprint('link', __name__)
		self.blueprint.route('/link', methods=['GET'])(self.get_links)
		
	def get_links(self):
		try:				
			semester_from = request.args.get('semester_from')
			semester_to = request.args.get('semester_to')
			filename = semester_from + "_" + semester_to			
			message, links = self.link_service.get_links(filename)
			return jsonify({ 'message': message, 'links': links }), 200
		except Exception as e:
			error_message = str(e)
			return jsonify({'message': error_message, 'links': None}), 500
