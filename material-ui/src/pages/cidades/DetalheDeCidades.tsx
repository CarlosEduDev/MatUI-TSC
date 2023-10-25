import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { LayoutBaseDePagina } from "../../shared/layouts"
import { FerramentasDeDetalhe } from "../../shared/components"
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";

import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";

import { Box, Paper, Grid, Typography, LinearProgress } from "@mui/material";

import * as yup from 'yup';

interface IFormData {
    nome: string,
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
   
})

export const DetalheDeCidades: React.FC = () =>{
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if(id !== 'nova'){

            setIsLoading(true)

            CidadesService.getById(Number(id))
            .then((result) => {
                setIsLoading(false)

                if(result instanceof Error){
                    alert(result.message)
                    navigate('/cidades');
                } else{
                    setNome(result.nome)

                    formRef.current?.setData(result)
                }
            })
        } else{
            formRef.current?.setData({
                nome: '',
            })
        }

    }, [id]);


    const handleDelete = (id: number) =>{

    if(confirm('Você realmente deseja deletar?')){
      CidadesService.deleteById(id)
      .then(result => {
        if(result instanceof Error){
          alert(result.message)
        }else{
            alert('Registro apagado com sucesso!')
            navigate('/cidades')
        }
      })
    }
  }
    
    const handleSave = (dados: IFormData) =>{

        formValidationSchema
        .validate(dados, {abortEarly: false})
        .then((dadosValidados) => {
            if(id === 'nova'){
                CidadesService.create(dadosValidados)
                .then((result) =>{
                    setIsLoading(false)
    
                    if(result instanceof Error){
                        alert(result.message)
                    }else{
                        if(isSaveAndClose()){
                            navigate('/cidades')
                            
                        } else{
                            navigate(`/cidades/detalhe/${result}`)
                        }
                    }
                })
                }else{
                    CidadesService.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
        
                        if(result instanceof Error){
                            alert(result.message)
                        } else{
                            if(isSaveAndClose()){
                                navigate('/cidades')
                                
                            } 
                        }
                    })
                }
        })
        .catch((errors: yup.ValidationError) => {
            setIsLoading(false)
            const validationErrors: IVFormErrors = {};

            errors.inner.forEach(error => {
                if(!error.path) return;

                validationErrors[error.path] = error.message;
            });

            formRef.current?.setErrors(validationErrors)
        })

        setIsLoading(true); 
    }
    

    return(
        <LayoutBaseDePagina
        titulo={id === 'nova' ? 'Nova cidade' : nome}
        barraDeFerramentas={
            <FerramentasDeDetalhe
            textoBotaoNovo="Nova"
            mostrarBotaoNovo={id !== 'nova'}
            mostrarBotaoSalvarEFechar
            mostrarBotaoSalvar
            mostrarBotaoApagar={id !== 'nova'}

            aoClicarEmSalvar={save}
            aoClicarEmSalvarEFechar={saveAndClose}
            aoClicarEmApagar={() => handleDelete(Number(id))}
            aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
            aoClicarEmVoltar={() => navigate('/cidades')}
            />
        }
        >
            <VForm ref={formRef} onSubmit={(handleSave)}>

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
                label="Nome da cidade" name="nome"
                onChange={e => setNome(e.target.value)}
                 />
                    </Grid>
                        </Grid>

                </Grid>


                </Box>

            </VForm>
        </LayoutBaseDePagina>
    )
}