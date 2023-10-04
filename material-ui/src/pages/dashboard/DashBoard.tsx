import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const DashBoard = () =>{

   return(
      <LayoutBaseDePagina
       titulo="Página inicial" 
       barraDeFerramentas={(
         <FerramentasDeDetalhe 
         mostrarBotaoSalvarEFechar
         mostrarBotaoNovo
         mostrarSalvarEFecharCarregando
         mostrarBotaoVoltar={false}/>

       )}>
         Testando
      </LayoutBaseDePagina>
   )
}