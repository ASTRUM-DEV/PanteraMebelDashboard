// ** React Imports
import {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react'


export type TAppState = {
  loading: boolean;
}

export type AppStateContextValue = {
  appState: TAppState
  saveAppState: Dispatch<SetStateAction<TAppState>>;
}

const initialSettings: TAppState = {
  loading: false,
}

// ** Create Context
export const AppContext = createContext<AppStateContextValue>({
  saveAppState: () => null,
  appState: initialSettings
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [appState, setAppState] = useState<TAppState>({ ...initialSettings })

  return <AppContext.Provider value={{ appState, saveAppState: setAppState }}>{children}</AppContext.Provider>
}

export const AppConsumer = AppContext.Consumer
