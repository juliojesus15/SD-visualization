from utils.semester import get_semesters_within_range

class StudentService:
  def __init__(self, student_repository):
    self.student_repository = student_repository

  def get_roadmap(self, student_id, semester_from, semester_to, color):
    try:
      
      message, roadmap = self.student_repository.get_roadmap(semester_from)  
      student_roadmap = roadmap[student_id]
      
      general_range = get_semesters_within_range(semester_from, semester_to)
      student_range = get_semesters_within_range(semester_from, student_roadmap[len(student_roadmap) - 1]['timelapse'])


      min_num_semesters = min(len(student_range), len(general_range))

      container_links = []
      for index in range(min_num_semesters - 1):        
        source = student_roadmap[ index ]['semester']  + "-" + student_roadmap[ index ]['timelapse'] 
        target = student_roadmap[ index + 1 ]['semester']  + "-" + student_roadmap[ index + 1 ]['timelapse']
        container_links.append({
          "source": source,
          "status": color,
          "students": [],
          "target": target,
          "value": 20
        })

      container_nodes = [ {
        "name": "ES",
        "nodeId": "ES-" + semester_from,
        "status": "student",
        "vertical_order": 30
      }]
            
      return container_nodes, container_links
    except Exception as e:
      raise Exception('Error en el servicio de estudiantes: ' + str(e))
      