import React, { useContext, useEffect } from 'react';
import {
  CommunityDialog,
  ExchangeDialog,
  CoordinatorDialog,
  AboutDialog,
  LearnDialog,
  ProfileDialog,
  ClientDialog,
  UpdateDialog,
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
    exchange,
  } = useContext<AppContextProps>(AppContext);

  return (
    <>
      <UpdateDialog
        coordinatorVersion={exchange.info.version}
        clientVersion={clientVersion.semver}
        onClose={() => setOpen(closeAll)}
      />
      <AboutDialog open={open.info} maxAmount='5,000,000' onClose={() => setOpen(closeAll)} />
      <LearnDialog open={open.learn} onClose={() => setOpen({ ...open, learn: false })} />
      <CommunityDialog open={open.community} onClose={() => setOpen(closeAll)} />
      <ExchangeDialog
        federation={federation}
        open={open.exchange}
        onClose={() => setOpen(closeAll)}
        info={info}
      />
      <ClientDialog open={open.client} onClose={() => setOpen({ ...open, client: false })} />
      <ProfileDialog
        open={open.profile}
        baseUrl={baseUrl}
        onClose={() => setOpen(closeAll)}
        robot={robot}
        setRobot={setRobot}
        setPage={setPage}
        setCurrentOrder={setCurrentOrder}
      />
      <CoordinatorDialog
        open={open.coordinator}
        network={settings.network}
        onClose={() => setOpen(closeAll)}
        coordinator={federation[focusedCoordinator]}
        baseUrl={baseUrl}
      />
    </>
  );
};

export default MainDialogs;
