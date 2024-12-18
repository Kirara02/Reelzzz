import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

interface LikedReel {
  id: string;
  isLiked: boolean;
  likesCount: number;
}

interface LikeState {
  LikedReel: LikedReel[];
}

const initialState: LikeState = {
  LikedReel: [],
};

export const LikesSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLikeReel: (state, action: PayloadAction<LikedReel>) => {
      const index = state.LikedReel.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.LikedReel[index] = action.payload;
      } else {
        state.LikedReel.push(action.payload);
      }
    },
  },
});

export const {addLikeReel} = LikesSlice.actions;

export const selectLikedReel = (state: RootState) => state.like.LikedReel;

export default LikesSlice.reducer;
