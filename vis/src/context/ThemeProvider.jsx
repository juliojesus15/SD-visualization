import { useState, useEffect } from "react"
import { ThemeContext } from "./ThemeContext"

export const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(localStorage.theme)

  const colorTheme = theme === 'dark' ? 'light' : 'dark'  

  useEffect( () => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)

    localStorage.setItem('theme', theme)
  }, [ theme, colorTheme ])

  const data = { colorTheme, setTheme }
  
  return (
    <ThemeContext.Provider value={ data }>
      { children }    
    </ThemeContext.Provider>
  )
}