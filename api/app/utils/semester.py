semesters = [
  '2010-01', '2010-02', 
  '2011-01', '2011-02', 
  '2012-01', '2012-02', 
  '2013-01', '2013-02', 
  '2014-01', '2014-02',
  '2015-01', '2015-02', 
  '2016-01', '2016-02', 
  '2017-01', '2017-02',
  '2018-01', '2018-02', 
  '2019-01', '2019-02', 
  '2020-01',
]

def get_semesters_within_range(semester_from, semester_to):
  """
    Retorna una sublista de semestres dentro del rango especificado.
    Args:
        semester_from (str): Semestre inicial del rango.
        semester_to (str): Semestre final del rango.

    Retorna:
        list: Sublista de semestres dentro del rango [semester_from, semester_to].    
  """
  try:
    semester_from_id = semesters.index(semester_from)
    semester_to_id = semesters.index(semester_to)
    return semesters[semester_from_id:semester_to_id+1]
  except ValueError:
    raise ValueError("semester_from o semester_to no están presentes en la lista de semestres")
