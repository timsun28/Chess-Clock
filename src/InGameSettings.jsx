import React from 'react';
import { Grid } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

export default function InGameSettings(props) {
    return (
        <Grid item xs={12} style={{ marginBottom: '-15%', marginTop: '-15%' }}>
            <div className='Time-box'>
                <RestoreIcon onClick={() => props.reset()} style={{ 'fontSize': 75 }} />
                <PauseCircleOutlineIcon onClick={() => props.pause()} style={{ 'fontSize': 75 }} />
            </div>
        </Grid>
    )
}
