import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export const receivePosts = (posts) => ({
  type: actionTypes.RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  api
    .getPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const receiveCategoryPosts = (posts) => ({
  type: actionTypes.RECEIVE_CATEGORY_POSTS,
  posts
})

export const fetchCategoryPosts = (category) => dispatch => (
  api
    .getCategoryPosts(category)
    .then(posts => dispatch(receiveCategoryPosts(posts)))
)

export const deletedPost = (deletedPost) => ({
  type: actionTypes.DELETE_POST,
  deletedPost
})

export const deletePost = (postId) => dispatch => (
  api.deletePost(postId).then(post => dispatch(deletedPost(post)))
)

export const sortedPosts = (posts, sort) => ({
  type: actionTypes.SORT_POSTS,
  posts,
  sort
})

export const sortPosts = (sort) => dispatch => (
  api
    .getPosts()
    .then(posts => dispatch(sortedPosts(posts, sort)))
)

export const votedPost = (posts) => ({
  type: actionTypes.VOTE_POST,
  posts
})

export const votePost = (post) => dispatch => (
  api.votePost(post.id)
    .then(() => api.getPosts()
      .then(posts => dispatch(votedPost(posts))))
)

export const downVotePost = (post) => dispatch => (
  api.downVotePost(post.id)
    .then(() => api.getPosts()
      .then(posts => dispatch(votedPost(posts))))
)

export const createdPost = (posts) => ({
  type: actionTypes.CREATE_POST,
  posts
})

export const createPost = (data) => dispatch => (
  api.createPost(data).then(() => api.getPosts()
    .then(posts => dispatch(createdPost(posts))))
)