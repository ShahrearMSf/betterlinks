import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    fetch_settings_data,
    add_new_cat,
    add_new_link,
    delete_link,
} from './../redux/actions/settings.actions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
}
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

    function onDragEnd(result) {
        const { source, destination } = result

        // dropped outside the list
        if (!destination) {
            return
        }
        const sInd = +source.droppableId
        const dInd = +destination.droppableId

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index)
            const newState = [...state]
            newState[sInd] = items
            setState(newState)
        } else {
            const result = move(state[sInd], state[dInd], source, destination)
            const newState = [...state]
            newState[sInd] = result[sInd]
            newState[dInd] = result[dInd]

            setState(newState.filter((group) => group.length))
        }
    }

    return (
        <div>
            {console.log(settings)}
            <div style={{ display: 'flex' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {settings &&
                        Object.entries(settings).map(([ind, el]) => (
                            <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(
                                            snapshot.isDraggingOver
                                        )}
                                        {...provided.droppableProps}
                                    >
                                        {el.lists.map((item, index) => (
                                            <Draggable
                                                key={item.ID}
                                                draggableId={item.ID}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
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
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'space-around',
                                                            }}
                                                        >
                                                            {item.link_title}
                                                            <button
                                                                type='button'
                                                                onClick={() => {
                                                                    props.delete_link(
                                                                        ind,
                                                                        index
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
                    <button
                        type='button'
                        onClick={() => {
                            props.add_new_cat()
                        }}
                    >
                        Add New Category
                    </button>
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
        add_new_cat: bindActionCreators(add_new_cat, dispatch),
        add_new_link: bindActionCreators(add_new_link, dispatch),
        delete_link: bindActionCreators(delete_link, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DndCanvas)
