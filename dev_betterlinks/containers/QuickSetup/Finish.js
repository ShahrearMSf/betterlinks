import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import { copyToClipboard, plugin_root_url, site_url } from 'utils/helper';
import { connect } from 'react-redux';
import { update_quick_setup } from 'redux/actions/quick-setup.actions';
import { bindActionCreators } from 'redux';
import confetti from 'canvas-confetti';

const Finish = (props) => {
	const [copy, setCopy] = useState(false);
	useEffect(() => {
		window.scrollTo(0, 0);
		props.update_quick_setup({ isCreated: false, duplicateLink: false });
		let timer = setTimeout(() => {
			runConfetti();
		}, 150);

		return () => {
			clearTimeout(timer);
		};
	}, []);
	const runConfetti = () => {
		var count = 500;
		var defaults = {
			origin: { y: 0.5, x: 0.55 },
		};

		function fire(particleRatio, opts) {
			confetti({
				...defaults,
				...opts,
				particleCount: Math.floor(count * particleRatio),
			});
		}

		fire(0.25, {
			spread: 26,
			startVelocity: 55,
		});
		fire(0.2, {
			spread: 60,
		});
		fire(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		});
		fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		});
		fire(0.1, {
			spread: 120,
			startVelocity: 45,
		});
	};
	return (
		<>
			<div className="finish">
				<div id="confetti" />
				<div className="header">
					<h3>{__('Great Job!', 'betterlinks')}</h3>
					<p>{__('Link creation is complete and ready to help you, share, track, manage and optimize your links efficiently.', 'betterlinks')}</p>
					{props?.createdLink && Object.keys(props.createdLink).length && (
						<div className="btl-shortened-url">
							<span>{`${site_url}/${props.createdLink.short_url}`}</span>
							<div>
								<button
									className="btl-short-url-copy-button btl-tooltip"
									onClick={() => {
										setCopy(true);
										copyToClipboard(`${site_url}/${props.createdLink.short_url}`);
										setTimeout(() => {
											setCopy(false);
										}, 1000);
									}}
								>
									<span className="icon">
										{!copy && <img width={15} src={plugin_root_url + '/assets/images/copy-icon-1.svg'} alt="icon" />}
										{copy && <span className="dashicons dashicons-yes" />}
									</span>
								</button>
								<a href={`${site_url}/${props.createdLink.short_url}`} target="_blank" className="dashicons dashicons">
									<img width={15} src={plugin_root_url + '/assets/images/icons/target.svg'} />
								</a>
							</div>
						</div>
					)}
					<img src={plugin_root_url + '/assets/images/finish-setup.png'} alt="Setup Finish" />
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		isCreated: state.quickSetup?.isCreated,
		createdLink: state.quickSetup?.createdLink,
	};
};
const mapDispatchToProps = (dispatch) => ({
	update_quick_setup: bindActionCreators(update_quick_setup, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Finish);
