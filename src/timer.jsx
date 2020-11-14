import { Grid } from '@material-ui/core';
import React, { Component } from 'react';

class Timer extends Component {
    className() {
        let className = 'Time-box lg-text'
        return className += this.props.player === 'player1' ? ' upside-down' : ''
    }
    formatTime(totalAmountOfSeconds) {
        const minutes = Math.floor(totalAmountOfSeconds / 60)
        const seconds = totalAmountOfSeconds % 60
        return `${minutes} : ${seconds.toString().padStart(2, '0')}`
    };
    render() {
        const activePlayer = this.props.active
        const currentPlayer = this.props.player
        return (
            <Grid item xs={12} style={{ 'background': activePlayer  === currentPlayer ? 'orange' : 'gray' }} onClick={() => this.props.click(currentPlayer)}>
                <div className={this.className()}>
                    {this.formatTime(this.props.secondsLeft)}
                </div>
            </Grid>
        )
    }
}

export default Timer