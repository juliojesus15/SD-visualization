from utils.semester import get_semesters_within_range

class StudentService:
  def __init__(self, student_repository):
    self.student_repository = student_repository

  def get_roadmap(self, student_id, semester_from, semester_to):
    try:
      message, roadmap = self.student_repository.get_roadmap(semester_from)  
      #roadmap = self.student_repository.get_roadmap(semester_from, semester_to)
      #if nodes is None:
      #  raise Exception('No se encontraron nodos para el periodo especificado')

      student_roadmap = roadmap[student_id]
      student_roadmap[0] = { **student_roadmap[0], "roadmap": "ES"  }

      container_links = []
      for index in range(0, len(student_roadmap)-1):
        source = student_roadmap[ index ]['roadmap'] + '-' + student_roadmap[ index ]['time']
        target = student_roadmap[ index+1 ]['roadmap'] + '-' + student_roadmap[ index+1 ]['time']
        container_links.append({
          "source": source,
          "status": "student",
          "students": [],
          "target": target,
          "value": 10
        })

      container_nodes = [ {
        "name": "ES",
        "nodeId": "ES-2010-01",
      } ]

      #return semesters[student_id]
      return container_nodes, container_links
    except Exception as e:
      raise Exception('Error en el servicio de estudiantes: ' + str(e))
      