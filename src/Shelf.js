import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import { withStyles } from '@material-ui/core/styles';

import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';


const styles = {
    flex: {
      flexGrow: 1,
      flexDirection: 'column'
    }
  };


class Shelf extends Component {
    static propTypes = {
        books: PropTypes.object.isRequired
    };

    render () {
        const {name, books, shelves, onChangeShelves, classes} = this.props;
        return(
            <GridListTile key="Subheader" cols={2} className={classes.flex}>
                <ListSubheader component="div">{name}</ListSubheader>
                    {Object.keys(books).map((book, b) => (
                        <Book
                            key={books[book].id}
                            id={books[book].id}
                            cover={books[book].imageLinks.smallThumbnail}
                            title={books[book].title}
                            shelf={books[book].shelf}
                            shelves={shelves}
                            onChangeShelves={onChangeShelves}/>
                    ))}
            </GridListTile>
        );
    };
};

export default withStyles(styles)(Shelf);