const PostModelSingleton = require('../models/post');
const {validItemsResponse, validId, validPage, validString, validTags} = require('../helpers/utils');

module.exports = postsController = {
    listPosts: (req, res) => {

        let id = req.params.id;
        let page = req.query.page;
        let pageSize = req.query.pageSize;
        let items = [];

        if(!validPage(Number(page))) {
            page = 0;
        }
        else {
            page = Number(page) - 1;
        }

        if(!validPage(Number(pageSize))) {
            pageSize = 3;
        }
        else {
            pageSize = Number(pageSize);
        }

        if(validId(id)) {
            items = PostModelSingleton.get(id);
        }
        else {
            items = PostModelSingleton.get(null, page, pageSize);
        }

        if(validItemsResponse(items)) {
            return res.json({
                items: items,
                currentPage: page + 1,
                pageSize: pageSize
            });
        }
        else {
            return res.sendStatus(404);
        }
    },
    createPost: (req, res) => {

        let attr = req.body;

        if(
            !validString(attr?.title) || 
            !validString(attr?.body) || 
            (attr?.tags && !validTags(attr?.tags))
        ) {
            return res.sendStatus(400);
        }

        if(!attr?.tags) {
            attr.tags = [];
        }

        const myNewPost = PostModelSingleton.create(attr);

        return res.json(myNewPost);
    },
    updatePost: (req, res) => {

        let {title, body, tags} = req.body;
        let id = req.params.id;

        if(!validId(id)) {
            return res.sendStatus(404);
        }
        if(title) {
            if(!validString(title)) {
                return res.sendStatus(400);
            }
        }
        if(body) {
            if(!validString(body)) {
                return res.sendStatus(400);
            }
        }
        if(tags) {
            if(!validTags(tags)) {
                return res.sendStatus(400);
            }
        }

        const myUpdatedPost = PostModelSingleton.update(id, {title, body, tags});
        if(myUpdatedPost) {
            return res.json(myUpdatedPost);
        }
        else {
            return res.sendStatus(404);
        }
    },
    deletePost: (req, res) => {

        let id = req.params.id
        
        if(!validId(id)) {
            return res.sendStatus(404);
        }

        const deleted = PostModelSingleton.delete(id);

        if(deleted) {
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(404);
        }
    }
};