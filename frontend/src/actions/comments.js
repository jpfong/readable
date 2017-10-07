import * as api from '../utils/api.js'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'

export const DELETE_COMMENT = 'DELETE_COMMENT'

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (postId) => dispatch => (
  api
    .getPostComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
)


export const updateComment = (comments) => ({
  type: UPDATE_COMMENTS,
  comments
})

export const updateComments = (comment, option) => dispatch => (
  api
    .updateComment(comment, option)
    .then(() => api.getPostComments(comment.parentId)
      .then(comments => dispatch(updateComment(comments))))
)

export const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
})

export const doDeleteComment = (comment) => dispatch => (
  api.deleteComment(comment.id)
    // .then((comment) => api.getPostComments(comment.parentId)
      .then((comment) => dispatch(deleteComment(comment)))
)