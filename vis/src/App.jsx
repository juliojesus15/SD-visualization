import { ThemeProvider } from "./context/ThemeProvider";
import { StudentProvider } from "./context/StudentProvider";

import { Dashboard } from "./pages/Dashboard"

function App() {  
  return (    
    <ThemeProvider>
      <StudentProvider>
        <Dashboard />      
      </StudentProvider>
    </ThemeProvider>
  )
}

export default App
