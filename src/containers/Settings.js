import React from 'react'
import { API, namespace } from '../utils/helper'
const load = () => {
    API.get(namespace + 'links', []).then(function (response) {
        console.log(response)
    })
}
const Settings = () => {
    return (
        <div className='wrap'>
            hello <button onClick={() => load()}>Load Api</button>
        </div>
    )
}
export default Settings
