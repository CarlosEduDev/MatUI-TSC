import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";

import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentasDeDetalhe } from "../../shared/components"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasServices";
import { VTextField } from "../../shared/forms";

import { Box, Paper, Grid, Typography, LinearProgress } from "@mui/material";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

interface IFormData {
    email: string,
    nomeCompleto: string,
    cidadeId: number
}

export const DetalheDePessoa: React.FC = () =>{
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

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

                    formRef.current?.setData(result)
                }
            })
        }

    }, [id]);


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
    
    const handleSave = (dados: IFormData) => {
        setIsLoading(true)
        
        if(id === 'nova'){
            PessoasService.create(dados)
            .then((result) => {
                setIsLoading(false)

                if(result instanceof Error){
                    alert(result.message)
                } else{
                    navigate(`/pessoas/detalhe/${result}`)
                }
            })
        } else{
            PessoasService.updateById(Number(id), {id: Number(id), ...dados})
            .then((result) => {
                setIsLoading(false)

                if(result instanceof Error){
                    alert(result.message)
                } else{
                    navigate('/pessoas')
                }
            });
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

            aoClicarEmSalvar={() => formRef.current?.submitForm() }
            aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
            aoClicarEmApagar={() => handleDelete(Number(id))}
            aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
            aoClicarEmVoltar={() => navigate('/pessoas')}
            />
        }
        >
            <Form ref={formRef} onSubmit={(handleSave)}>

                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant="outlined">

                    <Grid container direction='column' padding={2} spacing={2}>

                        {isLoading &&(
                            <Grid item>
                            <LinearProgress variant="indeterminate"/>
                           </Grid>
                        )}

                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>
                        
                        

                    <Grid container item direction='row'>

                    <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                fullWidth
                disabled={isLoading}
                label="Nome Completo" name="nomeCompleto"
                onChange={e => setNome(e.target.value)}
                 />
                    </Grid>
                        </Grid>

                        <Grid container item direction='row'>

                        <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                fullWidth
                 label="E-mail" 
                 name="email"
                 disabled={isLoading}
                 />
                        </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                        <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                fullWidth
                 label="Cidade" 
                 name="cidadeId"
                 disabled={isLoading}
                 />   
                        </Grid>
                </Grid>

                </Grid>


                </Box>

            </Form>
        </LayoutBaseDePagina>
    )
}