import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/Loader';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from 'redux/actions/links.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateCategory from 'components/CreateCategory';
import Link from 'containers/Link';
import CatHeader from 'containers/CatHeader';
import LinkQuickAction from 'components/LinkQuickAction';
import { plugin_root_url } from 'utils/helper';

export class List extends React.Component {
	render() {
		return (
			<Draggable key={`cat-${this.props.catId}-item_${this.props.item.ID}`} draggableId={`cat-${this.props.catId}-item_${this.props.item.ID}`} index={this.props.index}>
				{(provided, snapshot) => (
					<div className={`btl-dnd-link ${snapshot.isDragging ? 'btl-dnd-link-dragging' : ''}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<div className="btl-dnd-link-body">
							<h3 className="dnd-link-title">
								<span className="icon">
									<img src={plugin_root_url + 'assets/images/move-icon.svg'} alt="icon" />
								</span>
								<span className="text" dangerouslySetInnerHTML={{ __html: this.props.item.link_title }}></span>
							</h3>
							<div className="btl-dnd-link-button-group">
								<LinkQuickAction
									isAlowQr={this.props.is_allow_qr}
									isShowAnalytics={true}
									catId={parseInt(this.props.catId)}
									catName={this.props.term_name}
									submitLinkHandler={this.props.edit_link}
									deleteLinkHandler={this.props.delete_link}
									data={this.props.item}
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
		return (
			<div className="dnd-category">
				<CatHeader catId={parseInt(ind)} catName={el.term_name} catSlug={el.term_slug} />
				<div ref={provided.innerRef} className="dnd-category-body-wrap" {...provided.droppableProps}>
					<div className="category-body">
						<InnerList settings={props.settings.settings} edit_link={props.edit_link} delete_link={props.delete_link} catId={ind} lists={el.lists} />
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

	useEffect(() => {
		if (!settings) {
			props.fetch_settings_data().then(() => {
				if (!links) {
					props.fetch_links_data();
				}
			});
		} else {
			if (!links) {
				props.fetch_links_data();
			}
		}
	}, []);

	return (
		<div className={`dnd-category-wrapper ${links ? '' : 'd-flex'}`}>
			{links ? (
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DndCanvas);
