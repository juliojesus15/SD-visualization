from utils.semester import get_semesters_within_range

class SemesterService:  
      
  def get_semesters(self, semester_from, semester_to):
    try:
      semesters = get_semesters_within_range(semester_from, semester_to)      
      return semesters
    
    except Exception as e:
      raise Exception('Error en el servicio de nodos: ' + str(e))

