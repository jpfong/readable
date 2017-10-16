import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORY_POSTS,
  DELETE_POST,
  SORT_POSTS,
  VOTE_POST,
  CREATE_POST
} from '../actions/actionTypes'


export default function posts (state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts
    case RECEIVE_CATEGORY_POSTS:
      return action.posts
    case DELETE_POST:
      return state.filter(post => post.id !== action.deletedPost.id)
    case SORT_POSTS:
      if (action.sort === 'date') {
        return action.posts.sort((a, b) => b.timestamp - a.timestamp)
      }
      // score
      return action.posts.sort((a, b) => a.voteScore - b.voteScore)
    case VOTE_POST:
      return action.posts
    case CREATE_POST:
      return action.posts
    default :
      return state
  }
}
