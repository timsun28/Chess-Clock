import React from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


export default function CenterSettings(props) {
    return (
        <Grid item xs={12}>
            <Grid container spacing={2} style={{ height: '100%' }}>
                <GameTypeSelection setGameType={props.setGameType} selectedGameType={props.selectedGameType}/>
                <PlayerInput updateMinutes={props.updateMinutes} playerSettings={{ value: props.player1, name: 'Player 1', key: 'player1' }} />
                <AdditionInput addition={props.addition} updateAddition={props.updateAddition} />
                <DelayInput delay={props.delay} updateDelay={props.updateDelay} />
                <PlayerInput updateMinutes={props.updateMinutes} playerSettings={{ value: props.player2, name: 'Player 2', key: 'player2' }} />
                <StartGameButton startGame={props.startGame} />
            </Grid>
        </Grid>
    )
}

function GameTypeSelection(props) {
    const gameTypes = [
        {key: 'fischerBlitz', value: 'Fischer Blitz 5|0'},
        {key: 'delayBullet', value: 'Delay Bullet 1|2'},
        {key: 'fischer', value: 'Fischer 5|5'},
        {key: 'fischerRapid', value: 'Fischer Rapid 10|5'},
        // {key: 'tournament', value: 'Tournament 40/2hr, G60, 5s delay'},
    ]
    return (
        <Grid item xs={12}>
            <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item md={4} xs={12} style={{paddingLeft: '15px', paddingRight: '15px'}}>
                    <FormControl variant="outlined" style={{width: '100%'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Formats</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={props.selectedGameType}
                            onChange={(event) => props.setGameType(event.target.value)}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {gameTypes.map(item => {
                                return <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    )
}

function PlayerInput(props) {
    return (
        <Grid item xs={12}>
            <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={4}>
                    {props.playerSettings.name}
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id="outlined-number"
                        label="Minutes"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={props.playerSettings.value / 60}
                        onChange={e => props.updateMinutes(props.playerSettings.key, e.target.value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

function AdditionInput(props) {
    return (
        <Grid item xs={12}>
            <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={4}>
                    Additional Seconds
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
    )
}

function DelayInput(props) {
    return (
        <Grid item xs={12}>
            <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={4}>
                    Delay in Seconds
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id="outlined-number-delay"
                        label="Seconds"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={props.delay}
                        onChange={e => props.updateDelay(e.target.value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

function StartGameButton(props) {
    return (
        <Grid item xs={12}>
            <Grid container direction="row" justify="flex-start" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={11} style={{ marginLeft: '15px' }}>
                    <Button style={{ float: 'right', backgroundColor: 'orange' }} variant="outlined" size="large" onClick={() => props.startGame()}>
                        Start
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
