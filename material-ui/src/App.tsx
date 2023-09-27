import { BrowserRouter } from "react-router-dom"
import {ThemeProvider} from '@mui/material'
import { LightTheme } from "./shared/themes"

// Routes
import { AppRoutes } from "./routes"


function App() {

  
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
    </ThemeProvider>
    
    
  )
}

export default App
