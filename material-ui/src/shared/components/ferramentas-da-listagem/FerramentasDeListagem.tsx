

import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material";

import { Enviroment } from "../../environment";

interface IFerramentasDeListagemProps{
   textoDaBusca?: string;
   mostrarInputBusca?: boolean;
   aoMudarTextoDeBusca?: (novoTexto: string) => void;
   textoBotaoNovo?: string;
   mostarBotaoNovo?: boolean;
   aoClicarEmNovo?: () => void

}

export const FerramentasDeListagem: React.FC<IFerramentasDeListagemProps> = (
   {textoDaBusca = '',
   mostrarInputBusca = false,
   aoMudarTextoDeBusca,
   aoClicarEmNovo,
   textoBotaoNovo = 'Novo',
   mostarBotaoNovo = true,

}
) => {

   const theme = useTheme();

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

         { mostrarInputBusca &&( 
            <TextField
            size='small'
            value={textoDaBusca}
            onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
            placeholder={Enviroment.INPUT_DE_BUSCA}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <Icon>search</Icon>
                  </InputAdornment>
               )
         }}
            />
         )}

         <Box flex={1} display='flex' justifyContent='flex-end'>

         { mostarBotaoNovo && (
            <Button
            color='primary'
            variant="contained"
            disableElevation
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
            >{textoBotaoNovo}</Button>
         )}
         </Box>
         
      </Box>
   );
}