import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    fetch_settings_data,
    onDragEnd,
    add_new_cat,
    add_new_link,
    delete_link,
} from './../redux/actions/settings.actions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CreateCategory from './../components/CreateCategory'

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
    padding: grid,
    margin: '10px',
    width: 250,
})

function DndCanvas(props) {
    const { settings } = props.settings

    useEffect(() => {
        props.fetch_settings_data()
    }, [])

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <DragDropContext onDragEnd={props.onDragEnd}>
                    {settings &&
                        Object.entries(settings).map(([ind, el]) => (
                            <Droppable key={ind} droppableId={ind}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(
                                            snapshot.isDraggingOver
                                        )}
                                        {...provided.droppableProps}
                                    >
                                        {el.lists &&
                                            el.lists.map((item, index) => (
                                                <Draggable
                                                    key={item.ID}
                                                    draggableId={item.ID}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
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
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    justifyContent:
                                                                        'space-around',
                                                                }}
                                                            >
                                                                {
                                                                    item.link_title
                                                                }
                                                                <button
                                                                    type='button'
                                                                    onClick={() => {
                                                                        props.delete_link(
                                                                            ind,
                                                                            item.ID
                                                                        )
                                                                    }}
                                                                >
                                                                    delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                        <button
                                            type='button'
                                            onClick={() => {
                                                props.add_new_link(ind)
                                            }}
                                        >
                                            Add new Post
                                        </button>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    <CreateCategory createCatHandler={props.add_new_cat} />
                </DragDropContext>
            </div>
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
        delete_link: bindActionCreators(delete_link, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DndCanvas)
