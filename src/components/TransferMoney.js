import React, { PureComponent } from 'react';
import axios from 'axios';

class TransferMoney extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fromId: '',
			toId: '',
			amount: '',
			currencyCode: 'USD',
			code: '',
			message: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({[name]: value});
	}
	
	handleSubmit(event) {
		const that = this;
		axios.post('/transaction', {
			fromAccountId: this.state.fromId,
			toAccountId: this.state.toId,
			currencyCode: this.state.currencyCode,
			amount: this.state.amount
		})
		.then(function(response) {
			that.props.updateStateProp(response.data.content);
			that.setState({
				code: response.data.code,
				message: response.data.message,
			});
		})
		.catch(function(error) {
			if (error.response) {
				that.setState({
					code: error.response.data.code,
					message: error.response.data.message,
				});
			}else {
				console.log('Error', error.message);
			}
		});
	}
	
	render() {
		return (
			<table className="ui selectable structured small table">
				<thead>
					<tr>
						<th>Transfer Money</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<label className="la">From Account Id:</label>
							<input className="input" name="fromId" type="text" value={this.state.fromId} onChange={this.handleChange}/>
						</td>
					</tr>
					<tr>
						<td>
							<label className="la">To Account Id:</label>
							<input className="input" name="toId" type="text" value={this.state.toId} onChange={this.handleChange} />
						</td>
					</tr>
					<tr>
						<td>
							<label className="la">Amount:</label>
							<input className="input" name="amount" type="number" value={this.state.amount} onChange={this.handleChange} />
						</td>
					</tr>
					<tr>
						<td>
							<label className="la">Currency Code:</label>
							<select name="currencyCode" value={this.state.value} onChange={this.handleChange} >
								<option value="USD">USD</option>
								<option value="HKD">HKD</option>
								<option value="GBP">GBP</option>
								<option value="CNY">CNY</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<button onClick={this.handleSubmit}>Transfer</button>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>
							{this.state.code} {this.state.message}
						</th>
					</tr>
				</tfoot>
			</table>
		);
	}
}

export default TransferMoney;