class LinkService:
  def __init__(self, link_repository):
    self.link_repository = link_repository

  def get_links(self, filename):
    try:
      links = self.link_repository.get_links(filename)
      if links is None:
        raise Exception('No se encontraron links para el periodo especificado')
      return links
    except Exception as e:
      raise Exception('Error en el servicio de links: ' + str(e))

