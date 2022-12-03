import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Tabs, Tab, Paper, useTheme, useControlled } from '@mui/material';
import MoreTooltip from './MoreTooltip';

import { OpenDialogs } from '../MainDialogs';

import { Page } from '.';

import {
  SettingsApplications,
  SmartToy,
  Storefront,
  AddBox,
  Assignment,
  MoreHoriz,
} from '@mui/icons-material';
import RobotAvatar from '../../components/RobotAvatar';
import { AppContext, AppContextProps } from '../../contexts/AppContext';

interface NavBarProps {
  nickname?: string | null;
  hasRobot: boolean;
}

const NavBar = ({ nickname = null, hasRobot = false }: NavBarProps): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    page,
    setPage,
    settings,
    setSlideDirection,
    open,
    setOpen,
    closeAll,
    windowSize,
    currentOrder,
    navbarHeight,
    baseUrl,
  } = useContext<AppContextProps>(AppContext);
  const history = useHistory();
  const smallBar = windowSize.width < 50;
  const color = settings.network === 'mainnet' ? 'primary' : 'secondary';

  const tabSx = smallBar
    ? { position: 'relative', bottom: nickname ? '1em' : '0em', minWidth: '1em' }
    : { position: 'relative', bottom: '1em', minWidth: '2em' };
  const pagesPosition = {
    robot: 1,
    offers: 2,
    create: 3,
    order: 4,
    settings: 5,
  };

  const handleSlideDirection = function (oldPage: Page, newPage: Page) {
    const oldPos: number = pagesPosition[oldPage];
    const newPos: number = pagesPosition[newPage];
    setSlideDirection(
      newPos > oldPos ? { in: 'left', out: 'right' } : { in: 'right', out: 'left' },
    );
  };

  const changePage = function (mouseEvent: any, newPage: Page) {
    if (newPage === 'none') {
      return null;
    } else {
      handleSlideDirection(page, newPage);
      setPage(newPage);
      const param = newPage === 'order' ? currentOrder ?? '' : '';
      setTimeout(
        () => history.push(`/${newPage}/${param}`),
        theme.transitions.duration.leavingScreen * 3,
      );
    }
  };

  useEffect(() => {
    setOpen(closeAll);
  }, [page]);

  return (
    <Paper
      elevation={6}
      sx={{
        height: `${navbarHeight}em`,
        width: `100%`,
        position: 'fixed',
        bottom: 0,
        borderRadius: 0,
      }}
    >
      <Tabs
        TabIndicatorProps={{ sx: { height: '0.3em', position: 'absolute', top: 0 } }}
        variant='fullWidth'
        value={page}
        indicatorColor={color}
        textColor={color}
        onChange={changePage}
      >
        <Tab
          sx={{ ...tabSx, minWidth: '2.5em', width: '2.5em', maxWidth: '4em' }}
          value='none'
          disabled={nickname === null}
          onClick={() => setOpen({ ...closeAll, profile: !open.profile })}
          icon={
            nickname ? (
              <RobotAvatar
                style={{ width: '2.3em', height: '2.3em', position: 'relative', top: '0.2em' }}
                avatarClass={theme.palette.mode === 'dark' ? 'navBarAvatarDark' : 'navBarAvatar'}
                nickname={nickname}
                baseUrl={baseUrl}
              />
            ) : (
              <></>
            )
          }
        />

        <Tab
          label={smallBar ? undefined : t('Robot')}
          sx={{ ...tabSx, minWidth: '1em' }}
          value='robot'
          icon={<SmartToy />}
          iconPosition='start'
        />

        <Tab
          sx={tabSx}
          label={smallBar ? undefined : t('Offers')}
          value='offers'
          icon={<Storefront />}
          iconPosition='start'
        />
        <Tab
          sx={tabSx}
          label={smallBar ? undefined : t('Create')}
          value='create'
          icon={<AddBox />}
          iconPosition='start'
        />
        <Tab
          sx={tabSx}
          label={smallBar ? undefined : t('Order')}
          value='order'
          disabled={!hasRobot || currentOrder == undefined}
          icon={<Assignment />}
          iconPosition='start'
        />
        <Tab
          sx={tabSx}
          label={smallBar ? undefined : t('Settings')}
          value='settings'
          icon={<SettingsApplications />}
          iconPosition='start'
        />

        <Tab
          sx={tabSx}
          label={smallBar ? undefined : t('More')}
          value='none'
          onClick={(e) => {
            open.more ? null : setOpen({ ...open, more: true });
          }}
          icon={
            <MoreTooltip>
              <MoreHoriz />
            </MoreTooltip>
          }
          iconPosition='start'
        />
      </Tabs>
    </Paper>
  );
};

export default NavBar;
