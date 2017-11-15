import {
  RECEIVE_COMMENT
} from '../actions/actionTypes'


export default function comment (state = {}, action) {
  if (action.type === RECEIVE_COMMENT) {
    return action.comment
  }
  return state
}