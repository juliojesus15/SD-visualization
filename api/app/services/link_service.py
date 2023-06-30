from utils.semester import get_semesters_within_range

class LinkService:
  def __init__(self, link_repository):
    self.link_repository = link_repository

  def get_links_within_range(self, semester_from, semester_to):
    """
      Obtiene los links dentro de un rango de semestres.
      Args:
        semester_from (str): Semestre inicial del rango.
        semester_to (str): Semestre final del rango.
      Returns:
        lista de links concatenados.
    """

    try:
      semesters = get_semesters_within_range(semester_from, semester_to)
      combined_semesters = [f"{x}_{y}" for x, y in zip(semesters, semesters[1:])]
      
      container_links = []
      
      for semester in combined_semesters:
        message, links = self.link_repository.get_links(semester)
        container_links.append(links)
      
        if links is None:
          raise Exception('No se encontraron links para el rango especificado')      
        
      joined_links = [link for sublist in container_links for link in sublist]          
      return joined_links
    
    except Exception as e:
      raise Exception('Error en el servicio de nodos: ' + str(e))