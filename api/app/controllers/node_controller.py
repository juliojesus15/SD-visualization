from flask import Blueprint, jsonify

class NodeController:
	def __init__(self, node_service):
		self.node_service = node_service
		
		self.blueprint = Blueprint('node', __name__)
		self.blueprint.route('/node/<year>', methods=['GET'])(self.get_nodes)
		
	def get_nodes(self, year):
		try:				
			message, nodes = self.node_service.get_nodes(year)
			return jsonify({'message': message, 'nodes': nodes}), 200
		except Exception as e:
			error_message = str(e)
			return jsonify({'message': error_message, 'nodes': None}), 500
