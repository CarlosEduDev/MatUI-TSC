import { BrowserRouter } from "react-router-dom"
import {AppThemeProvider} from './shared/contexts/ThemeContext'
import { DrawerProvider } from "./shared/contexts/DrawerContext"

// Routes
import {AppRoutes} from './routes'
import { MenuLateral } from "./shared/components"


function App() {

  
  return (
    <AppThemeProvider>
      <DrawerProvider>
      <BrowserRouter>

      <MenuLateral>
      <AppRoutes/>
      </MenuLateral>

      </BrowserRouter>
      </DrawerProvider>
      </AppThemeProvider>
      

    
    
  )
}

export default App
