import { ControllerBar  } from "../components/ControllerBar";
import { CustomSankey } from "../components/CustomSankey";
import { Table } from "../components/Table";
import { CustomPointCloud } from "../components/CustomPointCloud";

export const Dashboard = () => {
  
  return (
    <div className="w-screen lg:h-screen flex flex-col gap-2 lg:gap-1.5 p-2 bg-gray-200 dark:bg-dark-200" >
      <section className="
        relative  
        h-[55%] 
        bg-gray-100 dark:bg-dark-100 
        border border-gray-500/50 dark:border-gray-600 
        shadow shadow-gray-300 dark:shadow-black/20
        rounded-lg"
      >
        <ControllerBar />
        <CustomSankey />        
      </section>           
        
      <section className="
        flex flex-col lg:flex-row gap-2 
        h-[45%]
        [&>*]:bg-gray-100 [&>*]:dark:bg-dark-100 
        [&>*]:border [&>*]:border-gray-500/50 [&>*]:dark:border-gray-600 
        [&>*]:shadow [&>*]:shadow-black/20
        [&>*]:rounded-lg"
      >
        <div className="h-[17rem] lg:h-auto w-full lg:w-1/3 overflow-hidden">
          <Table /> 
        </div>
        <div className="h-[17rem] lg:h-auto w-full lg:w-1/3 overflow-hidden"> 
          {<CustomPointCloud />}
        </div>
        <div className="w-full lg:w-1/3"> 
        </div>

      </section>     
    </div>
  )
}
