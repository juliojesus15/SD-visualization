from flask import Blueprint, jsonify, request

from services.roadmap_service import RoadmapService

roadmap_service = RoadmapService()

class RoadmapController:
	def __init__(self):
		self.blueprint = Blueprint('roadmap', __name__)
		self.blueprint.route('/roadmap', methods=['GET'])(self.get_roadmap)
		self.blueprint.route('/roadmap/<year>', methods=['GET'])(self.get_roadmap_by_student_id)


	def get_roadmap(self):          
		semester1 = request.args.get('semester_from')
		semester2 = request.args.get('semester_to')
		roadmap = roadmap_service.get_roadmap(semester1, semester2)
		return jsonify(roadmap)
	
	def get_roadmap_by_student_id(self, year):          
		student_id = request.args.get('student_id')
		roadmap = roadmap_service.get_roadmap_by_student_id(year, student_id)
		return jsonify(roadmap)