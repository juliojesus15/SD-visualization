from flask import Blueprint, jsonify

from services.test_service import TestService

test_service = TestService()

class TestController:
	def __init__(self):
		self.blueprint = Blueprint('test', __name__)
		self.blueprint.route('/')(self.get_test)

	def get_test(self):        
		test = test_service.get_test()
		return jsonify({ 'message': test })
