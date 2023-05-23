import { getNodesBetweenTimelapses, getLinksBetweenTimelapses, getNodes, getLinks, getFreshmenByTime } from "../repositories/sankeyRepository"

const getSankeyDiagram = async (req, res) => {
  try {    
    const {timelapseBegin, timelapseEnd } = req.query;
    const nodes = await getNodesBetweenTimelapses(timelapseBegin, timelapseEnd)
    const links = await getLinksBetweenTimelapses(timelapseBegin, timelapseEnd)

    res.json({ nodes, links });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la data.' });
  }
};


const getSankeyDiagramOnlyFreshmen = async (req, res) => {
  try {
    const {timelapseBegin, timelapseEnd } = req.query;
    
    const freshmen = await getFreshmenByTime(timelapseBegin)
    const arrayNodes = await getNodesBetweenTimelapses(timelapseBegin, timelapseEnd)
    const arrayLinks = await getLinks(timelapseBegin, timelapseEnd)
        

    const initialNodeId = '1N-' + timelapseBegin

    const percentage = freshmen.student_ids.length

    let stack = [ initialNodeId ]
    let stackNodes = [ initialNodeId ]
    
    let links = []
    arrayLinks.forEach( array => {
      // Array para almacenar cada vecino de cada elemento en el array stack
      let neighbors = []

      // filtrando los enlaces de cada elemento en el array stack
      stack.forEach( sourceId => {
        const filtered = array.filter( link => link.source === sourceId)        
        
        // Agregamos un color a cada link filtrado
        const linksWithColor = filtered.map( element => {

          const filterStudent = element.students.filter( student => student.enrollment ===  timelapseBegin)
                      
          const a = element.source[0]
          const b = element.target[0]
          if ( a==b ) element.color = "links__link--repeat"
          else if ( a<b ) element.color = "links__link--success"
          else if ( b == "0" ) element.color = "links__link--dropout"
          element.students = filterStudent
          element.value = (filterStudent.length / percentage) * 100
          return element        
        })

        const deletingEmptyStudents = linksWithColor.filter( link => link.students.length !=  0)
        //console.log(deletingEmptyStudents)
        neighbors = [...neighbors, ...deletingEmptyStudents]
      })
      
      // concatenacion de los links
      links = [...links, ...neighbors]

      // reiniciamos el stack para almacenar el vecindario encontrado
      stack = []  
      neighbors.forEach( link => {
        stackNodes.push(link.target)
        stack.push(link.target)
      })
    })

    stackNodes = [...new Set(stackNodes)]

    let nodes = []
    stackNodes.forEach( id => {
      const filtered = arrayNodes.filter( node => node.nodeId === id)
      nodes = [...nodes, ...filtered]
    })
        
    res.json({ nodes, links});

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener la data.' });
  }
}

export { getSankeyDiagram, getSankeyDiagramOnlyFreshmen };