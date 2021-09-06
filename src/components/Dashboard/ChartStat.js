import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  EventTracker,
  HoverState,
} from '@devexpress/dx-react-chart';

const ChartStat = (props) => {
  const chartData = props.data;

  return (
    <Paper elevation={2}>
      <Box p={2}>
        <Box display='flex' alignItems='center' mb={1}>
          <Box mr={2}>
            <Typography color='primary' variant='h5'>
              {props.title}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5'>{props.number}</Typography>
          </Box>
        </Box>
        <Box>
          <Chart data={chartData} height={250}>
            <ArgumentAxis />
            <ValueAxis showLine={false} />

            <SplineSeries
              name='spline'
              valueField='splineValue'
              argumentField='argument'
            />
            <EventTracker />
            <HoverState />
            <Tooltip />
            <Animation />
          </Chart>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChartStat;
