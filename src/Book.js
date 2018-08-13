import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CheckIcon from '@material-ui/icons/Check';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    icon: {
      color: 'rgba(255, 255, 255, 1)',
    },
    img: {
        width: 'auto',
        height: '300px',
        transform: 'none',
        margin: '0 auto',
        display: 'table'
    }
  });


class Book extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        cover: PropTypes.string,
        title: PropTypes.string.isRequired,
        shelves: PropTypes.object,
        shelf: PropTypes.string,
        classes: PropTypes.object.isRequired
    };

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
    this.setState({ anchorEl: null });
    };

    render() {
         const { id, cover, title, shelves, shelf, onChangeShelves, classes } = this.props;
         const { anchorEl } = this.state;

         return (
            <GridListTile key={id} style={{background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${cover}) no-repeat center center / cover`}}>
                <img src={cover} alt={title} className={classes.img} />
                <GridListTileBar
                    title={title}
                    subtitle='Book'
                    actionIcon={
                        <div>
                            <IconButton 
                                className={classes.icon} 
                                onClick={this.handleClick}>
                                <FolderOpenIcon />
                            </IconButton>
                            <Menu
                                id={id}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}>
                                {Object.keys(shelves).map((slf, s)=> (
                                <MenuItem key={shelves[slf].type} selected={shelves[slf].type === shelf} onClick={(event) => {
                                        onChangeShelves(id, shelves[slf].type);
                                    }}>
                                    {shelves[slf].type === shelf && (<ListItemIcon><CheckIcon /></ListItemIcon>)}
                                    <ListItemText classes={{ primary: classes.primary }} inset primary={shelves[slf].name} />
                                </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    }
                />
          </GridListTile>
         );
    }
};

export default withStyles(styles)(Book);