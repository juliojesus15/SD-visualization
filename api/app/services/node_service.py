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

