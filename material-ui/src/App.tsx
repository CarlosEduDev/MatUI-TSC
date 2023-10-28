import { BrowserRouter } from "react-router-dom"
import {AppThemeProvider} from './shared/contexts/ThemeContext'
import { DrawerProvider } from "./shared/contexts/DrawerContext"

import './shared/forms/TraducoesYup'

// Routes
import {AppRoutes} from './routes'
import { Login, MenuLateral } from "./shared/components"
import { AuthProvider } from "./shared/contexts"


function App() {

  
  return (
    <AuthProvider>
     <AppThemeProvider>
      
      <Login>

      <DrawerProvider>
      <BrowserRouter>

      <MenuLateral>
      <AppRoutes/>
      </MenuLateral>

      </BrowserRouter>
      </DrawerProvider>
      </Login>

      </AppThemeProvider>
      

    
    </AuthProvider>
    
    
  )
}

export default App
