import React from "react";
import { BarChart } from "../../components/BarChart";
import { SankeyDiagram } from "../../components/SankeyDiagram";

export const Dashboard = () => {
  return (
    <div className="h-screen bg-gray-800 flex flex-col gap-2 p-4">
      <section className="w-full h-1/2 bg-gray-500 border border-gray-300 rounded-2xl relative min-w-[500px]">
        <SankeyDiagram />
      </section>           
      <section className="w-full h-1/2 bg-gray-500 border border-gray-300 rounded-2xl relative min-w-[500px]">
        <BarChart 
          data={[12, 5, 6, 6, 9, 10]}
          width={700}
          height={300}
        />
      </section>        
    </div>
  )
}