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
