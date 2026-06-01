import react, { useContext } from 'react'
import { createContext } from "react";

interface IAppData{
    user:any ; 
    appLoading:boolean ;
    authLoading:boolean;
    isError:boolean;
    error:any 
}


export const AppDataContext = createContext<IAppData | null>(null)

export function AppProvider({children}:{children:react.ReactNode}){

    //check is logged and get user details

    //login function 

    //register 

    //logout function
    
    return <AppDataContext.Provider value={null}>
        {children}
    </AppDataContext.Provider>
}

export function useAppData(){
    const context = useContext(AppDataContext);

    if(!context) throw new Error('No context found')

    return context
}