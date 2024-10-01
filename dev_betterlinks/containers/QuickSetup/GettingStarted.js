import { __ } from '@wordpress/i18n';
import { SetupContext } from 'pages/QuickSetup';
import { useContext, useState } from 'react';

const GettingStarted = () => {
	const { setActiveStep } = useContext(SetupContext);
	const [show, setShow] = useState(false);
	const showHideUserNotice = (e) => {
		e.preventDefault();
		setShow(!show);
	};
	return (
		<>
			<div className="getting-started">
				<iframe
					width={300}
					height={172}
					src="https://www.youtube-nocookie.com/embed/IcZ6WqzCSgg?si=3It8I3UPiloh6qfk"
					title="YouTube video player"
					frameBorder={0}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>

				<h3>{__('Getting Started', 'betterlinks')}</h3>
				<p>{__('Lorem ipsum dolor sit amet consectetur. Amet vulputate ante ipsum maecenas diam vestibulum potenti augue.', 'betterlinks')}</p>

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
					<button className="button button-primary" onClick={() => setActiveStep(1)}>
						{__('Proceed to Next Step', 'betterlinks')}
					</button>
					<a href="#">{__('Skip This Step', 'betterlinks')}</a>
				</div>
			</div>
		</>
	);
};

export default GettingStarted;
