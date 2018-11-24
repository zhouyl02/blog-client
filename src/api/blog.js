import request from '@/helpers/request.js'

const URL = {
    LIST: '/blog',
    DETAIL: '/blog/:blogId',
    CREATE: '/blog',
    UPDATE: '/blog/:blogId',
    DELETE: '/blog/:blogId',
}

export default {
    getBlogs({page=1, userId, atIndex=true} = {page: 1, atIndex: true}){
        return request(URL.LIST, 'GET', {page, userId, atIndex})
    },
    userBlogs(userId, page=1){
        return request(URL.LIST, 'GET', {page, userId})
    },
    getDetail(blogId){
        return request(URL.DETAIL.replace(':blogId', blogId))
    },
    create({title='', content='', description='', atIndex=true}){
        return request(URL.CREATE, 'POST', {title, content, description})
    },
    update(blogId, {title, content, description, atIndex=true}){
        return request(URL.UPDATE.replace(':blogId', blogId), 'PATCH', {title, content, description, atIndex})
    },
    delete(blogId){
        return request(URL.DELETE.replace(':blogId', blogId), 'DELETE')
    }
}