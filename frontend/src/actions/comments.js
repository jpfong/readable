import * as api from '../utils/api.js'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (postId) => dispatch => (
  api
    .getPostComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
)
