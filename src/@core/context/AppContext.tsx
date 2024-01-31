// ** React Imports
import {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react'

// ** MUI Imports
import { PaletteMode } from '@mui/material'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

// ** Types Import
import { ThemeColor, ContentWidth } from 'src/@core/layouts/types'

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

  const saveAppState = (updatedSettings: TAppState) => {
    setAppState(updatedSettings)
  }

  return <AppContext.Provider value={{ appState, saveAppState: setAppState }}>{children}</AppContext.Provider>
}

export const AppConsumer = AppContext.Consumer
