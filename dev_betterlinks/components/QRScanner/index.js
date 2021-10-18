import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import QRCode from 'qrcode.react';
import { makeShortUrl } from './../../utils/helper';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

class QRCodeGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.download = this.download.bind(this);
	}

	componentDidMount() {
		this.download();
	}

	download() {
		const canvas = document.querySelector('.betterlinksqrcode > canvas');
		this.downloadRef.href = canvas.toDataURL();
		this.downloadRef.download = `betterlinks-${this.props.value}-QR.png`;
	}

	render() {
		return (
			<React.Fragment>
				<div className="btl-qrcode-modal">
					<div className="betterlinksqrcode">
						<QRCode value={makeShortUrl(this.props.value)} size={300} level={'H'} />
					</div>
					<a className="btn-qrcode-download" ref={(ref) => (this.downloadRef = ref)}>
						<i className="btl btl-download-arrow"></i>
					</a>
				</div>
			</React.Fragment>
		);
	}
}

const customStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		width: 'auto',
		height: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export default function QRScanner({ shortUrl }) {
	const [modalIsOpen, setIsOpen] = useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<React.Fragment>
			<>
				<button className="dnd-link-button" onClick={openModal}>
					<span className="icon">
						<i className="btl btl-qr-scanner"></i>
					</span>
				</button>
				<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
					<span className="btl-close-modal" onClick={closeModal}>
						<i className="btl btl-cancel"></i>
					</span>
					<QRCodeGenerator value={shortUrl} />
				</Modal>
			</>
		</React.Fragment>
	);
}

QRScanner.propTypes = propTypes;
QRScanner.defaultProps = defaultProps;
