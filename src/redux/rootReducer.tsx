import {combineReducers} from 'redux';
import userSlice from './reducers/userSlice';
import followingSlice from './reducers/followingSlice';
import likeSlice from './reducers/likeSlice';

const rootReducer = combineReducers({
  user: userSlice,
  following: followingSlice,
  like: likeSlice,
});

export default rootReducer;
