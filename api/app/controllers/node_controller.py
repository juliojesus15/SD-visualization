from flask import Blueprint, jsonify, request

class NodeController:
	def __init__(self, node_service):
		self.node_service = node_service
		
		self.blueprint = Blueprint('node', __name__)
		self.blueprint.route('/node', methods=['GET'])(self.get_nodes_within_range)
		self.blueprint.route('/node/<year>', methods=['GET'])(self.get_nodes)

		
	def get_nodes(self, year):
		try:				
			message, nodes = self.node_service.get_nodes(year)
			return jsonify({'message': message, 'nodes': nodes}), 200
		except Exception as e:
			error_message = str(e)
			return jsonify({'message': error_message, 'nodes': None}), 500
		
	def get_nodes_within_range(self):
		try:				
			semester_from = request.args.get('semester_from')
			semester_to = request.args.get('semester_to')
			nodes = self.node_service.get_nodes_within_range(semester_from, semester_to)
			return jsonify({'status': True, 'nodes': nodes}), 200
		except Exception as e:
			error_message = str(e)
			return jsonify({'status': False, 'nodes': None}), 500
