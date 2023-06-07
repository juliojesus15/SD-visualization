import React, { useEffect, useRef, useContext, useState, } from "react";

import { FilterContext } from "../context/FilterContext"

export const SelectedNodes = () => {
  const { selectedNodes, selectedTimes } = useContext(FilterContext)
  return (
    <div className="">
    { 
      selectedTimes.map( (element, key) => {        
        return (
          <div key={key} className=""> { JSON.stringify(element) }</div>    
        )
      }      
    )}
    </div>
  )
}