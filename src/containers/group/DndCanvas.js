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
import { site_url } from './../../utils/helper';

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : '',
});

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
													{el.lists &&
														el.lists.map((item, index) => (
															<React.Fragment key={`cat-${ind}-item-${index}`}>
																{item.ID && (
																	<Draggable key={`cat-${ind}-item_${item.ID}`} draggableId={`cat-${ind}-item_${item.ID}`} index={index}>
																		{(provided, snapshot) => (
																			<div
																				className={`btl-dnd-link ${snapshot.isDragging ? 'btl-dnd-link-dragging' : ''}`}
																				ref={provided.innerRef}
																				{...provided.draggableProps}
																				{...provided.dragHandleProps}
																			>
																				<div className="btl-dnd-link-body">
																					<h3 className="dnd-link-title">
																						<span className="icon">
																							<svg width="8px" viewBox="0 0 23 42" version="1.1">
																								<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
																									<g id="drag-dots" fill="#C5C5C5" fillRule="nonzero">
																										<path
																											d="M4,0 C1.79947933,0 0,1.79947933 0,4 C0,6.20052067 1.79947933,8 4,8 C6.20052067,8 8,6.20052067 8,4 C8,1.79947933 6.20052067,0 4,0 Z M4,17 C1.79947933,17 0,18.7994793 0,21 C0,23.2005207 1.79947933,25 4,25 C6.20052067,25 8,23.2005207 8,21 C8,18.7994793 6.20052067,17 4,17 Z M4,34 C1.79947933,34 0,35.7994793 0,38 C0,40.2005207 1.79947933,42 4,42 C6.20052067,42 8,40.2005207 8,38 C8,35.7994793 6.20052067,34 4,34 Z M19,0 C16.7994793,0 15,1.79947933 15,4 C15,6.20052067 16.7994793,8 19,8 C21.2005207,8 23,6.20052067 23,4 C23,1.79947933 21.2005207,0 19,0 Z M19,17 C16.7994793,17 15,18.7994793 15,21 C15,23.2005207 16.7994793,25 19,25 C21.2005207,25 23,23.2005207 23,21 C23,18.7994793 21.2005207,17 19,17 Z M19,34 C16.7994793,34 15,35.7994793 15,38 C15,40.2005207 16.7994793,42 19,42 C21.2005207,42 23,40.2005207 23,38 C23,35.7994793 21.2005207,34 19,34 Z"
																											id="Shape"
																										></path>
																									</g>
																								</g>
																							</svg>
																						</span>
																						<span className="text" dangerouslySetInnerHTML={{ __html: item.link_title }}></span>
																					</h3>
																					<div className="btl-dnd-link-button-group">
																						<LinkQuickAction
																							isShowAnalytics={true}
																							catId={parseInt(ind)}
																							catName={el.term_name}
																							submitLinkHandler={props.edit_link}
																							deleteLinkHandler={props.delete_link}
																							data={item}
																						/>
																					</div>
																				</div>
																			</div>
																		)}
																	</Draggable>
																)}
															</React.Fragment>
														))}
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
