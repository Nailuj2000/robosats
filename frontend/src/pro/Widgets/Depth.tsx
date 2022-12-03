import React, { useContext } from 'react';
import { AppContext, AppContextProps } from '../../contexts/AppContext';
import { Paper, useTheme } from '@mui/material';
import DepthChart from '../../components/Charts/DepthChart';

interface DepthChartWidgetProps {
  layout: any;
  gridCellSize: number;
  style?: Object;
  className?: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchEnd?: () => void;
  baseUrl: string;
}

const DepthChartWidget = React.forwardRef(
  (
    {
      layout,
      gridCellSize,
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
    }: DepthChartWidgetProps,
    ref,
  ) => {
    const { book, fav, limits, info, baseUrl } = useContext<AppContextProps>(AppContext);
    return React.useMemo(() => {
      return (
        <Paper elevation={3} style={{ width: '100%', height: '100%' }}>
          <DepthChart
            baseUrl={baseUrl}
            elevation={0}
            orders={book.orders}
            currency={fav.currency}
            limits={limits.list}
            maxWidth={layout.w * gridCellSize} // EM units
            maxHeight={layout.h * gridCellSize} // EM units
            fillContainer={true}
            lastDayPremium={info.last_day_nonkyc_btc_premium}
            baseUrl={baseUrl}
          />
        </Paper>
      );
    }, [fav.currency, book.orders, limits.list, layout]);
  },
);

export default DepthChartWidget;
