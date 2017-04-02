import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import React from 'react';

class AddLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			isOpen: false,
			url: ''
		};
	}
	handleModalClose() {
		this.setState({
			error: '',
			url: '',
			isOpen: false
		});
	}
	onChange(e) {
		this.setState({ url: e.target.value });
	}
	onSubmit(e) {
		const { url } = this.state;
		e.preventDefault();

		Meteor.call('links.insert', url, (err, res) => {
			if (!err) {
				this.handleModalClose();
			} else {
				this.setState({ error: err.reason });
			}
		});
	}
	renderError() {
		if (this.state.error) {
			return <p>{this.state.error}</p>;
		} else {
			return undefined;
		}
	}
	render() {
		return (
			<div>
				<button className="button" onClick={() => this.setState({ isOpen: true})}>+ Add Link</button>
				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Add link"
					onAfterOpen={() => this.refs.url.focus()}
					onRequestClose={this.handleModalClose.bind(this)}
					className="boxed-view__box"
					overlayClassName="boxed-view boxed-view--modal"
				>

					<h1>Add Link</h1>
					{this.renderError()}
					<form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
						<input
							type="text"
							placeholder="URL"
							ref="url"
							value={this.state.url}
							onChange={this.onChange.bind(this)}
						/>
						<button className="button">Add Link</button>
						<button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>
							Cancel
						</button>
					</form>
				</Modal>
			</div>
		);
	}
}

export default AddLink;
