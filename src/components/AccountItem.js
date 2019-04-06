import React, { Component } from 'react';
import axios from 'axios';

class AccountItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			balance: '',
			code: ''
		}
	}
	
	componentDidMount() {
		const { id } = this.props;
		const that = this;
		const url = '/accounts/' + id;
		axios.get(url)
			.then(function(response) {
				that.setState({
					id: id,
					name: response.data.accountName,
					balance: response.data.balance,
					code: response.data.currencyCode
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	
	componentWillReceiveProps(nextProps) {
		const twoAccounts = nextProps.twoAccounts;
		const updateAccounts = [twoAccounts[0].id, twoAccounts[1].id];
		const idx = updateAccounts.indexOf(this.state.id);
		if(idx >= 0){
			this.setState({
				balance: twoAccounts[idx].balance
			});
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return nextState.balance !== this.state.balance;
	}
	
	render() {
		return (
			<tr>
				<td className="left aligned">{this.state.id}</td>
				<td className="left aligned">{this.state.name}</td>
				<td className="left aligned">{this.state.balance}</td>
				<td className="left aligned">{this.state.code}</td>
			</tr>
		);
	}
}

export default AccountItem;