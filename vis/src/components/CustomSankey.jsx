import { useContext } from "react";

import { StudentContext } from "../context/StudentContext";

export const CustomSankey = () => {
  const { nodes, links, errorData } = useContext(StudentContext)

  return (
    <div className="text-gray-700 dark:text-gray-100">
      { !errorData ? JSON.stringify(nodes) : errorData }      
      <hr/>
      { !errorData ? JSON.stringify(links): errorData }
    </div>
  )
}