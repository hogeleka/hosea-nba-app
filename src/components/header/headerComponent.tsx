import { AppBar, Toolbar } from '@material-ui/core';
import * as React from 'react';


export class Header extends React.Component {
    render = (): React.ReactNode => {
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <h1>NBA Dashboard</h1>
                </Toolbar>
            </AppBar>
        )
    }
  
}