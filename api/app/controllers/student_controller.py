from flask import Blueprint, jsonify, request

class StudentController:
  
  def __init__(self, student_service):
    self.student_service = student_service
    self.blueprint = Blueprint('student', __name__)
    self.blueprint.route('/api/student/<student_id>/roadmap', methods=['GET'])(self.get_roadmap)
  

  def get_roadmap(self, student_id):      
    try:							
      semester_from = request.args.get('semester_from')
      semester_to =  request.args.get('semester_to')
      color =  request.args.get('color')             
      a, b = self.student_service.get_roadmap(student_id, semester_from, semester_to, color)
      return jsonify({'status': True, 'nodes': a, 'links': b }), 200
      
    
    except Exception as e:
      error_message = str(e)
      print(error_message)
      return jsonify({'status': False }), 500