import * as api from '../utils/api.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'

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