// wordpress imports
const { __ } = wp.i18n;
const { ToggleControl, Spinner } = wp.components;

export const RenderSettings = ({
	setLinkNewTab,
	linkNewTab,
	setSponsored,
	sponsored,
	setNoFollow,
	noFollow,
	// newLinkTitle,
	// newLinkTargetUrl,
	// newLinkShortUrl,
	// isSubmittedNewLink,
	// isSubmittingNewLink,
	// isNewLinkSubmissionFailed,
	// handleTitleChange,
	// handleTargetUrlChange,
	// handleShortUrlChange,
	// handleNewLinkSubmit,
}) => {
	return (
		<div className="betterlinks-expanded-format-options">
			<ToggleControl label={__(`Open in new tab`)} checked={linkNewTab} onChange={() => setLinkNewTab(!linkNewTab)} />
			<ToggleControl label={__(`Sponsored`)} checked={sponsored} onChange={() => setSponsored(!sponsored)} />
			<ToggleControl label={__(`Nofollow`)} checked={noFollow} onChange={() => setNoFollow(!noFollow)} />
			<>
				{/* <hr />
				{isSubmittedNewLink && (
					<>
						<p className="betterlinks-format-new-link-created-success">
							Success!! <br />
							Link SuccessFully Created!!!
						</p>
					</>
				)}
				{isNewLinkSubmissionFailed && (
					<>
						<p className="betterlinks-format-new-link-creating-failed">
							Link creation failed!!! <br />
							Please make sure to use a unique short link that doesn't already exist. <br />
							Also make sure no fields are empty
						</p>
					</>
				)}
				<form className="betterlinks-format-new-link-form" onSubmit={handleNewLinkSubmit}>
					<h4>Create New Betterlink</h4>
					<input type="text" onChange={handleTitleChange} placeholder={__('Link Title')} value={newLinkTitle} />
					<input type="text" onChange={handleTargetUrlChange} placeholder={__('Target Url')} value={newLinkTargetUrl} />
					<input type="text" onChange={handleShortUrlChange} placeholder={__('Betterlink Shortened Url Slug')} value={newLinkShortUrl} />
					<button type="submit">Create Link</button>
					{isSubmittingNewLink && <Spinner />}
				</form> */}
			</>
		</div>
	);
};
