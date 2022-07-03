import api from './api';

export default {
    async create(data, route){
        return api.post(route, data);
    }
}