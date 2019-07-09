import { 
	SET_FUNK_POSTS,
	SET_FUNK_POST, 
	LIKE_FUNK_POST, 
	UNLIKE_FUNK_POST, 
	LOADING_DATA,
	DELETE_FUNK_POST,
	POST_FUNK_POST,
	SUBMIT_COMMENT 
} from '../types';

const initialState = {
	funkPosts: [],
	funkPost: {},
	loading: false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			}
		case SET_FUNK_POSTS:
			return {
				...state,
				funkPosts: action.payload,
				loading: false
			}
		case SET_FUNK_POST:
			return {
				...state,
				funkPost: action.payload
			}
		case LIKE_FUNK_POST: 
		case UNLIKE_FUNK_POST:
			let index = state.funkPosts.findIndex(
				(funkPost) => funkPost.funkPostId === action.payload.funkPostId
			);
			state.funkPosts[index] = action.payload;
			if (state.funkPost.funkPostId === action.payload.funkPostId) {
        state.funkPost = action.payload;
      }
			return {
				...state 
			};
		case DELETE_FUNK_POST:
			index = state.funkPosts.findIndex(
				(funkPost) => funkPost.funkPostId === action.payload
			);
			state.funkPosts.splice(index, 1);
			return {
				...state 
			};
		case POST_FUNK_POST:
			return {
				...state,
				funkPosts: [
					action.payload,
					...state.funkPosts
				]
			};
			case SUBMIT_COMMENT:
      return {
        ...state,
        funkPost: {
          ...state.funkPost,
          comments: [action.payload, ...state.funkPost.comments]
        }
      };
		default:
			return state;
	}
}