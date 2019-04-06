import React, { Component } from 'react';
import AccountItem from './AccountItem';
import axios from 'axios';

class AccountList extends Component {
	constructor(props) {
		super(props);
		this.state = {accounts: []}
	}
	
	componentDidMount() {
		const that = this;
		axios.get('/accounts')
			.then(function(response) {
				that.setState({accounts: response.data.accounts});
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	
	render() {
		const { twoAccounts } = this.props;
		const { accounts } = this.state;
		const accountRows = accounts.map((account) => (
			<AccountItem key={account.id} 
						 id={account.id}
						 twoAccounts={twoAccounts} />
		));
		return (
			<div>
				<table className="ui selectable structured small table">
					<thead>
						<tr>
							<th colSpan="4">Account List</th>
						</tr>
						<tr>
							<th>id</th>
							<th>name</th>
							<th>balance</th>
							<th>code</th>
						</tr>
					</thead>
					<tbody>
						{accountRows}
					</tbody>
				</table>
			</div>
		);
	}
}

export default AccountList;