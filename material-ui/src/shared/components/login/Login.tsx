import { Box, Button, Card, CardActions, CardContent, TextField, Typography, CircularProgress } from '@mui/material'
import { useAuthContext } from '../../contexts'
import { useState } from 'react'
import * as yup from 'yup'


const LoginSchema = yup.object().shape({

  email: yup.string().required().email() ,
  password: yup.string().required().min(6)
})

interface ILoginProps {
  children: React.ReactNode
}

export const Login: React.FC<ILoginProps> = ({children}) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    setIsLoading(true)
    LoginSchema
    .validate({ email, password }, {abortEarly: false})
    .then(dadosValidados => {
      setIsLoading(true)
      login(dadosValidados.email, dadosValidados.password)
      .then(() => {
        setIsLoading(false)
      });

    })
    .catch((errors: yup.ValidationError) => {
      setIsLoading(false)
      errors.inner.forEach(error => {
        if(error.path === 'email') {
          setEmailError(error.message)
        } 
        else if(error.path === 'password'){
          setPasswordError(error.message)
        }
      })
    })
  }

  if (isAuthenticated) return(
    <>{children}</>
  )

  return(

    

    <Box  width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>

      <Box position='absolute' paddingBottom={60}>
        <Typography marginLeft={13} variant='h5'>Boas vindas!</Typography>
        <Box position='relative'>
        <Typography variant='h6'>Cadastre pessoas de todos os lugares!</Typography>
        </Box>
      </Box>

      <Card>

        <CardContent>

          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>Entrar</Typography>

            <TextField
            fullWidth
            label='Email'
            type='email'
            value={email}
            disabled={isLoading}
            error={!!emailError}
            helperText={emailError}
            onKeyDown={() => setEmailError('')}
            onChange={e => setEmail(e.target.value)}
            />

            <TextField
            fullWidth
            label='Senha'
            type='password'
            value={password}
            disabled={isLoading}
            error={!!passwordError}
            helperText={passwordError}
            onKeyDown={() => setPasswordError('')}
            onChange={e => setPassword(e.target.value)}
            />
          </Box>

        </CardContent>

        <CardActions>

          <Box width='100%' display='flex' justifyContent='center'>

            <Button variant='contained'
            onClick={handleSubmit}
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress color='inherit' size={20}/> : undefined}
            >
              Entrar
            </Button>

          </Box>

        </CardActions>

      </Card>

    </Box>
    
  )
}