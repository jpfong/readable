import * as api from '../utils/api.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const CREATE_POST = 'CREATE_POST'

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  api
    .getPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const receiveCategoryPosts = (posts) => ({
  type: RECEIVE_CATEGORY_POSTS,
  posts
})

export const fetchCategoryPosts = (category) => dispatch => (
  api
    .getCategoryPosts(category)
    .then(posts => dispatch(receiveCategoryPosts(posts)))
)

export const deletedPost = (deletedPost) => ({
  type: DELETE_POST,
  deletedPost
})

export const deletePost = (postId) => dispatch => (
  api.deletePost(postId).then(post => dispatch(deletedPost(post)))
)

export const sortedPosts = (posts, sort) => ({
  type: SORT_POSTS,
  posts,
  sort
})

export const sortPosts = (sort) => dispatch => (
  api
    .getPosts()
    .then(posts => dispatch(sortedPosts(posts, sort)))
)

export const votedPost = (posts) => ({
  type: VOTE_POST,
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
  type: CREATE_POST,
  posts
})

export const createPost = (data) => dispatch => (
  api.createPost(data).then(() => api.getPosts()
    .then(posts => dispatch(createdPost(posts))))
)