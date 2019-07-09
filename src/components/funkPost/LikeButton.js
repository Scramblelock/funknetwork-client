import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeFunkPost, unlikeFunkPost } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedFunkPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.funkPostId === this.props.funkPostId
      )
    )
      return true;
    else return false;
  };

  likeFunkPost = () => {
    this.props.likeFunkPost(this.props.funkPostId);
  };

  unlikeFunkPost = () => {
    this.props.unlikeFunkPost(this.props.funkPostId);
  };
  
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedFunkPost() ? (
      <MyButton tip="Undo like" onClick={this.unlikeFunkPost}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeFunkPost}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  funkPostId: PropTypes.string.isRequired,
  likeFunkPost: PropTypes.func.isRequired,
  unlikeFunkPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeFunkPost,
  unlikeFunkPost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);