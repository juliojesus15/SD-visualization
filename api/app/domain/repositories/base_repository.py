import os
import json

class BaseRepository:
  def __init__(self, data_dir):
    self.data_dir = data_dir

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
