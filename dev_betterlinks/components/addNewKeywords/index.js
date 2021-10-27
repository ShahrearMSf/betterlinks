import React from 'react';
import Modal from 'react-modal';
import { Field, Form, Formik, FormikProps } from 'formik';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export default function AddNewKeywords(props) {
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<React.Fragment>
			<button className="btl-create-autolink-button" onClick={openModal}>
				Add New Keywords
			</button>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
				<Formik
					initialValues={{ email: '', color: 'red', firstName: '' }}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							actions.setSubmitting(false);
						}, 1000);
					}}
				>
					{(props) => (
						<Form>
							<Field type="email" name="email" placeholder="Email" />
							<Field as="select" name="color">
								<option value="red">Red</option>
								<option value="green">Green</option>
								<option value="blue">Blue</option>
							</Field>
							<button type="submit">Submit</button>
						</Form>
					)}
				</Formik>
			</Modal>
		</React.Fragment>
	);
}

AddNewKeywords.propTypes = propTypes;
AddNewKeywords.defaultProps = defaultProps;
