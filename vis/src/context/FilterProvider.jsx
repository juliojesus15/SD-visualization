import { useState, useEffect } from "react"
import { FilterContext } from "./FilterContext"


export const FilterProvider = ({ children }) => {
  const [ students, setStudents ] = useState([]);  

  const [ timelapse, setTimelapse ] = useState({ begin: 10, end: null })

  const handleBeginTime = (e) => {
    setTimelapse({ begin : e.target.value, end: null })
    
    var endTimeSelect = document.getElementById("endTime")
    endTimeSelect.selectedIndex = 0
  }

  const handleEndTime = (e) => {
    setTimelapse({
      ...timelapse, 
      end : e.target.value      
    })    
  }

  const data = { students, setStudents, timelapse, handleBeginTime, handleEndTime }
  
  return (
    <FilterContext.Provider value={ data }>
      { children }    
    </FilterContext.Provider>
  )
}