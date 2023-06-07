import { useContext, useState } from "react"

import { FilterContext } from "../context/FilterContext"

import { getRoadmapByStudentId } from "../services/studentService"

import { times } from "../constant/filter";

export const StudentTable = () => {
  const { students, setNodes, setLinks, nodes, links, timelapse, selectedTimes, setSelectedTimes } = useContext(FilterContext)

  const [ studentsSelected, setStudentsSelected] = useState([])

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

  return <div className="text-gray-900 text-lg font-bold w-ful"> 
    <table className="text-sm wfull bg-cyan-300 p-2">
      <thead>
        
        <tr className="[&>*]w-1/5  bg-red-500  ">
          <th className="w-15 bg-purple-500"> # </th>
          <th className="w-15 bg-purple-500"> Id  </th>
          <th className="w-15 bg-purple-500"> Alumno  </th>
          <th className="w-1/5"> Genero </th>
          <th className="w-15 bg-purple-500 block -5"> Matricula </th>
          
          <th className="w-1/5"> opciones </th>
        </tr>

      </thead>
      <tbody>

      {
        students.map( (student,key) => {
          //console.log(student)
          return (
            <tr key={ key } className="even:bg-gray-200  w-full"> 
              <td className="text-center"> {key+1} </td>
              <td className="text-center "> {student.id} </td>
              <td className="text-center"> {student.name} {student.lastname}</td>
              
              <td className="text-center"> {student.gender} </td>
              <td className="text-center"> {student.enrollment} </td>
              
              <td className="text-center"> 
                <button  
                  onClick={ () => getRow(student) } 
                  className="border border-gray-600 px-3 py-1 text-xs rounded-lg hover:scale-105 active:scale-95"> Detalle 
                </button> 
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
    
  </div>
}

