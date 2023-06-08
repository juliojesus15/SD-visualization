import React, { useEffect } from "react";

import { SankeyDiagram } from "../../components/SankeyDiagram";
import { StudentTable } from "../../components/StudentTable";
import { FiltersBar  } from "../../components/FiltersBar";
import { Sankey } from "../../components/Sankey";
import { SelectedNodes } from "../../components/SelectedNodes";


export const Dashboard = () => {

  return (
    <div className="h-screen bg-gray-200 flex flex-col gap-2 p-2  w-screen">
      
      <SelectedNodes />
      <section className="  bg-gray-100 border border-gray-300 rounded-2xl relative  overflow-auto h-2/3" >
        <FiltersBar />
        <Sankey />        
      </section>           
        
      <section className="flex gap-2 h-1/3 ">
        <div className="w-1/3 bg-gray-100 border border-gray-300 rounded-2xl overflow-auto">
          <StudentTable /> 
        </div>
        <div className="w-1/3 bg-gray-100 border border-gray-300 rounded-2xl"> </div>
        <div className="w-1/3 bg-gray-100 border border-gray-300 rounded-2xl"> </div>
      </section>     
    </div>
  )
}