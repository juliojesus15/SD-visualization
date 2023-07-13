import umap
from sklearn.preprocessing import StandardScaler

import os

class PCloudService:
  def __init__(self, pcloud_repository, node_repository):
    self.pcloud_repository = pcloud_repository
    self.node_repository = node_repository
          
  def get_data(self, period, semester, enrollment):
    try:      
      model = self.pcloud_repository.get_data("50_0_1_euclidean")

      message, nodes = self.node_repository.get_nodes(period)
      key = semester + "-" + period
      node = next((node for node in nodes if node["nodeId"] == key), None)
      students = node['student']
      
      grades = [student["grades"] for student in students.values() if student.get("enrollment") == enrollment]
      dropout = [student["dropout"] for student in students.values() if student.get("enrollment") == enrollment]
      list_student = [(student["name"] + " " + student["lastname"]) for student in students.values() if student.get("enrollment") == enrollment]

      scaled_data = StandardScaler().fit_transform(grades)
      embedding = model.transform(scaled_data)
   
      return embedding, dropout, list_student
    except Exception as e:
      error_message = str(e)
      print ("Error: ", error_message)