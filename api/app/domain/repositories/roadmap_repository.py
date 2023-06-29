import json
import os

class RoadmapRepository:
  def __init__(self):
    self.current_dir = os.path.abspath(os.path.dirname(__file__))
    self.data_dir = os.path.abspath(os.path.join(self.current_dir, os.pardir, 'db/roadmap'))

  def load_data(self, filename):    
    path = str(self.data_dir + "/" + filename + ".json")    
    with open(path) as json_file:
      data = json.load(json_file)
    return data

  def get_roadmap(self, semester_from, semester_to ):    
    data = self.load_data(semester_from)
    #data = self.load_data(semester_to)
    return data
  
  def get_roadmap_by_student_id(self, year, student_id):
    student_roadmap = self.load_data(year)

    if student_id in student_roadmap:
      return student_roadmap[student_id]    




