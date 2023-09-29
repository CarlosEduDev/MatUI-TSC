import { Button } from '@mui/material'
import {Routes, Route, Navigate} from 'react-router-dom'
import { useDrawerContext  } from '../shared/contexts/'
import {useEffect,} from 'react'

export const AppRoutes = () => {

   const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

   useEffect(() => {
      setDrawerOptions([
         {
            icon: 'home',
            label: 'Página inicial',
            path: "/pagina-inicial"
         },
         {
            icon: 'star',
            label: 'Cidades',
            path: "/Cidades"
         },
         {
            icon: 'people',
            label: 'Pessoas',
            path: "/Pessoas"
         },
      ])
   }, []);
   
   return(
      <Routes>
         <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle drawer</Button>}  />

         <Route path='*' element={ <Navigate to='/pagina-inicial'/> } />
      </Routes>
   )
}