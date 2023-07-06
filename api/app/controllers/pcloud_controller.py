from flask import Blueprint, jsonify, request

class PCloudController:
  def __init__(self, pcloud_service):
    self.pcloud_service = pcloud_service
    
    self.blueprint = Blueprint('pcloud', __name__)
    self.blueprint.route('/api/pcloud', methods=['GET'])(self.get_data)

  def get_data(self):
    try:							
      points, especies = self.pcloud_service.get_data()     
      #print("*** ", points) 
      #return jsonify(points.tolist())
      return jsonify({'status': True, 'points': points.tolist(), 'especies': especies }), 200
    
    except Exception as e:
      error_message = str(e)
      return jsonify({'status': False }), 500
