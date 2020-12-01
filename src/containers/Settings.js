import React from 'react'
import { API, namespace } from '../utils/helper'
import DndCanvas from './DndCanvas'
const load = () => {
    API.get(namespace + 'links', []).then(function (response) {
        console.log(response)
    })
}
const Settings = () => {
    return (
        <div className='wrap'>
            <DndCanvas />
        </div>
    )
}
export default Settings
