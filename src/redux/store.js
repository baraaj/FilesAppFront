import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Define the initial state of the store
const initialState = {
  userName: '',
};

// Define reducer function to handle actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
