import React, { useContext, useState } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { Grid, styled, useTheme } from '@mui/material';

import {
  PlaceholderWidget,
  MakerWidget,
  BookWidget,
  DepthChartWidget,
  SettingsWidget,
  FederationWidget,
} from '../pro/Widgets';
import ToolBar from '../pro/ToolBar';
import LandingDialog from '../pro/LandingDialog';
import { AppContext, AppContextProps } from '../contexts/AppContext';

// To Do. Add dotted grid when layout is not frozen
// ${freeze ?
//   `background: radial-gradient(${theme.palette.text.disabled} 1px, transparent 0px);
//   background-size: ${gridCellSize}em ${gridCellSize}em;
//   background-position: left 1em bottom 1.5em;`
// :''}

const StyledRGL = styled(GridLayout)(
  ({ theme, gridCellSize, height, width, freeze }) => `
  height: ${height}em;
  width: ${width}px;
  max-height: ${height}em;
  `,
);

const defaultLayout: Layout = [
  { i: 'Maker', w: 10, h: 16, x: 67, y: 0, minW: 8, maxW: 22, minH: 10, maxH: 28 },
  { i: 'Book', w: 43, h: 15, x: 34, y: 16, minW: 6, maxW: 70, minH: 9, maxH: 25 },
  { i: 'DepthChart', w: 15, h: 10, x: 19, y: 16, minW: 6, maxW: 22, minH: 9, maxH: 25 },
  { i: 'Garage', w: 52, h: 16, x: 0, y: 0, minW: 15, maxW: 78, minH: 8, maxH: 30 },
  { i: 'History', w: 10, h: 10, x: 9, y: 16, minW: 6, maxW: 22, minH: 9, maxH: 25 },
  { i: 'Trade', w: 15, h: 16, x: 52, y: 0, minW: 6, maxW: 22, minH: 9, maxH: 25 },
  { i: 'Settings', w: 9, h: 15, x: 0, y: 16, minW: 6, maxW: 22, minH: 9, maxH: 25 },
  { i: 'Federation', w: 25, h: 5, x: 9, y: 26, minW: 2, maxW: 50, minH: 4, maxH: 25 },
];

const Main = (): JSX.Element => {
  const theme = useTheme();
<<<<<<< HEAD
  const em: number = theme.typography.fontSize;
  const toolbarHeight: number = 3;
  const gridCellSize: number = 2;

  const defaultLayout: Layout = [
    { i: 'Maker', w: 10, h: 16, x: 67, y: 0, minW: 8, maxW: 22, minH: 10, maxH: 28 },
    { i: 'Book', w: 43, h: 15, x: 34, y: 16, minW: 6, maxW: 70, minH: 9, maxH: 25 },
    { i: 'DepthChart', w: 15, h: 10, x: 19, y: 16, minW: 6, maxW: 22, minH: 9, maxH: 25 },
    { i: 'Garage', w: 52, h: 16, x: 0, y: 0, minW: 15, maxW: 78, minH: 8, maxH: 30 },
    { i: 'History', w: 10, h: 10, x: 9, y: 16, minW: 6, maxW: 22, minH: 9, maxH: 25 },
    { i: 'Trade', w: 15, h: 16, x: 52, y: 0, minW: 6, maxW: 22, minH: 9, maxH: 25 },
    { i: 'Settings', w: 9, h: 15, x: 0, y: 16, minW: 6, maxW: 22, minH: 9, maxH: 25 },
    { i: 'Other', w: 25, h: 5, x: 9, y: 26, minW: 2, maxW: 50, minH: 4, maxH: 25 },
  ];

  // All app data structured
  const [book, setBook] = useState<Book>({ orders: [], loading: true });
  const [limits, setLimits] = useState<{ list: LimitList; loading: boolean }>({
    list: [],
    loading: true,
  });
  const [robot, setRobot] = useState<Robot>(new Robot());
  const [maker, setMaker] = useState<Maker>(defaultMaker);
  const [info, setInfo] = useState<Info>(defaultInfo);
  const [coordinators, setCoordinators] = useState<Coordinator[]>(defaultCoordinators);
  const [fav, setFav] = useState<Favorites>({ type: null, currency: 0 });
  const [baseUrl, setBaseUrl] = useState<string>('');
=======
  const { settings, windowSize } = useContext<AppContextProps>(AppContext);
>>>>>>> Fix PRO after AppContext refactor
  const [layout, setLayout] = useState<Layout>(defaultLayout);
  const [openLanding, setOpenLanding] = useState<boolean>(true);
<<<<<<< HEAD
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>(
    getWindowSize(em),
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('resize', onResize);
    }

    if (baseUrl != '') {
      fetchBook();
      fetchLimits();
    }
    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener('resize', onResize);
      }
    };
  }, [baseUrl]);

  useEffect(() => {
    let host = '';
    if (window.NativeRobosats === undefined) {
      host = getHost();
    } else {
      host =
        settings.network === 'mainnet'
          ? coordinators[0].mainnetOnion
          : coordinators[0].testnetOnion;
    }
    setBaseUrl(`http://${host}`);
  }, [settings.network]);

  useEffect(() => {
    setWindowSize(getWindowSize(theme.typography.fontSize));
  }, [theme.typography.fontSize]);

  const onResize = function () {
    setWindowSize(getWindowSize(em));
  };

  useEffect(() => {
    setWindowSize(getWindowSize(theme.typography.fontSize));
  }, [theme.typography.fontSize]);

  const fetchLimits = async () => {
    setLimits({ ...limits, loading: true });
    const data = apiClient.get(baseUrl, '/api/limits/').then((data) => {
      setLimits({ list: data ?? [], loading: false });
      return data;
    });
    return await data;
  };

  const fetchBook = function () {
    setBook({ ...book, loading: true });
    apiClient.get(baseUrl, '/api/book/').then((data: any) =>
      setBook({
        loading: false,
        orders: data.not_found ? [] : data,
      }),
    );
  };

  const fetchInfo = function () {
    apiClient.get(baseUrl, '/api/info/').then((data: any) => {
      const versionInfo: any = checkVer(data.version.major, data.version.minor, data.version.patch);
      setInfo({
        ...data,
        openUpdateClient: versionInfo.updateAvailable,
        coordinatorVersion: versionInfo.coordinatorVersion,
        clientVersion: versionInfo.clientVersion,
      });
    });
  };
