import { __ } from '@wordpress/i18n';
import { useContext, useEffect, useState } from 'react';
import { copyToClipboard, plugin_root_url, site_url } from 'utils/helper';
import { SetupContext } from 'index';
import { connect } from 'react-redux';
import { update_quick_setup } from 'redux/actions/quick-setup.actions';
import { bindActionCreators } from 'redux';

const Finish = (props) => {
	const [copy, setCopy] = useState(false);
	useEffect(() => {
		props.update_quick_setup({ isCreated: false, duplicateLink: false });
		const confetti = document.getElementById('confetti');
		if (props.createdLink && Object.keys(props.createdLink).length) {
			// confetti
			let flakes = '',
				randomColor;
			for (let i = 0, len = 400; i < len; i++) {
				randomColor = Math.floor(Math.random() * 16777215).toString(16);
				flakes += '<div class="ball" style="background: #' + randomColor;
				flakes += '; animation-duration: ' + 3 + 's; animation-delay: ';
				flakes += Math.random() * 2 + 0 + 's;"></div>';
			}
			confetti.innerHTML = flakes;
			let clearConfetti = setTimeout(() => {
				confetti.innerHTML = '';
				clearTimeout(clearConfetti);
			}, 10000);
		}
	}, []);

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
