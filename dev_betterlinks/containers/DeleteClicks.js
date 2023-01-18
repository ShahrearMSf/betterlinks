import {
	deleteClicks,
} from 'utils/helper';

const DeleteClicks = (props) => {
	return (
		<div className="btl-analytic-reset-wrapeer">
			<h3>delete analytics</h3>
			<button onClick={() => deleteClicks()}>Delete Analytics Older than 30 days</button>
			<button onClick={() => deleteClicks()}>Delete Analytics Older than 90 days</button>
			<button onClick={() => deleteClicks()}>Delete All Analytics</button>
		</div>
	);
};

export default DeleteClicks;