=======

  const em: number = theme.typography.fontSize;
  const toolbarHeight: number = 3;
  const gridCellSize: number = 2;
>>>>>>> Fix PRO after AppContext refactor

  return (
    <Grid container direction='column' sx={{ width: `${windowSize.width}em` }}>
      <Grid item>
        <ToolBar height={`${toolbarHeight}em`} />
        <LandingDialog open={openLanding} onClose={() => setOpenLanding(!openLanding)} />
      </Grid>

      <Grid item>
        <StyledRGL
          height={windowSize.height - toolbarHeight}
          width={Number((windowSize.width / gridCellSize).toFixed()) * gridCellSize * em}
          theme={theme}
          freeze={!settings.freezeViewports}
          gridCellSize={gridCellSize}
          className='layout'
          layout={layout}
          cols={Number((windowSize.width / gridCellSize).toFixed())} // cols are 2em wide
          margin={[0.5 * em, 0.5 * em]}
          isDraggable={!settings.freezeViewports}
          isResizable={!settings.freezeViewports}
          rowHeight={gridCellSize * em} // rows are 2em high
          autoSize={true}
          onLayoutChange={(layout: Layout) => setLayout(layout)}
        >
          <div key='Maker'>
<<<<<<< HEAD
            <MakerWidget
              baseUrl={baseUrl}
              limits={limits}
              fetchLimits={fetchLimits}
              fav={fav}
              setFav={setFav}
              maker={maker}
              setMaker={setMaker}
            />
          </div>
          <div key='Book'>
            <BookWidget
              baseUrl={baseUrl}
              book={book}
              layout={layout[1]}
              gridCellSize={gridCellSize}
              fetchBook={fetchBook}
              fav={fav}
              setFav={setFav}
              windowSize={windowSize}
            />
          </div>
          <div key='DepthChart'>
            <DepthChartWidget
              baseUrl={baseUrl}
              orders={book.orders}
              gridCellSize={gridCellSize}
              limitList={limits.list}
              layout={layout[2]}
              currency={fav.currency}
              windowSize={windowSize}
            />
=======
            <MakerWidget />
          </div>
          <div key='Book'>
            <BookWidget layout={layout[1]} gridCellSize={gridCellSize} />
          </div>
          <div key='DepthChart'>
            <DepthChartWidget gridCellSize={gridCellSize} layout={layout[2]} />
>>>>>>> Fix PRO after AppContext refactor
          </div>
          <div key='Settings'>
            <SettingsWidget />
          </div>
          <div key='Garage'>
            <PlaceholderWidget label='Robot Garage' />
          </div>
          <div key='History'>
            <PlaceholderWidget label='Garage History' />
          </div>
          <div key='Trade'>
            <PlaceholderWidget label='Trade Box' />
          </div>
          <div key='Federation'>
            <FederationWidget layout={layout[7]} gridCellSize={gridCellSize} />
          </div>
        </StyledRGL>
      </Grid>
    </Grid>
  );
};

export default Main;
