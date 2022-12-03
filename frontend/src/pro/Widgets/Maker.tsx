import React, { useContext } from 'react';

import MakerForm from '../../components/MakerForm';
import { LimitList, Maker, Favorites } from '../../models';
import { Paper } from '@mui/material';
import { AppContext, AppContextProps } from '../../contexts/AppContext';

interface MakerWidgetProps {
  style?: Object;
  className?: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchEnd?: () => void;
}

const MakerWidget = React.forwardRef(
<<<<<<< HEAD
  (
    {
      maker,
      setMaker,
      limits,
      fetchLimits,
      fav,
      setFav,
      baseUrl,
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
    }: MakerWidgetProps,
    ref,
  ) => {
=======
  ({ style, className, onMouseDown, onMouseUp, onTouchEnd }: MakerWidgetProps, ref) => {
    const { limits, fetchLimits, maker, setMaker, fav, setFav, baseUrl } =
      useContext<AppContextProps>(AppContext);
>>>>>>> Fix PRO after AppContext refactor
    return React.useMemo(() => {
      return (
        <Paper
          elevation={3}
          style={{ padding: 8, overflow: 'auto', width: '100%', height: '100%' }}
        >
          <MakerForm
            baseUrl={baseUrl}
            limits={limits}
            fetchLimits={fetchLimits}
            maker={maker}
            setMaker={setMaker}
            fav={fav}
            setFav={setFav}
            baseUrl={baseUrl}
          />
        </Paper>
      );
    }, [maker, limits, fav]);
  },
);

export default MakerWidget;
