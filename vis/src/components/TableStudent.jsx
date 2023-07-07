import { useContext, useState } from "react"

import { StudentContext } from "../context/StudentContext"
import usePopupToggle from "../hooks/usePopupToggle";

import { ColorPickerPopup } from "./ColorPickerPopup";
import { ColorBox } from "./ColorBox";

export const TableStudent = () => {
  const defaultColors = [
    { bg: "bg-tab-blue",   name: 'tab-blue',   available: true, busyFor: ""}, // blue
    { bg: "bg-tab-orange", name: 'tab-orange', available: true, busyFor: ""}, // orange
    { bg: "bg-tab-green",  name: 'tab-green',  available: true, busyFor: ""}, // green
    { bg: "bg-tab-red",    name: 'tab-red',    available: true, busyFor: ""}, // red
    { bg: "bg-tab-purple", name: 'tab-purple', available: true, busyFor: ""}, // purple
    { bg: "bg-tab-brown",  name: 'tab-brown',  available: true, busyFor: ""}, // brown
    { bg: "bg-tab-pink",   name: 'tab-pink',   available: true, busyFor: ""}, // pink
    { bg: "bg-tab-gray",   name: 'tab-gray',   available: true, busyFor: ""}, // gray
    { bg: "bg-tab-olive",  name: 'tab-olive',  available: true, busyFor: ""}, // olive
    { bg: "bg-tab-cyan",   name: 'tab-cyan',   available: true, busyFor: ""}, // cyan
  ]

  const { linkStudent } = useContext(StudentContext)

  const {openPopup, closePopup, isOpen} = usePopupToggle();

  const [ isAllChecked, setIsAllChecked ] = useState(false);  
  const [ colors, setColors ] = useState(defaultColors)  
  const [ students, setStudents ] = useState([])


  const handleAllCheckboxChange = () => {
    setIsAllChecked(!isAllChecked);
  };
  
  const updateColor = (nameColor, statusColor, studentId) => {
    const updatedColors = colors.map((color) => ( color.name === nameColor ? {...color, available: statusColor, busyFor: studentId} : color));
    setColors(updatedColors);
  }

  const addStudent = ( studentId ) => {    
    if ( !students.some(student => student === studentId) && students.length<10 ) {            
      setStudents( prev => [...prev, studentId] )
    }    
  }

  const removeStudent = ( studentId ) => {
    const updatedStudents = students.filter((student) => student !== studentId );
    setStudents(updatedStudents);
  }

 
  return (      
    <table className="relative font-roboto text-xs text-gray-800 dark:text-gray-300 w-full bg-gray-50 dark:bg-dark-100">
      <thead className="font-bold tracking-tight uppercase text-xs bg-gray-300 dark:bg-dark-200 h-9 sticky top-0 right-0 left-0 z-20"> 
        <tr>
          <th> Ruta </th>
          <th> Alumno </th>
          <th> Género </th>
          <th> Matrícula </th>          
          <th> 
            <label className="text-[0.5rem] flex flex-col items-center justify-center"> 
              Proyectar 
              <input 
                type="checkbox" 
                id="cbox1" 
                checked={isAllChecked}
                onChange={handleAllCheckboxChange} 
                value="first_checkbox"
              />  
            </label> 
          </th>
        </tr>
      </thead>
      <tbody className="font-normal">
      {
        linkStudent &&  linkStudent.map( (student,key) => {
          return (
            <tr key={ key } className="even:bg-gray-300 dark:even:bg-dark-200 h-6"> 
              <td className="flex justify-center items-center h-6">                  
                <ColorPickerPopup 
                  addStudent={ addStudent } 
                  removeStudent={ removeStudent } 
                  colors={ colors } 
                  updateColor={ updateColor } 
                  studentId={ student.id }
                  controllerOpenPopup={ openPopup }
                  controllerClosePopup={ closePopup }
                  isPopupOpen={ isOpen }
                />           
              </td>
              <td className="text-center"> {student.name} {student.lastname} </td>              
              <td className="text-center"> {student.gender} </td>
              <td className="text-center"> {student.enrollment} </td>              
              <td className="flex justify-center items-center h-6"> 
                <input type="checkbox" id={key}  checked={isAllChecked}  onChange={handleAllCheckboxChange} value="first_checkbox" />  
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>      
  )    
}