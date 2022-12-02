import React, { useEffect } from 'react';
import { Coordinator, Info, Robot, Settings } from '../../models';
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

interface MainDialogsProps {
  open: OpenDialogs;
  setOpen: (state: OpenDialogs) => void;
  info: Info;
  robot: Robot;
  setRobot: (state: Robot) => void;
  setPage: (state: Page) => void;
  setCurrentOrder: (state: number) => void;
  closeAll: OpenDialogs;
  baseUrl: string;
  network: 'mainnet' | 'testnet' | undefined;
  federation: Coordinator[];
  focusedCoordinator: number;
}

const MainDialogs = ({
  open,
  setOpen,
  info,
  closeAll,
  robot,
  setRobot,
  setPage,
  setCurrentOrder,
  baseUrl,
  network,
  federation,
  focusedCoordinator,
}: MainDialogsProps): JSX.Element => {
  useEffect(() => {
    if (info.openUpdateClient) {
      setOpen({ ...closeAll, update: true });
    }
  }, [info]);

  return (
    <>
      <UpdateClientDialog
        open={open.update}
        coordinatorVersion={info.coordinatorVersion}
        clientVersion={info.clientVersion}
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
        network={network}
        onClose={() => setOpen({ ...open, coordinator: false })}
        coordinator={federation[focusedCoordinator]}
        baseUrl={baseUrl}
      />
    </>
  );
};

export default MainDialogs;
