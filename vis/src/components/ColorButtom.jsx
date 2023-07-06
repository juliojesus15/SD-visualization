import { useState, useContext } from 'react';
import {colorsTab10} from "../constant/colors"

import { FilterContext } from "../context/FilterContext"

import { getRoadmapByStudentId } from "../services/studentService"
import { times } from "../constant/filter";

const ColorSquare = ({ color }) => {
  return (
    <div style={{ backgroundColor: color }} className=' border-2 border-gray-400   w-6 h-6 hover:opacity-70 active:scale-95 cursor-pointer'></div>
  );
};

export const ColorPickerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedColor, setSelectedColor] = useState('white');
  const colors = ['red', 'green', 'blue', 'yellow'];
  
  const handleColorSelection = (color) => {  
    setSelectedColor(color);
    setIsOpen(!isOpen);
  };
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      {
        isOpen && ( 
          <div className='
            absolute top-0  right-full 
            bg-gray-50 dark:bg-dark-200 
            p-2 z-10 
            border border-gray-200 dark:border-dark-100
            shadow-md flex flex-wrap gap-1 w-[135px] -
          '>
          {
            colorsTab10.map((color) => (
              <div key={color} onClick={ () => handleColorSelection(color) } >
                <ColorSquare color={color} />
              </div>
          ))}
          </div>)
      }

      <div 
        style={{ backgroundColor: selectedColor }} 
        onClick={handleClick} 
        className='bg-white dark:bg-gray-200 border-2 border-gray-400  w-6 h-6 hover:opacity-70 active:scale-95 cursor-pointer'
      >        
      </div>
    </div>
  );
};

export const ColorButton = ({id, name, lastname }) => {  

  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button className='bg-white dark:bg-gray-200 border-2 border-gray-400  w-6 h-6 hover:opacity-70 active:scale-95' onClick={handleClick}>  </button>
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

  return (
    <div className="
      absolute top-0  right-full 
      bg-gray-50 dark:bg-dark-200 
      p-2 z-10 
      border border-gray-200 dark:border-dark-100
      shadow-md flex flex-wrap gap- w-[150px] justify-">
      {colorsTab10.map((color) => (
        <div
          key={color}
          className="w-8 h-8 border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-70 shadow-lg"
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        />
      ))}
    </div>
  );
};


