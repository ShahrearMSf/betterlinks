import { __ } from '@wordpress/i18n';
import { SetupContext } from 'index';
import { useContext, useState } from 'react';
import { makeRequest } from 'utils/helper';

const GettingStarted = () => {
	const { setActiveStep, setClientConsent } = useContext(SetupContext);
	const [show, setShow] = useState(false);
	const showHideUserNotice = (e) => {
		e.preventDefault();
		setShow(!show);
	};
	const handleClientConsent = async (opt_in) => {
		const res = await makeRequest({
			action: 'betterlinks__client_consent',
			opt_in_value: opt_in,
		});
		setClientConsent(res.data?.success);
	};
	return (
		<>
			<div className="getting-started">
				<h3>{__('Getting Started', 'betterlinks')}</h3>
				<p>{__("Easily get started with the easy setup wizard and complete setting up to streamline website's link management strategy.", 'betterlinks')}</p>

				<iframe
					width={450}
					height={258}
					src="https://www.youtube-nocookie.com/embed/ZJqBrFhQC1A"
					title="YouTube video player"
					frameBorder={0}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>

				<div className="actions">
					<p>
						<span>
							{__('By clicking this button I am allowing this app to collect my information.', 'betterlinks')}
							<span className="what-we-collect" onClick={showHideUserNotice}>
								{__('What We Collect?', 'betterlinks')}
							</span>
						</span>
						<span className={`consent-info ${show ? 'show' : 'hide'}`}>
							<span>
								{__(
									'We collect non-sensitive diagnostic data and plugin usage information. Your site URL, WordPress & PHP version, plugins & themes and email address to send you the discount coupon. This data lets us make sure this plugin always stays compatible with the most popular plugins and themes. No spam, I promise.',
									'betterlinks'
								)}
							</span>
						</span>
					</p>
					<button
						className="button button-primary"
						onClick={() => {
							handleClientConsent('yes');
							setActiveStep(1);
						}}
					>
						{__('Proceed to Next Step', 'betterlinks')}
					</button>
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							handleClientConsent('no'); //
							setActiveStep(1);
						}}
					>
						{__('Skip This Step', 'betterlinks')}
					</a>
				</div>
			</div>
		</>
	);
};

export default GettingStarted;
