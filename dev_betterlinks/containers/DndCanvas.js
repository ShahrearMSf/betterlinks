import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/Loader';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from 'redux/actions/links.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateCategory from 'components/CreateCategory';
import Link from 'containers/Link';
import CatHeader from 'containers/CatHeader';
import LinkQuickAction from 'components/LinkQuickAction';
import FavoriteIcon from 'components/FavoriteIcon';
import { plugin_root_url } from 'utils/helper';
import { useBtlExpireStatusDot } from 'utils/customHooks';

export class List extends React.Component {
	render() {
		const { catId, item, index, is_allow_qr, term_name, edit_link, delete_link } = this.props;

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
								<span className="text" dangerouslySetInnerHTML={{ __html: item.link_title }}></span>
							</h3>

							<div className="btl-dnd-link-button-group">
								<LinkQuickAction
									isAlowQr={is_allow_qr}
									isShowAnalytics={true}
									catId={parseInt(catId)}
									catName={term_name}
									submitLinkHandler={edit_link}
									deleteLinkHandler={delete_link}
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
	}
}

class InnerList extends React.Component {
	shouldComponentUpdate(nextProps) {
		if (nextProps.lists === this.props.lists) {
			return false;
		}
		return true;
	}
	render() {
		return this.props.lists.map(
			(list, index) =>
				!!list.link_title && (
					<List
						is_allow_qr={this.props.settings && this.props.settings.is_allow_qr}
						edit_link={this.props.edit_link}
						delete_link={this.props.delete_link}
						catId={this.props.catId}
						key={`cat-${this.props.catId}-item-${index}`}
						item={list}
						index={index}
					/>
				)
		);
	}
}

class CatWrap extends React.PureComponent {
	render() {
		const { ind, el, provided, props } = this.props;
		const { sortByFav } = props.favouriteSort;
		const getFavSortedList = (lists) => {
			return sortByFav
				? lists.filter((list) => {
						if (list?.favorite?.favForAll) return true;
				  })
				: lists;
		};
		const lists = getFavSortedList(el.lists);

		if (lists.length <= 0 && sortByFav) return <div ref={provided.innerRef} />;
		return (
			<div className="dnd-category">
				<CatHeader catId={parseInt(ind)} catName={el.term_name} catSlug={el.term_slug} />
				<div ref={provided.innerRef} className="dnd-category-body-wrap" {...provided.droppableProps}>
					<div className="category-body">
						<InnerList settings={props.settings.settings} edit_link={props.edit_link} delete_link={props.delete_link} catId={ind} lists={lists} />
						{provided.placeholder}
					</div>
					<div className="category-footer">
						{betterLinksHooks.applyFilters('betterLinksIsShowWriteLink', true) && <Link catId={parseInt(ind)} catName={el.term_name} submitHandler={props.add_new_link} />}
					</div>
				</div>
			</div>
		);
	}
}

function DndCanvas(props) {
	const { links } = props.links;
	const { settings } = props.settings;
	const { terms } = props.terms;

	useEffect(() => {
		if (!settings) {
			props.fetch_settings_data();
		}
		if (!links) {
			props.fetch_links_data();
		}
		if (!terms) {
			props.fetch_terms_data();
		}
	}, []);

	return (
		<div className={`dnd-category-wrapper ${links ? '' : 'd-flex'}`}>
			{links && settings && terms ? (
				<DragDropContext onDragEnd={props.onDragEnd}>
					{links &&
						Object.entries(links)
							.filter((items) => {
								if (items[1].lists.length === 0 && items[1].term_slug === 'uncategorized') {
									return false;
								}
								return true;
							})
							.map(([ind, el]) => (
								<Droppable key={ind} droppableId={ind}>
									{(provided, snapshot) => <CatWrap ind={ind} el={el} provided={provided} snapshot={snapshot} props={props} />}
								</Droppable>
							))}
					{betterLinksHooks.applyFilters('betterLinksIsShowWriteCat', true) && <CreateCategory createCatHandler={props.add_new_cat} />}
				</DragDropContext>
			) : (
				<Loader />
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	links: state.links,
	settings: state.settings,
	terms: state.terms,
	favouriteSort: state.favouriteSort,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
		onDragEnd: bindActionCreators(onDragEnd, dispatch),
		add_new_cat: bindActionCreators(add_new_cat, dispatch),
		add_new_link: bindActionCreators(add_new_link, dispatch),
		edit_link: bindActionCreators(edit_link, dispatch),
		delete_link: bindActionCreators(delete_link, dispatch),
		fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DndCanvas);
