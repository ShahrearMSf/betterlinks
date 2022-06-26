import { __ } from '@wordpress/i18n';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handle_link_favorite } from 'redux/actions/links.actions';

function FavoriteIcon({ handle_link_favorite, data }) {
	const [isFavorite, setIsFavorite] = useState(data.favorite?.favForAll || false);

	return (
		<>
			{betterLinksHooks.applyFilters('betterLinksIsShowFavorite', true) && (
				<div className="btl-tooltip btl-fav-link">
					<button
						className="dnd-link-button"
						onClick={() => {
							const newFavorite = !isFavorite;
							setIsFavorite(newFavorite);
							handle_link_favorite({
								ID: data.ID,
								favForAll: newFavorite,
							});
						}}
					>
						<span className={`dashicons dashicons-star-${isFavorite ? 'filled' : 'empty'}`}></span>
					</button>
					<span className="btl-tooltiptext">{__(`${isFavorite ? 'Unmark' : 'Mark'} as Favorite`, 'betterlinks')}</span>
				</div>
			)}
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		handle_link_favorite: bindActionCreators(handle_link_favorite, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(FavoriteIcon);
