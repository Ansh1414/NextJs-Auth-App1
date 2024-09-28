"use client"
import { SessionProvider } from "next-auth/react"
import {store} from '@/store/store.js'
import { Provider } from "react-redux";

export const StoreProvider=({children})=>{
return (
    <>
    <SessionProvider>
        <Provider store={store}>{children}</Provider>
    </SessionProvider>
       
    </>
)
}