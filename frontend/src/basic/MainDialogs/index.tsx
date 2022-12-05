import React, { useContext, useEffect } from 'react';
import {
  CommunityDialog,
  ExchangeDialog,
  CoordinatorDialog,
  AboutDialog,
  LearnDialog,
  ProfileDialog,
  ClientDialog,
  UpdateClientDialog,
} from '../../components/Dialogs';
import { Page } from '../NavBar';
import { AppContext, AppContextProps } from '../../contexts/AppContext';

export interface OpenDialogs {
  more: boolean;
  learn: boolean;
  community: boolean;
  info: boolean;
  coordinator: boolean;
  exchange: boolean;
  client: boolean;
  update: boolean;
  profile: boolean; // temporary until new Robot Page is ready
}

const MainDialogs = (): JSX.Element => {
  const {
    open,
    setOpen,
    info,
    closeAll,
    robot,
    setRobot,
    setPage,
    setCurrentOrder,
    settings,
    federation,
    clientVersion,
    focusedCoordinator,
    baseUrl,
  } = useContext<AppContextProps>(AppContext);

  return (
    <>
      <UpdateClientDialog
        coordinatorVersion={info.version}
        clientVersion={clientVersion.semver}
        onClose={() => setOpen({ ...open, update: false })}
      />
      <AboutDialog
        open={open.info}
        maxAmount='4,000,000'
        onClose={() => setOpen({ ...open, info: false })}
      />
      <LearnDialog open={open.learn} onClose={() => setOpen({ ...open, learn: false })} />
      <CommunityDialog
        open={open.community}
        onClose={() => setOpen({ ...open, community: false })}
      />
      <ExchangeDialog
        federation={federation}
        open={open.exchange}
        onClose={() => setOpen({ ...open, exchange: false })}
        info={info}
      />
      <ClientDialog open={open.client} onClose={() => setOpen({ ...open, client: false })} />
      <ProfileDialog
        open={open.profile}
        baseUrl={baseUrl}
        onClose={() => setOpen({ ...open, profile: false })}
        robot={robot}
        setRobot={setRobot}
        setPage={setPage}
        setCurrentOrder={setCurrentOrder}
      />
      <CoordinatorDialog
        open={open.coordinator}
        network={settings.network}
        onClose={() => setOpen({ ...open, coordinator: false })}
        coordinator={federation[focusedCoordinator]}
        baseUrl={baseUrl}
      />
    </>
  );
};

export default MainDialogs;
