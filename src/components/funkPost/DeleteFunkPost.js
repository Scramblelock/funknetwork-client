import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteFunkPost } from '../../redux/actions/dataActions';

const styles = {
	deleteButton: {
		position: 'absolute',
		left: '90%',
		top: '10%'
	}
}

class DeleteFunkPost extends Component {

	state = {
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	deleteFunkPost = () => {
		this.props.deleteFunkPost(this.props.funkPostId);
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<MyButton 
					tip='Delete Funk Post'
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<DeleteOutline color='secondary'/>
				</MyButton>
				<Dialog 
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth='sm'
				>
					<DialogTitle>
						Are you sure you want to delete this funk post?
					</DialogTitle>
					<DialogActions>
						<Button onClick={this.handleClose} color='primary'>
							Cancel
						</Button>
						<Button onClick={this.deleteFunkPost} color='secondary'>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		)
	}
}

DeleteFunkPost.propTypes = {
	deleteFunkPost: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	funkPostId: PropTypes.string.isRequired
}

export default connect(null, { deleteFunkPost })(withStyles(styles)(DeleteFunkPost));