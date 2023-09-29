import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
   children: React.ReactNode
   titulo: string;
   barraDeFerramentas: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, titulo, barraDeFerramentas}) => {

   const theme = useTheme();
   //Telas menores
   const smDown = useMediaQuery(theme.breakpoints.down('sm')); // MEDIA QUERY;
   const MdDown = useMediaQuery(theme.breakpoints.down('md')); // MEDIA QUERY;




   const { toggleDrawerOpen } = useDrawerContext()
   
   

   return(
      <Box height='100%' display='flex' flexDirection='column' gap={1}>

         <Box padding={1} gap={1.2} height={theme.spacing(smDown ? 6 : MdDown ? 8 : 12 )} display='flex' alignItems='center'>
            {smDown && 
            (<IconButton onClick={toggleDrawerOpen}>
               <Icon>menu</Icon>
            </IconButton>)}

            <Typography
             variant={smDown ? 'h5' : MdDown ? 'h4' : 'h3'}
             overflow='hidden'
             whiteSpace='nowrap'
             textOverflow='ellipsis'
             >
            {titulo}
            </Typography>

         </Box>

         {barraDeFerramentas &&(
         <Box>
         {barraDeFerramentas}
         </Box>)}

         <Box flex={1} overflow='auto'>
         {children}
         </Box>
      </Box>
   )
}