import {
  SET_FUNK_POSTS,
  LOADING_DATA,
  LIKE_FUNK_POST,
  UNLIKE_FUNK_POST,
  DELETE_FUNK_POST,
  SET_ERRORS,
  POST_FUNK_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_FUNK_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all Funk Posts
export const getFunkPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/funkPosts")
    .then(res => {
      dispatch({
        type: SET_FUNK_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_FUNK_POSTS,
        payload: []
      });
    });
};

export const getFunkPost = funkPostId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/funkPost/${funkPostId}`)
    .then(res => {
      dispatch({
        type: SET_FUNK_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Post A Funk Post
export const postFunkPost = newFunkPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/funkPost", newFunkPost)
    .then(res => {
      dispatch({
        type: POST_FUNK_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like a Funk Post
export const likeFunkPost = funkPostId => dispatch => {
  axios
    .get(`/funkPost/${funkPostId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_FUNK_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Unlike a Funk Post
export const unlikeFunkPost = funkPostId => dispatch => {
  axios
    .get(`/funkPost/${funkPostId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_FUNK_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Submit a comment
export const submitComment = (funkPostId, commentData) => dispatch => {
  axios
    .post(`/funkPost/${funkPostId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete a Funk Post
export const deleteFunkPost = funkPostId => dispatch => {
  axios
    .delete(`/funkPost/${funkPostId}`)
    .then(() => {
      dispatch({
        type: DELETE_FUNK_POST,
        payload: funkPostId
      });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_FUNK_POSTS,
        payload: res.data.funkPosts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_FUNK_POSTS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
