import {combineReducers} from 'redux';
import userSlice from './reducers/userSlice';
import followingSlice from './reducers/followingSlice';
import likeSlice from './reducers/likeSlice';
import commentSlice from './reducers/commentSlice'

const rootReducer = combineReducers({
  user: userSlice,
  following: followingSlice,
  like: likeSlice,
  comment: commentSlice
});

export default rootReducer;
