import { FilterProvider } from './context/FilterProvider';
import { ThemeProvider } from "./context/ThemeProvider";

import { Dashboard } from "./pages/Dashboard"

function App() {  
  return (    
    <ThemeProvider>
      <FilterProvider>      
        <Dashboard />      
      </FilterProvider>
    </ThemeProvider>
  )
}

export default App
