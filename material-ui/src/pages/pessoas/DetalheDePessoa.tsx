import { useNavigate, useParams } from "react-router-dom"

import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentasDeDetalhe } from "../../shared/components"


export const DetalheDePessoa: React.FC = () =>{
    const { id = 'nova' } = useParams<'id'>();

    const navigate = useNavigate();

    

    return(
        <LayoutBaseDePagina
        titulo="Detalhe de pessoa"
        barraDeFerramentas={
            <FerramentasDeDetalhe
            textoBotaoNovo="Nova"
            mostrarBotaoNovo={id !== 'nova'}
            mostrarBotaoSalvarEFechar
            mostrarBotaoSalvar
            mostrarBotaoApagar={id !== 'nova'}

            aoClicarEmSalvar={() => {} }
            aoClicarEmSalvarEFechar={() => {}}
            aoClicarEmApagar={() => {}}
            aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
            aoClicarEmVoltar={() => navigate('/pessoas')}
            />
        }
        >
            <p>Detalhe da pessoa {id}</p>
        </LayoutBaseDePagina>
    )
}