import { timelapses } from '../constants/timelapses.js';
import { getRoadmapByStudentId } from '../repositories/studentRepository.js';

export const getSankeyByStudentId = async (req, res) => {
  try {
    const { studentId, name, lastname, timeBegin, timeEnd, color } = req.query;

    let studentRoadmap = await getRoadmapByStudentId(studentId, timeBegin, timeEnd, color);
    console.log(timeEnd)
    console.log(studentRoadmap)

    const nodeId = "0N-" + timeBegin

    let node = {"nodeId": nodeId, "name": name + " " + lastname, "color": color, "x": 0}
    
    studentRoadmap[0].roadmap = "0N"
    
    const idxBegin = timelapses.indexOf(timeBegin)
    const idxEnd = timelapses.indexOf(timeEnd)

    const it = idxEnd -idxBegin
    console.log("Begin: ", idxBegin, " = End: ", idxEnd)
    console.log("IT: ", it)
    console.log("LEN: ", studentRoadmap.length)

    //const counter = studentRoadmap.length >= it ? it : (studentRoadmap.length -1)

    let counter = 0
    if (it == studentRoadmap.length) {
      counter = it - 1
    }
    else if (studentRoadmap.length > it) {
      counter = it
    }
    else if (studentRoadmap.length < it) {
      counter = studentRoadmap.length -1
    }


    let links = []

    for (let i = 0; i < counter; i++) {
      const source = studentRoadmap[ i ].roadmap + "-" + studentRoadmap[ i ].time
      const target = studentRoadmap[ i+1 ].roadmap + "-" + studentRoadmap[ i+1 ].time
      
      const link = {
        source, 
        target,        
        value: 10,
        students: [],
        color: color
      }
      
      links.push(link)

      //console.log(roadmap );
    }


    res.json({node,  links});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el roadmap del estudiante.' });
  }
};

