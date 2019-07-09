import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteFunkPost from './DeleteFunkPost';
import FunkPostDialog from './FunkPostDialog';
import LikeButton from './LikeButton';

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200
	},
	content: {
		padding: 25,
		objectFit: 'cover'
	}
}

class FunkPost extends Component {
	render() {
		dayjs.extend(relativeTime);
		const { 
			classes, 
			funkPost : { 
				body, 
				createdAt, 
				userImage, 
				userHandle, 
				funkPostId, 
				likeCount, 
				commentCount
			},
			user: {
				authenticated,
				credentials: { handle }
			} 
		} = this.props;

		const deleteButton = authenticated && userHandle === handle ? (
			<DeleteFunkPost funkPostId={funkPostId}/>
		) : null;
		
		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title='Profile Image'
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typography 
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
					>
						{userHandle}
					</Typography>
					{deleteButton}
					<Typography variant="body2" color='textSecondary'>
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1">{body}</Typography>
					<LikeButton funkPostId={funkPostId}/>
					<span>{likeCount} Likes</span>
					<MyButton tip='comments'>
						<ChatIcon color='primary'/>
					</MyButton>
					<span>{commentCount} Comments</span>
					<FunkPostDialog 
						funkPostId={funkPostId}
						userHandle={userHandle}
						openDialog={this.props.openDialog} 
					/>
				</CardContent>
			</Card>
		);
	}
}

FunkPost.propTypes = {
	user: PropTypes.object.isRequired,
	funkPost: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(FunkPost));
