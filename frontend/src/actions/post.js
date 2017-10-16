import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export const receivePost = (post) => ({
  type: actionTypes.RECEIVE_POST,
  post
})

export const fetchPost = (postId) => dispatch => (
  api
    .getPost(postId)
    .then(post => dispatch(receivePost(post)))
)

export const votePost = (post) => ({
  type: actionTypes.VOTE_POST_DETAIL,
  post
})

export const upvotePost = (postId) => dispatch => (
  api.votePost(postId).then(post => dispatch(votePost(post)))
)

export const downVotePost = (postId) => dispatch => (
  api.downVotePost(postId).then(post => dispatch(votePost(post)))
)