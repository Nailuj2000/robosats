import React, { useContext } from 'react';
import { AppContext, AppContextProps } from '../../contexts/AppContext';
import { Paper, useTheme } from '@mui/material';
import BookTable from '../../components/BookTable';
import { GridItem } from 'react-grid-layout';

interface BookWidgetProps {
  layout: GridItem;
  gridCellSize?: number;
  style?: Object;
  className?: string;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchEnd?: () => void;
}

const BookWidget = React.forwardRef(
  (
    {
      layout,
      gridCellSize = 2,
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
    }: BookWidgetProps,
    ref,
  ) => {
    const theme = useTheme();
    const { book, fetchBook, fav, setFav, windowSize, baseUrl } =
      useContext<AppContextProps>(AppContext);
    return React.useMemo(() => {
      return (
        <Paper elevation={3} style={{ width: '100%', height: '100%' }}>
          <BookTable
            baseUrl={baseUrl}
            elevation={0}
            fetchBook={fetchBook}
            book={book}
            fav={fav}
            fillContainer={true}
            maxWidth={layout.w * gridCellSize} // EM units
            maxHeight={layout.h * gridCellSize} // EM units
            fullWidth={windowSize.width} // EM units
            fullHeight={windowSize.height} // EM units
            defaultFullscreen={false}
            onCurrencyChange={(e) => setFav({ ...fav, currency: e.target.value })}
            onTypeChange={(mouseEvent, val) => setFav({ ...fav, type: val })}
            baseUrl={baseUrl}
          />
        </Paper>
      );
    }, [book, layout, windowSize, fav]);
  },
);

export default BookWidget;
