import { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/Loader';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from 'redux/actions/links.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CreateCategory from 'components/CreateCategory';
import Link from 'containers/Link';
import CatHeader from 'containers/CatHeader';
import List from 'components/List';
import { isListEmpty, getFavoriteLinkCount } from 'utils/helper';
import { __ } from '@wordpress/i18n';
class InnerList extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.lists !== this.props.lists;
	}
	render() {
		const { lists, settings, edit_link, delete_link, catId } = this.props;
		return lists.map(
			(list, index) =>
				!!list.link_title && (
					<List
						is_allow_qr={settings && settings.is_allow_qr}
						edit_link={edit_link}
						delete_link={delete_link}
						catId={catId}
						key={`cat-${catId}-item-${index}`}
						item={list}
						index={index}
					/>
				)
		);
	}
}

const CatWrap = memo(({ ind, el, provided, props }) => {
	const { sortByFav } = props.favouriteSort;
	const { lists } = el;
	const isEmpty = isListEmpty(lists, sortByFav);

	if (isEmpty && sortByFav)
		return (
			<div className="dnd-category" style={{ display: 'none' }}>
				<div ref={provided.innerRef} />
			</div>
		);

	return (
		<div className="dnd-category">
			<CatHeader catId={parseInt(ind)} catName={el.term_name} catSlug={el.term_slug} />
			<div ref={provided.innerRef} className="dnd-category-body-wrap" {...provided.droppableProps}>
				<div className="category-body">
					<InnerList settings={props.settings.settings} edit_link={props.edit_link} delete_link={props.delete_link} catId={ind} lists={lists} />
					{provided.placeholder}
				</div>
				<div className="category-footer">
					{betterLinksHooks.applyFilters('betterLinksIsShowWriteLink', true) && !sortByFav && (
						<Link catId={parseInt(ind)} catName={el.term_name} submitHandler={props.add_new_link} />
					)}
				</div>
			</div>
		</div>
	);
});

function DndCanvas(props) {
	const { links } = props.links;
	const { settings } = props.settings;
	const { terms } = props.terms;
	const { sortByFav } = props.favouriteSort;

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

	// if sort by favorite is selected and there is no favorite link
	if (getFavoriteLinkCount(links) === 0 && sortByFav)
		return (
			<div className="dnd-not-found">
				<div style={{ padding: 24 }}>{__('There are no records to display', 'betterlinks')}</div>
			</div>
		);

	return (
		<>
			{links && settings && terms ? (
				<div className={`dnd-category-wrapper ${links ? '' : 'd-flex'}`}>
					<DragDropContext onDragEnd={props.onDragEnd}>
						{links &&
							Object.entries(links)
								.filter((items) => !(items[1].lists.length === 0 && items[1].term_slug === 'uncategorized'))
								.map(([ind, el]) => (
									<Droppable key={ind} droppableId={ind}>
										{(provided, snapshot) => <CatWrap ind={ind} el={el} provided={provided} snapshot={snapshot} props={props} />}
									</Droppable>
								))}
						{betterLinksHooks.applyFilters('betterLinksIsShowWriteCat', true) && !sortByFav && <CreateCategory createCatHandler={props.add_new_cat} />}
					</DragDropContext>
				</div>
			) : (
				<Loader />
			)}
		</>
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
