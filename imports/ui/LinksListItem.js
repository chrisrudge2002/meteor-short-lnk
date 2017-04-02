import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import React from 'react';

class LinksListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {copied: false};
	}
	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy);

		this.clipboard.on('success', () => {
			this.setState({copied: true});
			setInterval(() => this.setState({copied: false}), 1000);
		}).on('error', () => {
			alert('Unable to copy. Please manually copy the link.');
		});
	}
	componentWillUnmount() {
		this.clipboard.destroy();
	}
	hideLink() {
		Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
	}
	visitLink() {

	}
	renderStats() {
		const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
		let visitedMessage = null;

		if (typeof this.props.lastVisitedAt === 'number') {
			visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
		}

		return (
			<p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
		);
	}
	render() {
		return (
			<div className="item">
				<h2>{this.props.url}</h2>
				<p className="item__message">{this.props.shortUrl}</p>
				{this.renderStats()}
				<a className="button button--link button--pill" href={this.props.shortUrl} target="_blank">VISIT</a>
				<button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
					{this.state.copied ? 'Copied' : 'Copy'}
				</button>
				<button className="button button--pill" onClick={this.hideLink.bind(this)}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
			</div>
		);
	}
}

LinksListItem.propTypes = {
	_id: React.PropTypes.string.isRequired,
	lastVisitedAt: React.PropTypes.number,
	shortUrl: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired,
	userId: React.PropTypes.string.isRequired,
	visible: React.PropTypes.bool.isRequired,
	visitedCount: React.PropTypes.number.isRequired
};

export default LinksListItem;
