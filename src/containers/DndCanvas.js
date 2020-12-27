import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from './../components/Loader'
import {
    fetch_settings_data,
    onDragEnd,
    add_new_cat,
    add_new_link,
    edit_link,
    delete_link,
} from './../redux/actions/settings.actions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CreateCategory from './../components/CreateCategory'
import Link from './../components/Link'
import CatHeader from '../components/CatHeader'
import LinkQuickAction from '../components/LinkQuickAction'

/**
 * Moves an item from one list to another list.
 */

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'white' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
})
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : '#e6e8ec',
})

function DndCanvas(props) {
    const { settings } = props.settings
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!settings) {
            props.fetch_settings_data()
            setTimeout(() => {
                setIsLoaded(true)
            }, 3000)
        } else {
            setIsLoaded(true)
        }
    }, [])

    return (
        <div className={`dnd-category-wrapper ${isLoaded ? '' : 'd-flex'}`}>
            {isLoaded ? (
                <DragDropContext onDragEnd={props.onDragEnd}>
                    {settings &&
                        Object.entries(settings).map(([ind, el]) => (
                            <Droppable key={ind} droppableId={ind}>
                                {(provided, snapshot) => (
                                    <div className='dnd-category'>
                                        <CatHeader
                                            cat_id={ind}
                                            cat_name={el.term_name}
                                            cat_slug={el.term_slug}
                                        />
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(
                                                snapshot.isDraggingOver
                                            )}
                                            {...provided.droppableProps}
                                        >
                                            <div className='category-body'>
                                                {el.lists &&
                                                    el.lists.map(
                                                        (item, index) => (
                                                            <React.Fragment
                                                                key={`cat-${ind}-item-${index}`}
                                                            >
                                                                {item.ID && (
                                                                    <Draggable
                                                                        key={`cat-${ind}-item_${item.ID}`}
                                                                        draggableId={`cat-${ind}-item_${item.ID}`}
                                                                        index={
                                                                            index
                                                                        }
                                                                    >
                                                                        {(
                                                                            provided,
                                                                            snapshot
                                                                        ) => (
                                                                            <div
                                                                                className={`btl-dnd-link ${
                                                                                    snapshot.isDragging
                                                                                        ? 'btl-dnd-link-dragging'
                                                                                        : ''
                                                                                }`}
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={getItemStyle(
                                                                                    snapshot.isDragging,
                                                                                    provided
                                                                                        .draggableProps
                                                                                        .style
                                                                                )}
                                                                            >
                                                                                <div className='btl-dnd-link-body'>
                                                                                    <h3 className='dnd-link-title'>
                                                                                        {
                                                                                            item.link_title
                                                                                        }
                                                                                    </h3>
                                                                                    <div className='btl-dnd-link-button-group'>
                                                                                        <LinkQuickAction
                                                                                            cat_id={
                                                                                                ind
                                                                                            }
                                                                                            cat_name={
                                                                                                el.term_name
                                                                                            }
                                                                                            submitLinkHandler={
                                                                                                props.edit_link
                                                                                            }
                                                                                            deleteLinkHandler={
                                                                                                props.delete_link
                                                                                            }
                                                                                            item={
                                                                                                item
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                {provided.placeholder}
                                            </div>
                                            <div className='category-footer'>
                                                <Link
                                                    cat_id={ind}
                                                    cat_name={el.term_name}
                                                    submitHandler={
                                                        props.add_new_link
                                                    }
                                                />
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
    )
}

const mapStateToProps = (state) => ({
    settings: state.settings,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
        onDragEnd: bindActionCreators(onDragEnd, dispatch),
        add_new_cat: bindActionCreators(add_new_cat, dispatch),
        add_new_link: bindActionCreators(add_new_link, dispatch),
        edit_link: bindActionCreators(edit_link, dispatch),
        delete_link: bindActionCreators(delete_link, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DndCanvas)
