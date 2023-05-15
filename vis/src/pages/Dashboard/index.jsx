import React, { useEffect } from "react";


import { SankeyDiagram } from "../../components/SankeyDiagram";
import { StudentTable } from "../../components/StudentTable";
import { FiltersBar  } from "../../components/FiltersBar";
//import { CustomSankey } from "../../components/CustomSankey";
// import { FourDirectionsTimeChart } from "../../components/FourDirectionsTimeChart";
export const Dashboard = () => {

  useEffect(() => {
  }, [])

  const data = {
    nodes: [
      { id: 'A', x0: 50, x1: 100, y0: 100, y1: 200 },
      { id: 'B', x0: 200, x1: 250, y0: 50, y1: 150 },
      // ...
    ],
    links: [
      { source: 'A', target: 'B', value: 10 },
    ],
  };



  return (
    <div className="h-screen bg-gray-200 flex flex-col gap-2 p-4">
      <section className="w-full  bg-gray-100 border border-gray-300 rounded-2xl relative min-w-[1100px] overflow-auto h-[450px]" >
        <FiltersBar />
        <SankeyDiagram data={data} width={800} height={400} />

      </section>           
        
      <section className="w-1/3  bg-gray-100 border border-gray-300 rounded-2xl relative min-w-[500px] p-5">
        {/*<StudentTable />*/}
        {/*<FourDirectionsTimeChart />*/}
      </section>     
    </div>
  )
}