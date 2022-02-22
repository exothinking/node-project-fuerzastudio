const {Model} = require('../helpers/utils');

class Post {

    id;
    title;
    body;
    tags;

    constructor({id, title, body, tags}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tags = tags
    }
}

class PostModel extends Model {
    constructor() {
        super();
    }

    modelType = Post;

    list = [
        new this.modelType({
            id: 0,
            title: 'My First Post',
            body: 'Lorem ipsun',
            tags: [
                'First', 'Post', 'Lorem ipsun'
            ]
        }),
        new this.modelType({
            id: 1,
            title: 'My Second Post',
            body: 'Lorem ipsun',
            tags: [
                'Second', 'Post', 'Lorem ipsun'
            ]
        }),
        new this.modelType({
            id: 2,
            title: 'My Third Post',
            body: 'Lorem ipsun',
            tags: [
                'Third', 'Post', 'Lorem ipsun'
            ]
        }),
        new this.modelType({
            id: 3,
            title: 'My Fourth Post',
            body: 'Lorem ipsun',
            tags: [
                '4', 'Post', 'Lorem ipsun'
            ]
        }),
        new this.modelType({
            id: 4,
            title: 'My 5th Post',
            body: 'Lorem ipsun',
            tags: [
                '5', 'Post', 'Lorem ipsun'
            ]
        }),
        new this.modelType({
            id: 5,
            title: 'My 6th Post',
            body: 'Lorem ipsun',
            tags: [
                '6th', 'Post', 'Lorem ipsun'
            ]
        }),
        new this.modelType({
            id: 6,
            title: 'My 7th Post',
            body: 'Lorem ipsun',
            tags: [
                'Seventh', 'Post', 'Lorem ipsun'
            ]
        })
    ];
}

const PostModelSingleton = new PostModel();
module.exports = PostModelSingleton;