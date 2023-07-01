import { StudentTable } from "../components/StudentTable";
import { ControllerBar  } from "../components/ControllerBar";
//import { Sankey } from "../components/Sankey";
import { SelectedNodes } from "../components/SelectedNodes";
import { CustomSankey } from "../components/CustomSankey";


export const Dashboard = () => {

  return (
    <div className="h-screen bg-gray-200 flex flex-col gap-2 p-2  w-screen dark:bg-dark-200" >
      
      <SelectedNodes />
      <section className="  bg-gray-100 dark:bg-dark-100 border border-gray-300 dark:border-gray-600 rounded-lg relative  overflow-auto h-1/2" >
        <ControllerBar />
        <CustomSankey />        
      </section>           
        
      <section className="flex gap-2 h-1/2 [&>*]:bg-gray-100 [&>*]:dark:bg-dark-100 [&>*]:border [&>*]:border-gray-300 [&>*]:dark:border-gray-600 [&>*]:rounded-lg">
        <div className="w-1/3 overflow-auto">
          <StudentTable /> 
        </div>
        <div className="w-1/3"> </div>
        <div className="w-1/3"> </div>
      </section>     
    </div>
  )
}
