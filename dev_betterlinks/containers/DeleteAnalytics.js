const DeleteAnalytics = (props) => {
	const handleDeleteClicksOlderThan30days = () => {
		//
	};
	const handleDeleteClicksOlderThan90days = () => {
		//
	};
	const handleDeleteAllClicks = () => {
		//
	};

	return (
		<div className="btl-analytic-reset-wrapeer">
			<h3>delete analytics</h3>
			<button onClick={handleDeleteClicksOlderThan30days}>Delete Analytics Older than 30 days</button>
			<button onClick={handleDeleteClicksOlderThan90days}>Delete Analytics Older than 90 days</button>
			<button onClick={handleDeleteAllClicks}>Delete All Analytics</button>
		</div>
	);
};

export default DeleteAnalytics;
