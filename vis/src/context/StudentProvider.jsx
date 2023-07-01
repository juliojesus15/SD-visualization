import { useState, useEffect } from "react"
import { StudentContext } from "./StudentContext"

import { getNodesWithinRange } from "../services/NodeService"
import { getLinksWithinRange } from "../services/LinkService"

import {times}  from "../constant/filter"

export const StudentProvider = ({ children }) => {

  const [ semesterFrom, setSemesterFrom ] = useState("2010-01");
  const [ semesterTo, setSemesterTo ] = useState("2010-02");


  const [ nodes, setNodes ] = useState([]);
  const [ links, setLinks ] = useState([]);
  
  const [ errorData, setErrorData ] = useState("");
    

  useEffect( () => {
    const fetchData = () => {
      return Promise.all([ 
        getNodesWithinRange(semesterFrom, semesterTo), 
        getLinksWithinRange(semesterFrom, semesterTo) 
      ])
      .then(([nodes, links]) => {
        setNodes(nodes.data.nodes)
        setLinks(links.data.links)        
      })
      .catch(error => {
        console.error("Getting nodes & Links ", error);
        setErrorData("Error al obtener los datos")
      });
    }
    fetchData()
  },[] )

  const data = { nodes, links, errorData }
  
  return (
    <StudentContext.Provider value={ data }>
      { children }    
    </StudentContext.Provider>
  )
}