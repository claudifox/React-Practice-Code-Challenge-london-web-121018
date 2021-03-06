import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import FormContainer from './containers/FormContainer'

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    currentFour: [0,4],
    emptyPlates: [],
    budget: 100
  }


  componentDidMount() {
    return fetch(API)
      .then(response => response.json())
      .then(sushis => this.setState({sushis: sushis}))
  }

  nextFour = () => {
    const nextFour = [this.state.currentFour[0] + 4, this.state.currentFour[1] + 4]
    this.setState({currentFour: nextFour })
  }


  addEmptyPlate = price => {
    const emptyPlates = this.state.emptyPlates.concat([0])
    const budget = this.state.budget - price
    this.setState({
      emptyPlates: emptyPlates,
      budget: budget
    })
  }

  addMoneyToWallet = event => {
    event.preventDefault()
    // debugger
    const newBudget = this.state.budget + parseFloat(event.target.amount.value)
    this.setState({
      budget: newBudget
    })
  }

  render() {
    return (
      <div className="app">
        <FormContainer budget={this.state.budget} addMoneyToWallet={this.addMoneyToWallet}/>
        <SushiContainer sushis={this.state.sushis} currentFour={this.state.currentFour} nextFour={this.nextFour} budget={this.state.budget} addEmptyPlate={this.addEmptyPlate}/>
        <Table budget={this.state.budget} emptyPlates={this.state.emptyPlates} />
      </div>
    );
  }
}

export default App;
