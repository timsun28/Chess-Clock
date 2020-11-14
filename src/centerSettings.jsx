import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';


export default function CenterSettings(props) {
    return (
        <Grid item xs={12}>
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
                        <Grid item xs={4}>
                            Player 1
                                </Grid>
                        <Grid item xs={7}>
                            <TextField
                                id="outlined-number-player1"
                                label="Minutes"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={props.player1 / 60}
                                onChange={e => props.updateMinutes('player1', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
                        <Grid item xs={4}>
                            Extra Seconds
                                </Grid>
                        <Grid item xs={7}>
                            <TextField
                                id="outlined-number-addition"
                                label="Seconds"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={props.addition}
                                onChange={e => props.updateAddition(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
                        <Grid item xs={4}>
                            Player 2
                                </Grid>
                        <Grid item xs={7}>
                            <TextField
                                id="outlined-number-player2"
                                label="Minutes"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={props.player2 / 60}
                                onChange={e => props.updateMinutes('player2', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" style={{ height: '100%' }}>
                        <Grid item xs={11} style={{ marginLeft: '15px' }}>
                            <Button style={{ float: 'right', backgroundColor: 'orange' }} variant="outlined" size="large" onClick={() => props.startGame()}>
                                Start
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
