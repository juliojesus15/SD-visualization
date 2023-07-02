from utils.semester import get_semesters_within_range

class SankeyService:
  def __init__(self, node_repository, link_repository):
    self.node_repository = node_repository
    self.link_repository = link_repository

      
  def get_data(self, semester_from, semester_to):
    try:
      semesters = get_semesters_within_range(semester_from, semester_to)  
      combined_semesters = [f"{x}_{y}" for x, y in zip(semesters, semesters[1:])]
      
      container_nodes = []
      container_links = []
      
      for semester in combined_semesters:
        message, links = self.link_repository.get_links(semester)                
        container_links.append(links)
            
      for semester in semesters:
        message, nodes = self.node_repository.get_nodes(semester)
        container_nodes.append(nodes)
            
      if nodes is None or links is None:
        raise Exception('No se encontraron datos para el rango especificado')      
    
      joined_modes = [node for sublist in container_nodes for node in sublist]
      joined_links = [link for sublist in container_links for link in sublist]       
      return joined_modes, joined_links, semesters 
    
    except Exception as e:
      raise Exception('Error en el servicio de nodos: ' + str(e))

