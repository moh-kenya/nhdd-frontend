import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('@mui/material/styles'),
  { ssr: false }
)
const { LineChart, axisClasses } = DynamicComponentWithNoSSR;
// import { LineChart, axisClasses } from '@mui/x-charts';

import Title from './Title';

function createData(month, users) {
    return{month, users: users ?? null}
}

const data = [
    createData('Jan', 3),
    createData('Feb', 5),
    createData('Mar', 4),
    createData('Apr', 5),
    createData('May', 4),
    createData('Jun', 45),
    createData('Jul', 4),
    createData('Aug', 95),
    createData('Sep', 14),
    createData('Oct', 45),
    createData('Nov', 24),
    createData('Dec', 15)
]
export default function Chart() {
    const theme = useTheme();

    return(
        <React.Fragment>
            <Title>Today</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'month',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'users',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
        </React.Fragment>
    )
}