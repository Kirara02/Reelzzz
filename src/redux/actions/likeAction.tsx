import {appAxios} from '../apiConfig';
import {addLikedComment, addLikedReply, addLikeReel} from '../reducers/likeSlice';

export const toggleLikeReel =
  (id: string, likesCount: number, isLiked: boolean) => async (dispatch: any) => {
    try {
      const res = await appAxios.post(`/like/reel/${id}`);
      const data = {
        id: id,
        isLiked: res.data.msg === 'Unliked' ? false : true,
        likesCount: res.data.msg === 'Unlied' ? likesCount - 1 : likesCount + 1,
      };
      dispatch(addLikeReel(data));
    } catch (error) {
      console.log('TOGGLE LIKE REEL ERROR', error);
    }
  };

export const toggleLikeComment =
  (id: string, likesCount: number, isLiked: boolean) => async (dispatch: any) => {
    const data = {
      id: id,
      isLiked: !isLiked,
      likesCount: isLiked ? likesCount - 1 : likesCount + 1,
    };
    dispatch(addLikedComment(data));
    try {
      const res = await appAxios.post(`/like/comment/${id}`);
    } catch (error: any) {
      const data = {
        id: id,
        isLiked: isLiked,
        likesCount: isLiked ? likesCount + 1 : likesCount - 1,
      };
      dispatch(addLikedComment(data));
      console.log('LIKE COMMENT ->', error);
    }
  };

export const toggleLikeReply =
  (id: string, likesCount: number, isLiked: boolean) => async (dispatch: any) => {
    const data = {
      id: id,
      isLiked: !isLiked,
      likesCount: isLiked ? likesCount - 1 : likesCount + 1,
    };
    dispatch(addLikedReply(data));
    try {
      const res = await appAxios.post(`/like/reply/${id}`);
    } catch (error: any) {
      const data = {
        id: id,
        isLiked: isLiked,
        likesCount: isLiked ? likesCount + 1 : likesCount - 1,
      };
      dispatch(addLikedReply(data));
      console.log('LIKE REEL ->', error);
    }
  };

export const getListLikes = (data: any, searchQuery: string) => async (dispatch: any) => {
  try {
    const res = await appAxios.get(
      `/like?entityId=${data.entityId}&type=${data.type}&searchQuery=${searchQuery}`,
    );
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.log('LIST LIKES ->', error);
    return [];
  }
};
