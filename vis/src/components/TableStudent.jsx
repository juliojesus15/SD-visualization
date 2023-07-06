import { useContext } from "react"
import { StudentContext } from "../context/StudentContext"

import { ColorButton, ColorPickerPopup } from "./ColorButtom";

export const TableStudent = () => {
  const { linkStudent } = useContext(StudentContext)

  return (
    <table className="font-roboto text-xs text-gray-800 dark:text-gray-300 w-full">
      <thead className="font-bold tracking-tight uppercase text-xs bg-gray-300 dark:bg-dark-200 h-8">        
        <tr className="[&>*]w-1/5">
          <th className=""> # </th>
          <th className=""> Alumno  </th>
          <th className=""> Genero </th>
          <th className=""> Matricula </th>          
          <th className=""> Ver </th>
        </tr>
      </thead>
      <tbody className="font-normal">
      {
        linkStudent &&  linkStudent.map( (student,key) => {
          return (
            <tr key={ key } className="even:bg-gray-300 dark:even:bg-dark-200 h-9"> 
              <td className="text-center"> {key+1} </td>
              <td className="text-center"> {student.name} {student.lastname} </td>              
              <td className="text-center"> {student.gender} </td>
              <td className="text-center"> {student.enrollment} </td>              
              <td className="relative flex justify-center items-center h-9">
                <ColorPickerPopup />
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )    
}

