import React, { useContext } from 'react';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { useTheme, Box, Slide, Typography } from '@mui/material';
import { AppContext } from '../contexts/AppContext';

import UserGenPage from './UserGenPage';
import MakerPage from './MakerPage';
import BookPage from './BookPage';
import OrderPage from './OrderPage';
import SettingsPage from './SettingsPage';
import NavBar from './NavBar';
import MainDialogs from './MainDialogs';

import RobotAvatar from '../components/RobotAvatar';
import { Settings } from '../models';

import { useTranslation } from 'react-i18next';
import Notifications from '../components/Notifications';

const Main = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    settings,
    setSettings,
    federation,
    setFederation,
    book,
    fetchBook,
    limits,
    fetchLimits,
    maker,
    setMaker,
    clearOrder,
    robot,
    setRobot,
    info,
    focusedCoordinator,
    setFocusedCoordinator,
    baseUrl,
    fav,
    setFav,
    order,
    setOrder,
    badOrder,
    setBadOrder,
    page,
    setPage,
    slideDirection,
    setSlideDirection,
    currentOrder,
    setCurrentOrder,
    navbarHeight,
    closeAll,
    open,
    setOpen,
    windowSize,
  } = useContext(AppContext);

  const Router = window.NativeRobosats === undefined ? BrowserRouter : HashRouter;
  const basename = window.NativeRobosats === undefined ? '' : window.location.pathname;

  return (
    <Router basename={basename}>
      {/* load robot avatar image, set avatarLoaded: true */}
      <RobotAvatar
        style={{ display: 'none' }}
        nickname={robot.nickname}
        baseUrl={baseUrl}
        onLoad={() => setRobot({ ...robot, avatarLoaded: true })}
      />
      <Notifications
        order={order}
        page={page}
        openProfile={() => setOpen({ ...closeAll, profile: true })}
        rewards={robot.earnedRewards}
        setPage={setPage}
        windowWidth={windowSize.width}
      />
      {settings.network === 'testnet' ? (
        <div style={{ height: 0 }}>
          <Typography color='secondary' align='center'>
            <i>{t('Using Testnet Bitcoin')}</i>
          </Typography>
        </div>
      ) : (
        <></>
      )}

      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(0,  -${navbarHeight / 2}em`,
        }}
      >
        <Switch>
          <Route
            path={['/robot/:refCode?', '/']}
            exact
            render={(props: any) => (
              <Slide
                direction={page === 'robot' ? slideDirection.in : slideDirection.out}
                in={page === 'robot'}
                appear={slideDirection.in != undefined}
              >
                <div>
                  <UserGenPage
                    setPage={setPage}
                    setCurrentOrder={setCurrentOrder}
                    match={props.match}
                    theme={theme}
                    robot={robot}
                    setRobot={setRobot}
                    baseUrl={baseUrl}
                  />
                </div>
              </Slide>
            )}
          />

          <Route path={'/offers'}>
            <Slide
              direction={page === 'offers' ? slideDirection.in : slideDirection.out}
              in={page === 'offers'}
              appear={slideDirection.in != undefined}
            >
              <div>
                <BookPage
                  book={book}
                  fetchBook={fetchBook}
                  onViewOrder={() => {
                    setOrder(undefined);
                    setDelay(10000);
                  }}
                  limits={limits}
                  fetchLimits={fetchLimits}
                  fav={fav}
                  setFav={setFav}
                  maker={maker}
                  setMaker={setMaker}
                  clearOrder={clearOrder}
                  lastDayPremium={info.last_day_nonkyc_btc_premium}
                  windowSize={windowSize}
                  hasRobot={robot.avatarLoaded}
                  setPage={setPage}
                  setCurrentOrder={setCurrentOrder}
                  baseUrl={baseUrl}
                />
              </div>
            </Slide>
          </Route>

          <Route path='/create'>
            <Slide
              direction={page === 'create' ? slideDirection.in : slideDirection.out}
              in={page === 'create'}
              appear={slideDirection.in != undefined}
            >
              <div>
                <MakerPage
                  book={book}
                  limits={limits}
                  fetchLimits={fetchLimits}
                  maker={maker}
                  setMaker={setMaker}
                  clearOrder={clearOrder}
                  setPage={setPage}
                  setCurrentOrder={setCurrentOrder}
                  fav={fav}
                  setFav={setFav}
                  windowSize={{ ...windowSize, height: windowSize.height - navbarHeight }}
                  hasRobot={robot.avatarLoaded}
                  baseUrl={baseUrl}
                />
              </div>
            </Slide>
          </Route>

          <Route
            path='/order/:orderId'
            render={(props: any) => (
              <Slide
                direction={page === 'order' ? slideDirection.in : slideDirection.out}
                in={page === 'order'}
                appear={slideDirection.in != undefined}
              >
                <div>
                  <OrderPage
                    baseUrl={baseUrl}
                    order={order}
                    settings={settings}
                    setOrder={setOrder}
                    setCurrentOrder={setCurrentOrder}
                    badOrder={badOrder}
                    locationOrderId={props.match.params.orderId}
                    setBadOrder={setBadOrder}
                    hasRobot={robot.avatarLoaded}
                    windowSize={{ ...windowSize, height: windowSize.height - navbarHeight }}
                    setPage={setPage}
                  />
                </div>
              </Slide>
            )}
          />

          <Route path='/settings'>
            <Slide
              direction={page === 'settings' ? slideDirection.in : slideDirection.out}
              in={page === 'settings'}
              appear={slideDirection.in != undefined}
            >
              <div>
                <SettingsPage
                  fav={fav}
                  setFav={setFav}
                  settings={settings}
                  federation={federation}
                  setFederation={setFederation}
                  setFocusedCoordinator={setFocusedCoordinator}
                  setSettings={setSettings}
                  openCoordinator={() => setOpen({ ...open, coordinator: true })}
                  windowSize={{ ...windowSize, height: windowSize.height - navbarHeight }}
                  baseUrl={baseUrl}
                />
              </div>
            </Slide>
          </Route>
        </Switch>
      </Box>
      <div style={{ alignContent: 'center', display: 'flex' }}>
        <NavBar
          nickname={robot.avatarLoaded ? robot.nickname : null}
          color={settings.network === 'mainnet' ? 'primary' : 'secondary'}
          width={windowSize.width}
          height={navbarHeight}
          page={page}
          setPage={setPage}
          open={open}
          setOpen={setOpen}
          closeAll={closeAll}
          setSlideDirection={setSlideDirection}
          currentOrder={currentOrder}
          hasRobot={robot.avatarLoaded}
          baseUrl={baseUrl}
        />
      </div>
      <MainDialogs
        open={open}
        setOpen={setOpen}
        setRobot={setRobot}
        setPage={setPage}
        setCurrentOrder={setCurrentOrder}
        info={info}
        robot={robot}
        closeAll={closeAll}
        baseUrl={baseUrl}
        federation={federation}
        focusedCoordinator={focusedCoordinator}
        network={settings.network}
      />
    </Router>
  );
};

export default Main;
