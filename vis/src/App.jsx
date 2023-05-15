// components
import { Dashboard } from "./pages/Dashboard"

import { FilterProvider } from './context/FilterProvider';


function App() {  
  return (    
    <FilterProvider>
      <div className="">
        <Dashboard />
      </div>    
    </FilterProvider>
  )
}

export default App
