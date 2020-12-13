import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import EditLink from './../components/EditLink'
import CreateLink from './../components/CreateLink'

/**
 * Moves an item from one list to another list.
 */

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
})
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
})

function DndCanvas(props) {
    const { settings } = props.settings

    useEffect(() => {
        props.fetch_settings_data()
    }, [])

    return (
        <div className='dnd-category-wrapper'>
            <DragDropContext onDragEnd={props.onDragEnd}>
                {settings &&
                    Object.entries(settings).map(([ind, el]) => (
                        <Droppable key={ind} droppableId={ind}>
                            {(provided, snapshot) => (
                                <div
                                    className='dnd-category'
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                    {...provided.droppableProps}
                                >
                                    <div className='category-head'>
                                        <h4>{el.term_name}</h4>
                                    </div>
                                    <div className='category-body'>
                                        {el.lists &&
                                            el.lists.map((item, index) => (
                                                <Draggable
                                                    key={item.ID}
                                                    draggableId={item.ID}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className='btl-dnd-link'
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
                                                                <h3>
                                                                    <span className='icon'>
                                                                        <i className='btl btl-move'></i>
                                                                    </span>
                                                                    {
                                                                        item.link_title
                                                                    }
                                                                </h3>
                                                                <div className='btl-dnd-link-button-group'>
                                                                    <button className='dnd-link-button'>
                                                                        <span className='icon'>
                                                                            <i className='btl btl-target'></i>
                                                                        </span>
                                                                    </button>
                                                                    <button className='dnd-link-button'>
                                                                        <span className='icon'>
                                                                            <i className='btl btl-reload'></i>
                                                                        </span>
                                                                    </button>
                                                                    <button className='dnd-link-button'>
                                                                        <span className='icon'>
                                                                            <i className='btl btl-link'></i>
                                                                        </span>
                                                                    </button>
                                                                    <EditLink
                                                                        item={
                                                                            item
                                                                        }
                                                                        className='dnd-link-button'
                                                                        editLinkHandler={
                                                                            props.edit_link
                                                                        }
                                                                    />
                                                                    <button
                                                                        type='button'
                                                                        className='dnd-link-button'
                                                                        onClick={() => {
                                                                            props.delete_link(
                                                                                ind,
                                                                                item.ID
                                                                            )
                                                                        }}
                                                                    >
                                                                        <span className='icon'>
                                                                            <i className='btl btl-delete'></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                    <div className='category-footer'>
                                        <CreateLink
                                            term_id={ind}
                                            {...el}
                                            createLinkHandler={
                                                props.add_new_link
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                <CreateCategory createCatHandler={props.add_new_cat} />
            </DragDropContext>
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
