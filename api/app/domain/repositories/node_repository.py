from .base_repository import BaseRepository

class NodeRepository(BaseRepository):
  def __init__(self):
    data_dir = self.get_data_dir('db/nodes')
    super().__init__(data_dir)
  
  def get_nodes(self, year):
    try:    
      nodes = self.load_data(year)
      return nodes
    except FileNotFoundError:
      raise Exception('Archivo de nodos no encontrado')
  