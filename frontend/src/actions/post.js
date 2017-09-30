import * as api from '../utils/api.js'

export const RECEIVE_POST = 'RECEIVE_POST'

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = (postId) => dispatch => (
  api
    .getPost(postId)
    .then(post => dispatch(receivePost(post)))
)
