from .base_repository import BaseRepository

class StudentRepository(BaseRepository):
  def __init__(self):
    data_dir = self.get_data_dir('db/roadmap')
    super().__init__(data_dir)
  
  def get_roadmap(self, semester_from):
    try:    
      roadmap = self.load_data(semester_from)
      return roadmap
    except FileNotFoundError:
      raise Exception('Archivo de nodos no encontrado')
  