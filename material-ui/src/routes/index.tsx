import {Routes, Route, Navigate} from 'react-router-dom'
import { useDrawerContext  } from '../shared/contexts/'
import {useEffect,} from 'react'
import { 
   DashBoard, 
   ListagemDePessoas,
   DetalheDePessoa,
   ListagemDeCidades,
   DetalheDeCidades,

 } from '../pages'


export const AppRoutes = () => {

   const { setDrawerOptions } = useDrawerContext()

   useEffect(() => {
      setDrawerOptions([
         {
            icon: 'home',
            label: 'Página inicial',
            path: "/pagina-inicial"
         },
         {
            icon: 'location_city',
            path: "/cidades",
            label: "Cidades",
         },
         {
            icon: 'people',
            path: "/pessoas",
            label: "Pessoas",
         }
      ])
   }, []);
   
   return(
      <Routes>
         <Route path='/pagina-inicial' element={<DashBoard/>}  />

         <Route path='/pessoas' element={<ListagemDePessoas/>}/>
         <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoa/>}/>

         <Route path='/cidades' element={<ListagemDeCidades/>}/>
         <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades/>}/>

         <Route path='*' element={ <Navigate to='/pagina-inicial'/> } />
      </Routes>
   )
}