import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const DashBoard = () =>{

   return(
      <LayoutBaseDePagina
       titulo="Página inicial" 
       barraDeFerramentas={(
         <FerramentasDeDetalhe/>

       )}>
         Testando
      </LayoutBaseDePagina>
   )
}