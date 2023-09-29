import { FerramentasDeListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const DashBoard = () =>{

   return(
      <LayoutBaseDePagina
       titulo="Página inicial" 
       barraDeFerramentas={(
         <FerramentasDeListagem
         mostrarInputBusca
         textoBotaoNovo="Nova"
         />

       )}>
         Testando
      </LayoutBaseDePagina>
   )
}