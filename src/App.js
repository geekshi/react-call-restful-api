import React, { Component } from 'react';
import './App.css';
import TransferMoney from './components/TransferMoney';
import AccountList from './components/AccountList';

class App extends Component {
	state = {
		twoAccounts: []
	};
	
	handleUpdate = content => {
		this.setState({twoAccounts: content});
	}
	render() {
		return (
			<div className="App">
				<div className="ui text container">
					<TransferMoney updateStateProp={this.handleUpdate}/>
					<AccountList twoAccounts={this.state.twoAccounts}/>
				</div>
			</div>
		)
	}
}

export default App;
