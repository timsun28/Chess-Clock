import './App.css';
import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core';

import Timer from './timer';
import InGameSettings from './InGameSettings.jsx';
import CenterSettings from './centerSettings';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player1: 300,
			player2: 300,
			addition: 5,
			active: '',
			setup: true,
			selectedGameType: 'fischer'
		}
		this.click = this.click.bind(this);
		this.updateAddition = this.updateAddition.bind(this);
		this.updateMinutes = this.updateMinutes.bind(this);
		this.startGame = this.startGame.bind(this);
		this.reset = this.reset.bind(this);
		this.pause = this.pause.bind(this);
		this.setGameType = this.setGameType.bind(this)
	}

	click(player) {
		if (this.state.setup) {
			return
		}
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
		if (!newAddition) {
			this.setState({ addition: 0 })
			return;
		}
		this.setState({ addition: parseInt(newAddition, 10) })
	}

	setGameType(newGameType) {
		const gameTypes = {
			'fischerBlitz': {playerTime: 300, addition: 0, delay: 0},
			'delayBullet': {playerTime: 60, addition: 0, delay: 2},
			'fischer': {playerTime: 300, addition: 5, delay: 0},
			'fischerRapid': {playerTime: 600, addition: 5, delay: 0},
			'tournament': {playerTime: 7200, addition: 5, delay: 5}
		}
		
		this.setState({
			player1: gameTypes[newGameType].playerTime, 
			player2: gameTypes[newGameType].playerTime, 
			addition: gameTypes[newGameType].addition,
			selectedGameType: newGameType
		})
	}

	render() {
		return (
			<div className="App">
				<Container fixed style={{ height: '100vh', paddingLeft: '0', paddingRight: '0' }}>
					<Grid container style={{ 'height': '100%' }}>
						<Timer player='player1' secondsLeft={this.state.player1} active={this.state.active} click={this.click} />
						{this.state.setup ? 
						<CenterSettings player1={this.state.player1} player2={this.state.player2} updateMinutes={this.updateMinutes} addition={this.state.addition} updateAddition={this.updateAddition} startGame={this.startGame} setGameType={this.setGameType} selectedGameType={this.state.selectedGameType}/> 
						: 
						<InGameSettings reset={this.reset} pause={this.pause}/>}
						<Timer player='player2' secondsLeft={this.state.player2} active={this.state.active} click={this.click} />
					</Grid>
				</Container>
			</div>
		);
	}
}

export default App;
