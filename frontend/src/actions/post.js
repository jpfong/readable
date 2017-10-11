import * as api from '../utils/api.js'

export const RECEIVE_POST = 'RECEIVE_POST'
export const VOTE_POST_DETAIL = 'VOTE_POST_DETAIL'

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = (postId) => dispatch => (
  api
    .getPost(postId)
    .then(post => dispatch(receivePost(post)))
)

export const votePost = (post) => ({
  type: VOTE_POST_DETAIL,
  post
})

export const upvotePost = (postId) => dispatch => (
  api.votePost(postId).then(post => dispatch(votePost(post)))
)

export const downVotePost = (postId) => dispatch => (
  api.downVotePost(postId).then(post => dispatch(votePost(post)))
)