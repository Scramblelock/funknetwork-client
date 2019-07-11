import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import FunkPost from "../components/funkPost/FunkPost";
import Profile from "../components/profile/Profile";
import FunkPostSkeleton from "../util/FunkPostSkeleton";

import { connect } from "react-redux";
import { getFunkPosts } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getFunkPosts();
  }

  render() {
    const { funkPosts, loading } = this.props.data;
    let recentFunkPostsMarkup = !loading ? (
      funkPosts.map(funkPost => (
        <FunkPost key={funkPost.funkPostId} funkPost={funkPost} />
      ))
    ) : (
      <FunkPostSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentFunkPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getFunkPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getFunkPosts }
)(home);
