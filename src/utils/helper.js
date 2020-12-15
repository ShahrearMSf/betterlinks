import axios from 'axios'

export const {
    nonce,
    rest_url,
    namespace,
    plugin_root_url,
    plugin_root_path,
} = window.betterLinksGlobal

export const API = axios.create({
    baseURL: rest_url,
    headers: {
        'content-type': 'application/json',
        'X-WP-Nonce': nonce,
    },
})
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}
export const move = (
    source,
    destination,
    droppableSource,
    droppableDestination
) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
}

export const generateSlug = (value) => {
    return value
        .toLowerCase()
        .replace(/-+/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
}

export const generateRandomSlug = (length = 3) => {
    return (
        Math.random().toString(20).substr(2, length) +
        new Date().getMilliseconds()
    )
}

export const modalCustomStyles = {
    overlay: {
        background: 'rgba(35, 40, 45, 0.62)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}
