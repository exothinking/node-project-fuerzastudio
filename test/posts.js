//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);

describe('Posts API', () => {

    // Testing HTTP GET

    describe('/GET posts', () => {
        it((`
            Testing GET all the posts withou setting page and pageSize

            res.body should be an object,
            res.body.items should be a array,
            res.body[currentPage || pageSize] should be numbers

            res.body.currentPage should be equal default 'page' value === 1
            res.body.pageSize should be equal default 'pageSize' value === 3
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .get('/posts')
                .end((err, res) => {

                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.items.should.be.a('array');
                    res.body.currentPage.should.be.a('number');
                    res.body.pageSize.should.be.a('number');

                    res.body.currentPage.should.be.eql(1);
                    res.body.pageSize.should.be.eql(3);

                    done();
                });
        });
    });

    describe('/GET posts?page=2&pageSize=3', () => {
        it((`
            Testing GET all the posts setting page and pageSize

            res.body should be an object,
            res.body.items should be a array,
            res.body[currentPage || pageSize] should be numbers

            res.body.currentPage should be equal 'page' query string value
            res.body.pageSize should be equal 'pageSize' query string value
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .get('/posts?page=2&pageSize=3')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.items.should.be.a('array');
                    res.body.currentPage.should.be.a('number');
                    res.body.pageSize.should.be.a('number');

                    res.body.currentPage.should.be.eql(2);
                    res.body.pageSize.should.be.eql(3);
                    done();
                });
        });
    });

    describe('/GET posts?page=DDD&pageSize=false', () => {
        it((`
            Testing GET all the posts setting invalid page and pageSize

            res.body should be an object,
            res.body.items should be a array,
            res.body[currentPage || pageSize] should be numbers

            res.body.currentPage should be equal default 'page' value === 1
            res.body.pageSize should be equal default 'pageSize' value === 3
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .get('/posts?page=DDD&pageSize=false')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.items.should.be.a('array');
                    res.body.currentPage.should.be.a('number');
                    res.body.pageSize.should.be.a('number');

                    res.body.currentPage.should.be.eql(1);
                    res.body.pageSize.should.be.eql(3);
                    done();
                });
        });
    });

    describe('/GET posts/:id', () => {
        it((`
            Testing GET a post by the given id.
            
            res.body should be an object,
            res.body.items should be a array,
            res.body[currentPage || pageSize] should be numbers

            res.body.items[0] should have: id, title, body, and tags properties
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .get('/posts/2')
                .end((err, res) => {
                    
                    res.should.have.status(200);
                    
                    res.body.should.be.a('object');
                    res.body.items.should.be.a('array');
                    res.body.currentPage.should.be.a('number');
                    res.body.pageSize.should.be.a('number');

                    res.body.items[0].should.have.property('id');
                    res.body.items[0].should.have.property('title');
                    res.body.items[0].should.have.property('body');
                    res.body.items[0].should.have.property('tags');

                    done();
                });
        });
    });

    // Testing HTTP POST

    describe('/POST posts', () => {
        it((`
            Testing Create a post without sending correct data.

            It should return a 400 'Bad request'.
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .post('/posts')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/POST posts', () => {
        it((`
            Testing Create a post with correct data.

            {
                title: "My new post",
                body: "My post body",
                tags: ['1', 'Secondo', 'Testing!']
            }

            res.body should be a PostType object
            res.body should have: id, title, body, and tags properties
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .post('/posts')
                .send({
                    title: "My new post",
                    body: "My post body",
                    tags: ['1', 'Secondo', 'Testing!']
                })
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('body');
                    res.body.should.have.property('tags');

                    done();
                });
        });
    });

    // Testing HTTP PUT

    describe('/PUT posts', () => {
        it((`
            Testing update a post without sending post id

            It should return a 404 'Not found'.
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .put('/posts')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/PUT posts/:id', () => {
        it((`
            Testing update a post with correct data.

            {
                title: "My altered post",
                body: "My altered post body",
                tags: ['2', 'Second', 'Testing!']
            }

            res.body should be a PostType object
            res.body should have: id, title, body, and tags properties
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .put('/posts/2')
                .send({
                    title: "My altered post",
                    body: "My altered post body",
                    tags: ['2', 'Second', 'Testing!']
                })
                .end((err, res) => {
                    res.should.have.status(200);

                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('body');
                    res.body.should.have.property('tags');

                    done();
                });
        });
    });

    // Testing HTTP DELETE

    describe('/DELETE posts', () => {
        it((`
            Testing delete a post without sending post id

            It should return a 404 'Not found'.
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .delete('/posts')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/DELETE posts/:id', () => {
        it((`
            Testing delete a post with an existing ID.

            It should return a 200 'Ok'.
        `), 
        (done) => {
            chai.request('localhost:3000/api')
                .delete('/posts/2')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});