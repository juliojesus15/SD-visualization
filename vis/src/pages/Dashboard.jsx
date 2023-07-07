//import { StudentTable } from "../components/StudentTable";
//import { Sankey } from "../components/Sankey";

import { ControllerBar  } from "../components/ControllerBar";
//import { SelectedNodes } from "../components/SelectedNodes";
import { CustomSankey } from "../components/CustomSankey";
import { TableStudent } from "../components/TableStudent";
import { CustomPointCloud } from "../components/CustomPointCloud";

export const Dashboard = () => {
  
  return (
    <div className="w-screen h-screen bg-gray-200 flex flex-col gap-1.5 p-2 dark:bg-dark-200" >
      {/*<SelectedNodes />*/}
      <section className="h-[55%] bg-gray-100 dark:bg-dark-100 border border-gray-300 dark:border-gray-600 rounded-lg relative  ">
        <ControllerBar />
        <CustomSankey />        
      </section>           
        
      <section className="flex gap-2 h-[45%] [&>*]:bg-gray-100 [&>*]:dark:bg-dark-100 [&>*]:border [&>*]:border-gray-300 [&>*]:dark:border-gray-600 [&>*]:rounded-lg">
        <div className="w-full lg:w-1/3 overflow-auto">
          <TableStudent /> 
        </div>
        <div className="w-full lg:w-1/3"> 
          <CustomPointCloud />
        </div>
        <div className="w-full lg:w-1/3"> </div>
      </section>     
    </div>
  )
}
