from flask import Blueprint, jsonify, request

class StudentController:
  def __init__(self, student_service):
    self.student_service = student_service
    self.blueprint = Blueprint('student', __name__)
    self.blueprint.route('/api/student/roadmap/<student_id>', methods=['GET'])(self.get_roadmap)

  def get_roadmap(self, student_id):
      
    try:							
      semester1 = request.args.get('semester_from')
      semester2 = request.args.get('semester_to')
      nodes, links = self.student_service.get_roadmap(student_id, semester1, semester2)          
      return jsonify({'status': True, 'nodes': nodes, 'links': links }), 200
    
    except Exception as e:
      error_message = str(e)
      return jsonify({'status': False }), 500