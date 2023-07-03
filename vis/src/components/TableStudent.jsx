import { useContext } from "react"
import { ColorButton } from "./ColorButtom";

import { StudentContext } from "../context/StudentContext"

export const TableStudent = () => {
  const { linkStudent } = useContext(StudentContext)

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
        linkStudent &&  linkStudent.map( (student,key) => {
          //console.log(student)
          return (
            <tr key={ key } className="even:bg-gray-300 dark:even:bg-dark-200 w-full"> 
              <td className="text-center"> {key+1} </td>
              <td className="text-center"> {student.name} {student.lastname}</td>              
              <td className="text-center"> {student.gender} </td>
              <td className="text-center"> {student.enrollment} </td>              
              <td className="text-center relative">                 
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

