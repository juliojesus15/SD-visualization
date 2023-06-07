import { useState, useEffect } from "react"
import { FilterContext } from "./FilterContext"


import {times}  from "../constant/filter"

export const FilterProvider = ({ children }) => {

  const [ selectedNodes, setSelectedNodes ] = useState([])

  const [ selectedTimes, setSelectedTimes ] = useState([])
  const [ students, setStudents ] = useState([]);  

  const [ nodes, setNodes ] = useState();
  const [ links, setLinks ] = useState();
    

  const [ timelapse, setTimelapse ] = useState({ begin: 10, end: 12 })


  useEffect( ()=> {
    //console.log(timelapse)
    const t = times.filter( ( _, key) => ( timelapse.begin <= key && key <= timelapse.end  ) )
    
    const container = []

    t.forEach( element => {
      //console.log(element)
      container.push({...element, semesters:[]})
    })
    
    //console.log(container)
    setSelectedTimes(container)
  },[timelapse] )

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

  const data = { students, setStudents, timelapse, handleBeginTime, handleEndTime, nodes, links, setNodes, setLinks,
      selectedNodes ,setSelectedNodes, setSelectedTimes, selectedTimes
    }
  
  return (
    <FilterContext.Provider value={ data }>
      { children }    
    </FilterContext.Provider>
  )
}