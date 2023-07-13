import os
import json
import pickle

class BaseRepository:
  def __init__(self, data_dir):
    self.data_dir = data_dir

  def load_model(self, filename):
    try:
      path = os.path.join(self.data_dir, f"{filename}.pkl")
      with open(path, 'rb') as file:
        umap_pre_trained = pickle.load(file)      
      message = "Modelo cargado"
      return message, umap_pre_trained
    except FileNotFoundError:
      message = "El archivo para cargar el modelo no se encontró"
      raise Exception(message)

  def load_data(self, filename):
    try:
      path = os.path.join(self.data_dir, f"{filename}.json")
      with open(path) as json_file:
        data = json.load(json_file)
      message = "Lectura de archivo exitosa"
      return message, data
    except FileNotFoundError:
      message = "El archivo no se encontró"
      raise Exception(message)

  @staticmethod
  def get_data_dir(relative_dir):
    current_dir = os.path.abspath(os.path.dirname(__file__))
    data_dir = os.path.abspath(os.path.join(current_dir, os.pardir, relative_dir))
    return data_dir
