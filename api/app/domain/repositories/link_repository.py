from .base_repository import BaseRepository

class LinkRepository(BaseRepository):
  def __init__(self):
    data_dir = self.get_data_dir('db/links')
    super().__init__(data_dir)
  
  def get_links(self, filename):    
    try:    
      links = self.load_data(filename)
      return links
    except FileNotFoundError:
      raise Exception('Archivo de links no encontrado')