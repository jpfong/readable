import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export const receiveComment = (comment) => ({
  type: actionTypes.RECEIVE_COMMENT,
  comment
})

export const fetchComment = (commentId) => dispatch => (
  api
    .getComment(commentId)
    .then(comment => dispatch(receiveComment(comment)))
)