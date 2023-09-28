//import InboxIcon from '@mui/icons-material/Inbox'
import { Avatar, Box, Divider, Drawer, useTheme, List, ListItemButton, ListItemText, useMediaQuery, Icon} from "@mui/material"
import React from 'react';

import { useDrawerContext } from '../../contexts';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';


interface IMenuLateralProps {
   children: React.ReactNode
}

interface IListItemLinkProps {
   to: string;
   icon: string
   label: string;
   onClick: (() => void) | undefined;
}

const ListItemLink:React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {
   const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
   const match = useMatch({ path: resolvedPath.pathname, end: false })
   
   // const [clicked, setClicked] = useState(false)

   const handleClick = () => {
      navigate(to)
      onClick?.();
   }

   return(
      <ListItemButton selected={!!match} onClick={handleClick}>
             <ListItemButton>
             <Icon>{icon}</Icon>
              </ListItemButton>
              <ListItemText primary={label} />
             </ListItemButton>
   );
};

export const MenuLateral: React.FC<IMenuLateralProps>= ({children}) => {

   const theme = useTheme()
   const smDown = useMediaQuery(theme.breakpoints.down('sm'))

   const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext()

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
             {drawerOptions.map(drawerOption => (
               <ListItemLink
               key={drawerOption.path}
               to={drawerOption.to}
               label={drawerOption.label}
               icon={drawerOption.icon}
               onClick={smDown ? toggleDrawerOpen : undefined}
               />
             ))}
             
             
             
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