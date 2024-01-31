// ** React Imports
import {ReactNode, useContext} from 'react'

// ** MUI Imports
import {Theme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import {useSettings} from 'src/@core/hooks/useSettings'
import LinearProgress from "@mui/material/LinearProgress";
import {AppContext} from "../@core/context/AppContext";

interface Props {
  children: ReactNode
}

const UserLayout = ({children}: Props) => {
  const {settings, saveSettings} = useSettings()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const appState = useContext(AppContext);


  return (
    <>
      {appState.appState.loading && (
        <LinearProgress
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: 1300
          }}
        />
      )}
      <VerticalLayout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalNavItems={VerticalNavItems()}
        verticalAppBarContent={(
          props
        ) => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      >
        {children}
      </VerticalLayout>
    </>
  )
}

export default UserLayout
