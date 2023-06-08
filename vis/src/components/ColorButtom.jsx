import React, { useState, useContext } from 'react';
import {colorsTab10} from "../constant/colors"

import { FilterContext } from "../context/FilterContext"

import { getRoadmapByStudentId } from "../services/studentService"
import { times } from "../constant/filter";


export const ColorButton = ({id, name, lastname }) => {
  const { students, setNodes, setLinks, nodes, links, timelapse } = useContext(FilterContext)

  const [isOpen, setIsOpen] = useState(false);
  

  
  const handleClick = () => {
    //console.log("*", id, name, lastname )
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className='border border-gray-600 px-3 py-1 text-xs rounded-lg hover:scale-105 active:scale-95' onClick={handleClick}> Detalle </button>
      {isOpen && <Popup id={id}  name={name}  lastname={lastname}/>}
    </div>
  );
};


const Popup =  ({ id, name, lastname }) => {
  const [ studentsSelected, setStudentsSelected] = useState([])
  const { students, setNodes, setLinks, nodes, links, timelapse } = useContext(FilterContext)

  const handleColorClick = async (color) => {
    // Aquí puedes realizar alguna acción con el color seleccionado
    const foundStudentId = studentsSelected.find(( studentId) => studentId == id );    

    if (!foundStudentId) {      
      console.log("**")
      setStudentsSelected([...studentsSelected, id])
      studentsSelected.push(id)      

      const timeBegin = times[timelapse.begin].name
      const timeEnd = times[timelapse.end].name
  
      const response = await getRoadmapByStudentId(id, name, lastname, timeBegin, timeEnd, color)
  
      console.log(response)
      setNodes([...nodes, response.node])
      setLinks([...links, ...response.links])
    }
    

    console.log('Color seleccionado:', color);
  };
/*
  const getRow = async (color) => {
    //console.log({ id, name, lastname });    
    ///api/student/sankey/data
    //console.log(enrollment)
    //console.log("BEFORE=> ", studentsSelected)
    
    const foundStudentId = studentsSelected.find(( studentId) => studentId == id );    

    if (!foundStudentId) {      
      console.log("**")
      setStudentsSelected([...studentsSelected, id])
      studentsSelected.push(id)      

      const timeBegin = times[timelapse.begin].name
      const timeEnd = times[timelapse.end].name
  
      const response = await getRoadmapByStudentId(id, name, lastname, timeBegin, timeEnd)
  
      console.log(response)
      setNodes([...nodes, response.node])
      setLinks([...links, ...response.links])
    }
    
  };
*/

  return (
    <div className="color-popup grid grid-cols-5">
      {colorsTab10.map((color) => (
        <div
          key={color}
          className="color-option w-10 h-10"
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        />
      ))}
    </div>
  );
};


