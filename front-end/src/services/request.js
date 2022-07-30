import api from './api';

export default {
    async create(data, route){
        return api.post(route, data);
    },

    async list(route){
        const params = new URLSearchParams({showFinished: false}).toString();
        const url = `${route}?` + params
        return api.get(url)
    },

    async retrieve(route){
        return api.get(route)
    },

    async update(data, route){
        return api.put(route, data)
    }
}