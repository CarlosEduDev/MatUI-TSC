import { createContext, useCallback, useMemo, useState, useEffect } from "react";

import { AuthService } from "../services/api/auth/AuthService";

interface IAthContextData {
  isAuthenticated: boolean,
  logout: () => void
  login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAthContextData)

const LOCAL_STORAGE_KEY_ACESS_TOKEN = 'APP_ACESS_TOKEN';

interface IAuthProviderProps{
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [accessToken, setAcessToken] = useState<string>()

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACESS_TOKEN);

    if(accessToken){
      setAcessToken(JSON.parse(accessToken))
    }else{
      setAcessToken(undefined)
    }
    
  }, [])


  const handleLogin = useCallback(async(email: string, password: string) => {

    const result = await AuthService.auth(email, password)
    if(result instanceof Error){
      return result.message
    }else{
      localStorage.setItem(LOCAL_STORAGE_KEY_ACESS_TOKEN, JSON.stringify(result.acessToken))
      setAcessToken(result.acessToken)
    }

  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACESS_TOKEN)
    setAcessToken(undefined)
  }, [])

  const isAuthenticated = useMemo(() => accessToken !== undefined, [accessToken])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}