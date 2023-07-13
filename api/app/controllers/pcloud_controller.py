from flask import Blueprint, jsonify, request

class PCloudController:
  def __init__(self, pcloud_service):
    self.pcloud_service = pcloud_service
    
    self.blueprint = Blueprint('pcloud', __name__)
    self.blueprint.route('/api/pcloud/<enrollment>', methods=['GET'])(self.get_data)

  def get_data(self, enrollment):
    try:
      period = request.args.get('period')
      semester = request.args.get('semester')
      points, dropout_status, list_student = self.pcloud_service.get_data(period, semester, enrollment)
      return jsonify({'status': True, 'points': points.tolist(), 'class': dropout_status, 'students': list_student }), 200      
    
    except Exception as e:
      error_message = str(e)
      print(error_message)
      return jsonify({'status': False }), 500
