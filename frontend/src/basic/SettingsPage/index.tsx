import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Paper, useTheme } from '@mui/material';
import SettingsForm from '../../components/SettingsForm';
import FederationTable from '../../components/FederationTable';
import { Coordinator, Settings, Favorites } from '../../models';

interface SettingsPageProps {
  fav: Favorites;
  setFav: (state: Favorites) => void;
  settings: Settings;
  setSettings: (state: Settings) => void;
  windowSize: { width: number; height: number };
  federation: Coordinator[];
  setFederation: (state: Coordinator[]) => void;
  setFocusedCoordinator: (state: number) => void;
  openCoordinator: () => void;
  baseUrl: string;
}

const SettingsPage = ({
  fav,
  setFav,
  settings,
  setSettings,
  windowSize,
  federation,
  setFederation,
  setFocusedCoordinator,
  openCoordinator,
  baseUrl,
}: SettingsPageProps): JSX.Element => {
  const { t } = useTranslation();
  const maxHeight = windowSize.height * 0.85 - 3;

  return (
    <Paper elevation={12} sx={{ padding: '1em', maxHeight: `${maxHeight}em`, overflow: 'auto' }}>
      <Grid container direction='column' alignItems='flex-start' spacing={1}>
        <Grid item>
          <SettingsForm 
            fav={fav}
            setFav={setFav}
            settings={settings}
            setSettings={setSettings} />
        </Grid>
        <Grid item>
          <FederationTable
            federation={federation}
            setFederation={setFederation}
            setFocusedCoordinator={setFocusedCoordinator}
            openCoordinator={openCoordinator}
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
