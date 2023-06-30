from utils.semester import get_semesters_within_range

class NodeService:
  def __init__(self, node_repository):
    self.node_repository = node_repository

  def get_nodes(self, year):
    try:
      nodes = self.node_repository.get_nodes(year)
      if nodes is None:
        raise Exception('No se encontraron nodos para el periodo especificado')
      return nodes
    except Exception as e:
      raise Exception('Error en el servicio de nodos: ' + str(e))
      
  def get_nodes_within_range(self, semester_from, semester_to):
    """
      Obtiene los nodos dentro de un rango de semestres.
      Args:
        semester_from (str): Semestre inicial del rango.
        semester_to (str): Semestre final del rango.
      Returns:
        lista de nodos concatenados.
    """

    try:
      semesters = get_semesters_within_range(semester_from, semester_to)      
      container_nodes = []
      
      for semester in semesters:
        message, nodes = self.node_repository.get_nodes(semester)
        container_nodes.append(nodes)
      
      joined_modes = [node for sublist in container_nodes for node in sublist]
      
      if nodes is None:
        raise Exception('No se encontraron nodos para el rango especificado')      
    
      return joined_modes
    
    except Exception as e:
      raise Exception('Error en el servicio de nodos: ' + str(e))

