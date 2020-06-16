
const Post = require('../models/Post');

module.exports = {
  create,
  find
}

/**
 * Create new post 
 * @param {object} postData a object representing a post
 * @returns a Promise or exception  
 */
async function create(postData) {
    if(await Post.findOne({ title: postData.title })) {
        throw `Post '${postData.title}' already exists`
    }

	const newPost = new Post(postData);
	return await newPost.save(); 
}

/**
 * Find posts
 * @returns a Promise or exception  
 */
async function find() {
    return await Post.find();    
}
