from domain.repositories.roadmap_repository import RoadmapRepository

roadmap_repository = RoadmapRepository()

class RoadmapService:
  def get_roadmap(self, semester_from, semester_to):
    return roadmap_repository.get_roadmap( semester_from, semester_to )
  
  def get_roadmap_by_student_id(self, year, student_id):
    return roadmap_repository.get_roadmap_by_student_id(year, student_id)

