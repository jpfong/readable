import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export const receiveComments = (comments) => ({
  type: actionTypes.RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (postId) => dispatch => (
  api
    .getPostComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
)

export const updateComment = (comments) => ({
  type: actionTypes.UPDATE_COMMENTS,
  comments
})

export const updateComments = (comment, option) => dispatch => (
  api.updateComment(comment, option)
    .then(() => api.getPostComments(comment.parentId)
      .then(comments => dispatch(updateComment(comments))))
)

export const deleteComment = (comment) => ({
  type: actionTypes.DELETE_COMMENT,
  comment
})

export const doDeleteComment = (comment) => dispatch => (
  api.deleteComment(comment.id)
      .then((comment) => dispatch(deleteComment(comment)))
)

export const addComment = (data) => dispatch => (
  api.createComment(data).then((comment) => api.getPostComments(comment.parentId)
    .then(comments => dispatch(updateComment(comments))))
)

export const updateCommentBody = (comment) => dispatch => (
  api.updateCommentBody(comment).then((comment) =>
    api.getPostComments(comment.parentId)
      .then((comments) => dispatch(receiveComments(comments))))
)
