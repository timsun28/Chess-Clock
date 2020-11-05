import './App.css';
import React, { Component } from 'react';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RestoreIcon from '@material-ui/icons/Restore';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player1: 300,
			player2: 300,
			addition: 5,
			active: '',
			setup: true,
		}
	}

	click(player) {
		if (!this.state.active) {
			// First Round (no active players)
			const oppositePlayer = player === 'player1' ? 'player2' : 'player1'
			this.setState({ active: oppositePlayer })
			this.intervalID = setInterval(() => this.tick(oppositePlayer), 1000);
			return;
		}

		// Prevent action if it's not their turn
		if (player !== this.state.active) {
			return;
		}

		clearInterval(this.intervalID)
		const oppositePlayer = this.state.active === 'player1' ? 'player2' : 'player1'
		this.setState({ active: oppositePlayer })
		this.intervalID = setInterval(() => this.tick(oppositePlayer), 1000);
		this.setState({ [player]: this.state[player] + this.state.addition })
	}

	tick(player) {
		const currentSeconds = this.state[player];
		this.setState({ [player]: currentSeconds - 1 })
	}


	formatTime(totalAmountOfSeconds) {
		const minutes = Math.floor(totalAmountOfSeconds / 60)
		const seconds = totalAmountOfSeconds % 60
		return `${minutes} : ${seconds.toString().padStart(2, '0')}`
	};

	reset() {
		this.setState({ player1: 300, player2: 300, setup: true })
		this.pause();
	}
	pause() {
		clearInterval(this.intervalID);
		this.setState({ active: '' })
	}


	updateMinutes(player, newValue) {
		this.setState({ [player]: newValue * 60 })
	}

	startGame() {
		this.setState({ setup: false })
	}

	updateAddition(newAddition) {
		console.log(newAddition)
		this.setState({ addition: parseInt(newAddition, 10) })
	}

	render() {
		return (
			<div className="App">
				<Container fixed style={{ height: '100vh', paddingLeft: '0', paddingRight: '0' }}>
					<Grid container style={{ 'height': '100%' }}>
						<Grid item xs={12} style={{ 'background': this.state.active === 'player1' ? 'orange' : 'gray' }} onClick={() => this.click('player1')}>
							<div className='Time-box upside-down lg-text'>
								{this.formatTime(this.state.player1)}
							</div>
						</Grid>
						{this.state.setup ?
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
													value={this.state.player1 / 60}
													onChange={e => this.updateMinutes('player1', e.target.value)}
												/>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%'}}>
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
													value={this.state.addition}
													onChange={e => this.updateAddition(e.target.value)}
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
													value={this.state.player1 / 60}
													onChange={e => this.updateMinutes('player2', e.target.value)}
												/>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<Grid container direction="row" justify="flex-start">
											<Grid item xs={11} style={{marginLeft: '15px'}}>
												<Button style={{ float: 'right', backgroundColor: 'orange' }} variant="outlined" size="large" onClick={() => this.startGame()}>
													Start
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							:
							<Grid item xs={12} style={{ marginBottom: '-15%', marginTop: '-15%' }}>
								<div className='Time-box'>
									<RestoreIcon onClick={() => this.reset()} style={{ 'fontSize': 75 }} />
									<PauseCircleOutlineIcon onClick={() => this.pause()} style={{ 'fontSize': 75 }} />
								</div>
							</Grid>
						}
						<Grid item xs={12} style={{ 'background': this.state.active === 'player2' ? 'orange' : 'gray' }} onClick={() => this.click('player2')}>
							<div className='Time-box lg-text'>
								{this.formatTime(this.state.player2)}
							</div>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}
}

export default App;
