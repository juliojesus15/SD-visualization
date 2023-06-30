import { useContext, useState } from "react"
import { ColorButton } from "./ColorButtom";

import { FilterContext } from "../context/FilterContext"

import { getRoadmapByStudentId } from "../services/studentService"

import { times } from "../constant/filter";

export const StudentTable = () => {
  const { students, setNodes, setLinks, nodes, links, timelapse } = useContext(FilterContext)

  //const [ studentsSelected, setStudentsSelected] = useState([])

  const getRow = async ({ id, name, lastname }) => {
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

  return <div className="text-gray-900 dark:text-gray-300 text-lg font-bold w-ful"> 
    <table className="text-sm w-full b p-4 bg-red-00">
      <thead className="bg-cyan-  h-8 font-roboto tracking-tight uppercase text-xs">
        
        <tr className="[&>*]w-1/5   ">
          <th className="w-15 "> # </th>
          <th className="w-15 0"> Alumno  </th>
          <th className="w-1/5"> Genero </th>
          <th className="w-15 b00  -5"> Matricula </th>
          
          <th className="w-1/5"> opciones </th>
        </tr>

      </thead>
      <tbody className="text-gray-800 dark:text-gray-300 font-medium tracking-tighter">

      {
        students.map( (student,key) => {
          //console.log(student)
          return (
            <tr key={ key } className="even:bg-gray-300 dark:even:bg-dark-200 w-full"> 
              <td className="text-center"> {key+1} </td>
              <td className="text-center"> {student.name} {student.lastname}</td>
              
              <td className="text-center"> {student.gender} </td>
              <td className="text-center"> {student.enrollment} </td>
              
              <td className="text-center relative"> 
                {/*<button  
                  onClick={ () => getRow(student) } 
                  className="border border-gray-600 px-3 py-1 text-xs rounded-lg hover:scale-105 active:scale-95"> Detalle 
                  </button> */}
                <ColorButton id={student.id}  name={student.name}  lastname={student.lastname}/>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
    
  </div>
}

