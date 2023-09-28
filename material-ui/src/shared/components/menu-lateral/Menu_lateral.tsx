import { Home } from '@mui/icons-material';
//import InboxIcon from '@mui/icons-material/Inbox'
import { Avatar, Box, Divider, Drawer, useTheme, List, ListItemButton, ListItemText, useMediaQuery } from "@mui/material"
import React from 'react';
import { useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
   children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps>= ({children}) => {

   const theme = useTheme()
   const smDown = useMediaQuery(theme.breakpoints.down('sm'))

   const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext()

   return(
      <>
      <Drawer open={isDrawerOpen} variant={ smDown ? 'temporary' : "permanent"} onClose={toggleDrawerOpen}>
         <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column' >

            <Box width='100%' height={theme.spacing(20)} display='flex' justifyContent='center' alignItems='center'>
           <Avatar
           sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
            src="/static/images/avatar/1.jpg" />
            </Box>

            <Divider/>

            <Box flex={1}>
             <List component='nav'>
             <ListItemButton>
             <ListItemButton>
               <Home />
              </ListItemButton>
              <ListItemText primary="Página inicial" />
             </ListItemButton>
             </List>
            </Box>
         </Box>
      </Drawer>

      <Box height='100 vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
      {children}
      </Box>

      
     
      </>
      
   );
};