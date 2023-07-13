from .base_repository import BaseRepository

class PCloudRepository(BaseRepository):
  def __init__(self):
    model_dir = self.get_data_dir('db/train/umap')
    super().__init__(model_dir)
  
  def get_data(self, filename):
    try:    
      message, model = self.load_model(filename)
      return model
    except FileNotFoundError:
      raise Exception('Archivo no encontrado')
  