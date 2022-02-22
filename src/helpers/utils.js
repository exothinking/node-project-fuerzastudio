module.exports.appUrl = '/api';
module.exports.validItemsResponse = function validItemsResponse(res) {
    if(!res && res != []) {
        return false;
    }
    return true;
}
module.exports.validId = function validId(id) {
    if(!id && id !== 0) {
        return false;
    }
    return true;
}
module.exports.validPage = function validPage(page) {
    return typeof page === 'number' && page > 0;
}

function validString(str) {
    return typeof str === 'string'
}
module.exports.validString = validString;

module.exports.validTags = function validTags(tags) {
    if(!Array.isArray(tags)) {
        return false;
    }
    for(var i = 0; i < tags.length; i++) {
        if(!validString(tags[i])) {
            return false;
        }
    }
    return true;
}
module.exports.Model = class Model {
    constructor() { }

    validPageForSlice(page) {
        return typeof page === 'number' && page >= 0;
    }

    get(id, page, pageSize) {
        if(this.validPageForSlice(page) && this.validPageForSlice(pageSize)) {
            return this.list.slice(page * pageSize, (page * pageSize) + pageSize) || [];
        }
        else {
            let found = this.list.find(item => item.id == id);
            return found ? [found] : [];
        }
    }

    create(attr) {
        const id = this.list.push(new this.modelType({id: this.list.length, ...attr})) -1;
        return this.list[id];
    }

    update(id, {title, body, tags}) {
        if(!this.list[id]) {
            return false;
        }
        if(title) {
            this.list[id].title = title;
        }
        if(body) {
            this.list[id].body = body;
        }
        if(tags) {
            this.list[id].tags = tags;
        }
        return this.list[id];
    }

    delete(id) {
        if(!this.list[id]) {
            return false;
        }
        else {
            this.list.splice(id, 1);
            return true;
        }
    }
};