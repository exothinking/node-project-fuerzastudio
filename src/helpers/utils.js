module.exports.appUrl = '/api';
module.exports.Model = class Model {
    constructor() { }

    validString(str) {
        return typeof str === 'string'
    }

    validTags(tags) {
        if(!Array.isArray(tags)) {
            return false;
        }
        for(var i = 0; i < tags.length; i++) {
            if(!this.validString(tags[i])) {
                return false;
            }
        }
        return true;
    }

    validPage(page) {
        return typeof page === 'number' && page > 0;
    }

    get(id, page = 1, pageSize = 3) {
        if(id) 
            return {
                items: this.list.find(item => item.id == id),
                currentPage: page,
                pageSize: pageSize
            }
        else {
            if(!this.validPage(Number(page))) {
                page = 0;
            }
            else {
                page = Number(page) - 1;
            }

            if(!this.validPage(Number(pageSize))) {
                pageSize = 3;
            }
            else {
                pageSize = Number(pageSize);
            }

            return {
                items: this.list.slice(page * pageSize, (page * pageSize) + pageSize),
                currentPage: page + 1,
                pageSize: pageSize
            };
        }
    }

    create(attr) {

        if(
            !this.validString(attr?.title) || 
            !this.validString(attr?.body) || 
            (attr?.tags && !this.validTags(attr?.tags))
        ) {
            return false;
        }

        if(!attr?.tags) {
            attr.tags = [];
        }

        const id = this.list.push(new this.modelType({id: this.list.length, ...attr})) -1;
        return id;
    }

    update(id, {title, body, tags}) {
        if(!this.list[id]) {
            return 404;
        }
        if(title) {
            if(!this.validString(title)) {
                return 400;
            }
            this.list[id].title = title;
        }
        if(body) {
            if(!this.validString(body)) {
                return 400;
            }
            this.list[id].body = body;
        }
        if(tags) {
            if(!this.validTags(tags)) {
                return 400;
            }
            this.list[id].tags = tags;
        }
        return this.list[id];
    }

    delete(id) {
        if(!this.list[id]) {
            return 404;
        }
        else {
            this.list.splice(id, 1);
            return true;
        }
    }
};