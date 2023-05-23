import React, { useEffect } from "react";

//import { SankeyDiagram } from "../../components/SankeyDiagram";
import { StudentTable } from "../../components/StudentTable";
import { FiltersBar  } from "../../components/FiltersBar";
import MyComponent from "../../components/MyComponent";
import { Sankey } from "../../components/Sankey";
//import { CustomSankey } from "../../components/CustomSankey";
// import { FourDirectionsTimeChart } from "../../components/FourDirectionsTimeChart";
export const Dashboard = () => {





  return (
    <div className="h-screen bg-gray-200 flex flex-col gap-2 p-4  w-screen">
      <section className="  bg-gray-100 border border-gray-300 rounded-2xl relative w-00px]  overflow-auto h-[350px]" >
        <FiltersBar />
        <Sankey />

      </section>           
        
      <section className="w-full flex gap-10 bg-gray-100 border border-gray-300 rounded-2xl relative min-w-[500px] p-5">    
        {<StudentTable />}
            
      </section>     
    </div>
  )
}