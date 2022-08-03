import api from './api';

export default {
    async create(data, route){
        return api.post(route, data);
    },

    async list(route, params){
        const query = new URLSearchParams(params).toString();
        const url = `${route}?` + query
        return api.get(url)
    },

    async retrieve(route){
        return api.get(route)
    },

    async update(data, route){
        return api.put(route, data)
    }
}