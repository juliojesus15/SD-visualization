import { useContext } from "react"

import { FilterContext } from "../context/FilterContext"

export const StudentTable = () => {
  const { students } = useContext(FilterContext)

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
          return (
            <tr key={ key } className="even:bg-gray-200 grip grid-cols-3 justify-between"> 
              <td className="text-center"> {key+1} </td>
              <td className="text-center"> {student.name} </td>
              <td className="text-center"> {student.lastName} </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
    
  </div>
}

