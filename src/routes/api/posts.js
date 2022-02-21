const express = require('express');
const postsController = require('../../controllers/posts');
const postsRouter = express.Router();

postsRouter.post('/posts', postsController.createPost);

postsRouter.get(
    [
        '/posts/:id', 
        '/posts'
    ], 
    postsController.listPosts
);

postsRouter.put(
    [
        '/posts/:id', 
        '/posts'
    ],
    postsController.updatePost
);

postsRouter.delete(
    [
    '/posts/:id', 
    '/posts'
    ],
    postsController.deletePost
);

module.exports = postsRouter;