import {
  RECEIVE_POST,
  VOTE_POST_DETAIL,
  UPDATE_POST
} from '../actions/actionTypes'

export default function post (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST :
      return action.post
    case VOTE_POST_DETAIL:
      return action.post
    case UPDATE_POST:
      return action.post
    default :
      return state
  }
}