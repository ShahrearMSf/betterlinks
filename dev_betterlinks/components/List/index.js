import LinkQuickAction from 'components/LinkQuickAction';
import FavoriteIcon from 'components/FavoriteIcon';
import { plugin_root_url } from 'utils/helper';
import { useBtlExpireStatusDot } from 'utils/customHooks';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import Link from 'containers/Link';

const List = (props) => {
	const {
		catId,
		item,
		index,
		is_allow_qr,
		term_name,
		edit_link,
		delete_link,
		add_new_link,
		favouriteSort: { sortByFav },
	} = props;

	if (!item?.favorite?.favForAll && sortByFav) return;

	const expireStatusDot = useBtlExpireStatusDot({ data: item, view: 'dnd' });
	return (
		<Draggable key={`cat-${catId}-item_${item.ID}`} draggableId={`cat-${catId}-item_${item.ID}`} index={index}>
			{(provided, snapshot) => (
				<div className={`btl-dnd-link ${snapshot.isDragging ? 'btl-dnd-link-dragging' : ''}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<div className="btl-dnd-link-body">
						<h3 className="dnd-link-title">
							<span className="icon">
								<img src={plugin_root_url + 'assets/images/move-icon.svg'} alt="icon" />
							</span>
							<FavoriteIcon data={item} />
							{expireStatusDot}
							<Link catId={parseInt(catId)} catName={term_name} data={item} submitHandler={edit_link}>
								<span className="text">{item.link_title}</span>
							</Link>
						</h3>

						<div className="btl-dnd-link-button-group">
							<LinkQuickAction
								isAlowQr={is_allow_qr}
								isShowAnalytics={true}
								catId={parseInt(catId)}
								catName={term_name}
								submitLinkHandler={edit_link}
								deleteLinkHandler={delete_link}
								addNewLink={add_new_link}
								data={item}
								isShowEditLink={betterLinksHooks.applyFilters('betterLinksIsShowViewLink', true)}
								isShowDeleteLink={betterLinksHooks.applyFilters('betterLinksIsShowDeleteLink', true)}
							/>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

const mapStateToProps = (state) => ({
	favouriteSort: state.favouriteSort,
});
export default connect(mapStateToProps, null)(List);
