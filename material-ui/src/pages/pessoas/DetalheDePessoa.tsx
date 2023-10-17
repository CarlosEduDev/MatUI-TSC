import { useNavigate, useParams } from "react-router-dom"

import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentasDeDetalhe } from "../../shared/components"
import { useEffect, useState } from "react";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasServices";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";


export const DetalheDePessoa: React.FC = () =>{
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if(id !== 'nova'){

            setIsLoading(true)

            PessoasService.getById(Number(id))
            .then((result) => {
                setIsLoading(false)

                if(result instanceof Error){
                    alert(result.message)
                    navigate('/pessoas');
                } else{
                    setNome(result.nomeCompleto)
                    console.log(result)
                }
            })
        }

    }, [id])


    const handleDelete = (id: number) =>{

    if(confirm('Você realmente deseja deletar?')){
      PessoasService.deleteById(id)
      .then(result => {
        if(result instanceof Error){
          alert(result.message)
        }else{
            alert('Registro apagado com sucesso!')
            navigate('/pessoas')
        }
      })
    }
  }
    
    
    

    return(
        <LayoutBaseDePagina
        titulo={id === 'nova' ? 'Nova pessoa' : nome}
        barraDeFerramentas={
            <FerramentasDeDetalhe
            textoBotaoNovo="Nova"
            mostrarBotaoNovo={id !== 'nova'}
            mostrarBotaoSalvarEFechar
            mostrarBotaoSalvar
            mostrarBotaoApagar={id !== 'nova'}

            aoClicarEmSalvar={() => {} }
            aoClicarEmSalvarEFechar={() => {}}
            aoClicarEmApagar={() => handleDelete(Number(id))}
            aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
            aoClicarEmVoltar={() => navigate('/pessoas')}
            />
        }
        >

            <Form onSubmit={(dados) => console.log(dados)}>
                <VTextField
                 name="nomeCompleto"
                 
                 />

            <button type="submit">Submit</button>
            </Form>
           

        </LayoutBaseDePagina>
    )
}