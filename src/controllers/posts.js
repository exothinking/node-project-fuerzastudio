const PostModelSingleton = require('../models/post');

function notEmpty(res) {
    if(!res && res != [] && res !== 0) {
        return false
    }
    return res;
}

function validId(id) {
    if(!id && id !== 0) {
        return false
    }
    return true;
}

module.exports = postsController = {
    listPosts: (req, res) => {
        return res.json(notEmpty(PostModelSingleton.get(req.params.id, req.query.page, req.query.pageSize)) || res.sendStatus(404));
    },
    createPost: (req, res) => {
        const id = PostModelSingleton.create(req.body);
        if(validId(id)) {
            return res.json(PostModelSingleton.get(id));
        }
        else {
            return res.sendStatus(400);
        }
    },
    updatePost: (req, res) => {
        const response = PostModelSingleton.update(req.params.id, req.body);
        if(typeof response === 'number') {
            return res.sendStatus(response);
        }
        else {
            return res.json(response);
        }
    },
    deletePost: (req, res) => {
        const response = PostModelSingleton.delete(req.params.id);
        if(typeof response === 'number') {
            return res.sendStatus(response);
        }
        else {
            return res.sendStatus(200);
        }
    }
};