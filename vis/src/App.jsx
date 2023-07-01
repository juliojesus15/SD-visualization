import { FilterProvider } from "./context/FilterProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { StudentProvider } from "./context/StudentProvider";

import { Dashboard } from "./pages/Dashboard"

function App() {  
  return (    
    <ThemeProvider>
      <StudentProvider>
        <FilterProvider>      
          <Dashboard />      
        </FilterProvider>
      </StudentProvider>
    </ThemeProvider>
  )
}

export default App
