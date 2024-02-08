import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic'
import Title from './Title';
import Signup from '@/pages/auth/register';
import { TextField } from '@mui/material';


export default function Chart() {
    const theme = useTheme();

    return(
        <React.Fragment>
            <Title>Admin Dashboard</Title>
              <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                ...
              </div>
        </React.Fragment>
    )
}