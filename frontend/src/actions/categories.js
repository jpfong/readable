import * as api from '../utils/api.js'
import { RECEIVE_CATEGORIES } from './actionTypes'

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  api
    .getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
)
