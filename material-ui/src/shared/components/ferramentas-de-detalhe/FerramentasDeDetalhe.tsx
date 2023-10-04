import {Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme} from '@mui/material'

interface IFerramentasDeDetalheProps{
   textoBotaoNovo? : string;

   mostrarBotaoNovo? : boolean;
   mostrarBotaoVoltar? : boolean
   mostrarBotaoSalvar? : boolean;
   mostrarBotaoApagar? : boolean;
   mostrarBotaoSalvarEFechar? : boolean;

   mostrarNovoCarregando? : boolean;
   mostrarVoltarCarregando? : boolean
   mostrarSalvarCarregando? : boolean;
   mostrarApagarCarregando? : boolean;
   mostrarSalvarEFecharCarregando? : boolean;
   

   aoClicarEmSalvar? : () => void;
   aoClicarEmApagar? : () => void;
   aoClicarEmNovo? : () => void;
   aoClicarEmVoltar? : () => void;
   aoClicarEmSalvarEFechar? : () => void;
   
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
textoBotaoNovo = 'Novo',

mostrarBotaoNovo = true,
mostrarBotaoApagar = true,
mostrarBotaoSalvar = true,
mostrarBotaoVoltar = true,
mostrarBotaoSalvarEFechar = false,

mostrarSalvarCarregando = false,
mostrarNovoCarregando = false,
mostrarVoltarCarregando = false,
mostrarApagarCarregando = false,
mostrarSalvarEFecharCarregando = false,


aoClicarEmSalvar,
aoClicarEmApagar,
aoClicarEmNovo,
aoClicarEmVoltar,
aoClicarEmSalvarEFechar,
}) =>{

   const theme = useTheme();

   const smDown = useMediaQuery(theme.breakpoints.down('sm')); // MEDIA QUERY;
   const MdDown = useMediaQuery(theme.breakpoints.down('md')); // MEDIA QUERY;
   
   return(
  
         <Box
      height={theme.spacing(5)} 
      marginX={1} 
      padding={1} 
      paddingX={2} 
      display='flex' 
      gap={1} 
      alignItems='center' 
      component={Paper}>

           { (mostrarBotaoSalvar && !mostrarSalvarCarregando)  &&(
            <Button
            color='primary'
            variant="contained"
            disableElevation
            onClick={aoClicarEmSalvar}
            startIcon={<Icon>save</Icon>}
            >
               <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
               Salvar
               </Typography>
               </Button>
           )}

           { mostrarSalvarCarregando &&(
            <Skeleton width={110} height={60}/>
           )}

            {(mostrarBotaoSalvarEFechar && !mostrarSalvarEFecharCarregando && !smDown && !MdDown) &&(
               <Button
               color='primary'
               variant="outlined"
               disableElevation
               onClick={aoClicarEmSalvarEFechar}
               startIcon={<Icon>save</Icon>}
               >
                  <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                  Salvar e voltar
                  </Typography>
                  </Button>
            )}
            
            { mostrarSalvarEFecharCarregando && !smDown && !MdDown &&(
               <Skeleton width={180} height={60}/>
            )}

            { (mostrarBotaoApagar && !mostrarApagarCarregando) &&(
               <Button
               color='primary'
               variant="outlined"
               disableElevation
               onClick={aoClicarEmApagar}
               startIcon={<Icon>delete</Icon>}
               >
                  <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                  Apagar
                  </Typography></Button>
            )}
            
            { mostrarApagarCarregando &&(
               <Skeleton width={110} height={60}/>
            )}

            { (mostrarBotaoNovo && !mostrarNovoCarregando && !smDown) &&(
               <Button
               color='primary'
               variant="outlined"
               disableElevation
               onClick={aoClicarEmNovo}
               startIcon={<Icon>add</Icon>}
               >
                  <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                  {textoBotaoNovo}
                  </Typography>
                  </Button>
            )}
             
             { mostrarNovoCarregando && !smDown &&(
               <Skeleton width={110} height={60}/>
             )}

            { mostrarBotaoVoltar && (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvarEFechar) &&(
               <Divider variant='middle' orientation='vertical'/>
            )}

            { (mostrarBotaoVoltar && !mostrarVoltarCarregando) && (
               <Button
               color='primary'
               variant="outlined"
               disableElevation
               onClick={aoClicarEmVoltar}
               startIcon={<Icon>arrow_back</Icon>}
               >
                  <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                  Voltar
                  </Typography>
                  </Button>
            )}
            
            { mostrarVoltarCarregando &&(
               <Skeleton width={110} height={60}/>
            )}
      </Box>
       
   )
}