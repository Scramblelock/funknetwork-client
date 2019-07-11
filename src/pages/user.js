import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import FunkPost from "../components/funkPost/FunkPost";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import FunkPostSkeleton from "../util/FunkPostSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    funkPostIdParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const funkPostId = this.props.match.params.funkPostId;

    if (funkPostId) this.setState({ funkPostIdParam: funkPostId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { funkPosts, loading } = this.props.data;
    const { funkPostIdParam } = this.state;

    const funkPostsMarkup = loading ? (
      <FunkPostSkeleton />
    ) : funkPosts === null ? (
      <p>No funk posts from this user</p>
    ) : !funkPostIdParam ? (
      funkPosts.map(funkPost => (
        <FunkPost key={funkPost.funkPostId} funkPost={funkPost} />
      ))
    ) : (
      funkPosts.map(funkPost => {
        if (funkPost.funkPostId !== funkPostIdParam)
          return <FunkPost key={funkPost.funkPostId} funkPost={funkPost} />;
        else
          return (
            <FunkPost
              key={funkPost.funkPostId}
              funkPost={funkPost}
              openDialog
            />
          );
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {funkPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
