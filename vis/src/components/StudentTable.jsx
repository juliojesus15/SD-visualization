import { useContext, useState } from "react"

import { FilterContext } from "../context/FilterContext"

import { getRoadmapByStudentId } from "../services/studentService"

import { times } from "../constant/filter";

export const StudentTable = () => {
  const { students, setNodes, setLinks, nodes, links, timelapse } = useContext(FilterContext)

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

  return <div className="text-gray-700 text-lg font-bold w-full "> 
    <table className="text-sm w-full">
      <thead className="w-full">
        <tr className="flex justify-between   w-full">
          <th className="text-center">  </th>
          <th className="text-">   </th>
          <th className="text-center">   </th>
        </tr>
      </thead>
      <tbody className="w-full">
      {
        students.map( (student,key) => {
          //console.log(student)
          return (
            <tr key={ key } className="even:bg-gray-200 grip grid-cols-3 justify-between"> 
              <td className="text-center"> {key+1} </td>
              <td className="text-center hidden md:block"> {student.id} </td>
              <td className="text-center"> {student.name} </td>
              <td className="text-center"> {student.lastname} </td>
              <td className="text-center"> {student.gender} </td>
              <td className="text-center"> {student.enrollment} </td>
              <td className="text-center"> {student.semester} </td>
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

