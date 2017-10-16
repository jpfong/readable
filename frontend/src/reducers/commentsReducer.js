import {
  RECEIVE_COMMENTS,
  UPDATE_COMMENTS,
  DELETE_COMMENT,
  ADD_COMMENT
} from '../actions/actionTypes'

export default function comments (state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return action.comments
    case UPDATE_COMMENTS :
      return action.comments
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.comment.id)
    case ADD_COMMENT:
      return [...state, action.comment]
    default :
      return state
  }
}