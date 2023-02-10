import React, { useContext } from 'react';
import { Grid, Paper } from '@mui/material';
import SettingsForm from '../../components/SettingsForm';
import FederationTable from '../../components/FederationTable';
import { AppContext, AppContextProps } from '../../contexts/AppContext';

const SettingsPage = (): JSX.Element => {
  const {
    fav,
    setFav,
    settings,
    setSettings,
    federation,
    setFederation,
    setFocusedCoordinator,
    windowSize,
    open,
    setOpen,
    baseUrl,
  } = useContext<AppContextProps>(AppContext);
  const maxHeight = windowSize.height * 0.85 - 3;

  return (
    <Paper elevation={12} sx={{ padding: '1em', maxHeight: `${maxHeight}em`, overflow: 'auto' }}>
      <Grid container direction='column' alignItems='flex-start' spacing={1}>
        <Grid item>
          <SettingsForm fav={fav} setFav={setFav} settings={settings} setSettings={setSettings} />
        </Grid>
        <Grid item>
          <FederationTable
            federation={federation}
            setFederation={setFederation}
            setFocusedCoordinator={setFocusedCoordinator}
            openCoordinator={() => setOpen({ ...open, coordinator: true })}
            baseUrl={baseUrl}
            maxHeight={10}
            network={settings.network}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SettingsPage;
