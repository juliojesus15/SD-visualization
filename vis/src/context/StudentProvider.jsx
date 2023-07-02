import { useState, useEffect } from "react";
import { StudentContext } from "./StudentContext";

import { getData } from "../services/sourceService";

export const StudentProvider = ({ children }) => {  
  const [ semesterFrom, setSemesterFrom ] = useState("2010-01");
  const [ semesterTo, setSemesterTo ] = useState("2011-01");

  const [ nodes, setNodes ] = useState([]);
  const [ links, setLinks ] = useState([]);
  const [ semesters, setSemesters ] = useState([])
  
  const [ errorData, setErrorData ] = useState("");
    
  useEffect( () => {
    const fetchData = () => {
      return getData(semesterFrom, semesterTo)
        .then((sources) => {
          setNodes(sources.data.nodes);
          setLinks(sources.data.links);
          setSemesters(sources.data.semesters);
        })
        .catch((error) => {
          console.error("Getting data ", error);
          setErrorData("Error al obtener los datos");
        });
    };
    if (semesterFrom && semesterTo)
      fetchData()
  },[semesterFrom, semesterTo] )

  const updateSemesterFrom = (value) => {
    setSemesterFrom(value);
    setSemesterTo(null)
  }

  const updateSemesterTo = (value) => {
    setSemesterTo(value)
  }

  const data = { nodes, links, semesters, semesterFrom, semesterTo, updateSemesterTo, updateSemesterFrom, errorData }
  
  return (
    <StudentContext.Provider value={ data }>
      { children }    
    </StudentContext.Provider>
  )
}