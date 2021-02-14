import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from './../../components/Loader';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from './../../redux/actions/links.actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateCategory from './../../components/CreateCategory';
import Link from './../../components/Link';
import CatHeader from './../../components/CatHeader';
import LinkQuickAction from './../../components/LinkQuickAction';
import { plugin_root_url } from './../../utils/helper';

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : '',
});

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
									isShowAnalytics={true}
									catId={parseInt(this.props.catId)}
									catName={this.props.term_name}
									submitLinkHandler={this.props.edit_link}
									deleteLinkHandler={this.props.delete_link}
									data={this.props.item}
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
		return this.props.lists.map((list, index) => (
			<List
				edit_link={this.props.edit_link}
				delete_link={this.props.delete_link}
				catId={this.props.catId}
				key={`cat-${this.props.catId}-item-${index}`}
				item={list}
				index={index}
			/>
		));
	}
}

// {el.lists &&
// 	el.lists.map((item, index) => (
// 		<React.Fragment key={`cat-${ind}-item-${index}`}>
// 			{item.ID && (
// 				<Draggable key={`cat-${ind}-item_${item.ID}`} draggableId={`cat-${ind}-item_${item.ID}`} index={index}>
// 					{(provided, snapshot) => (
// 						<div
// 							className={`btl-dnd-link ${snapshot.isDragging ? 'btl-dnd-link-dragging' : ''}`}
// 							ref={provided.innerRef}
// 							{...provided.draggableProps}
// 							{...provided.dragHandleProps}
// 						>
// 							<div className="btl-dnd-link-body">
// 								<h3 className="dnd-link-title">
// 									<span className="icon">
// 										<img src={plugin_root_url + 'assets/images/move-icon.svg'} alt="icon" />
// 									</span>
// 									<span className="text" dangerouslySetInnerHTML={{ __html: item.link_title }}></span>
// 								</h3>
// 								<div className="btl-dnd-link-button-group">
// 									<LinkQuickAction
// 										isShowAnalytics={true}
// 										catId={parseInt(ind)}
// 										catName={el.term_name}
// 										submitLinkHandler={props.edit_link}
// 										deleteLinkHandler={props.delete_link}
// 										data={item}
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</Draggable>
// 			)}
// 		</React.Fragment>
// 	))}

function DndCanvas(props) {
	const { links } = props.links;

	useEffect(() => {
		if (!links) {
			props.fetch_links_data();
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
									{(provided, snapshot) => (
										<div className="dnd-category">
											<CatHeader catId={ind} catName={el.term_name} cat_slug={el.term_slug} />
											<div ref={provided.innerRef} className="dnd-category-body-wrap" style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
												<div className="category-body">
													<InnerList edit_link={props.edit_link} delete_link={props.delete_link} catId={ind} lists={el.lists} />
													{provided.placeholder}
												</div>
												<div className="category-footer">
													<Link catId={parseInt(ind)} catName={el.term_name} submitHandler={props.add_new_link} />
												</div>
											</div>
										</div>
									)}
								</Droppable>
							))}
					<CreateCategory createCatHandler={props.add_new_cat} />
				</DragDropContext>
			) : (
				<Loader />
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	links: state.links,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
		onDragEnd: bindActionCreators(onDragEnd, dispatch),
		add_new_cat: bindActionCreators(add_new_cat, dispatch),
		add_new_link: bindActionCreators(add_new_link, dispatch),
		edit_link: bindActionCreators(edit_link, dispatch),
		delete_link: bindActionCreators(delete_link, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DndCanvas);
