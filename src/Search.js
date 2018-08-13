import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';


const styles = {
    flex: {
      flexGrow: 1
    }
};


class Search extends Component {
    static propTypes = {
        books: PropTypes.object.isRequired
    };

    render () {
        const {name, books, shelves, onSearch, onChangeShelves, classes} = this.props;
        return(
            <div className={classes.flex}>
                <TextField
                    id="name"
                    label="Search book"
                    className={classes.flex}
                    onChange={(event) => {
                        onSearch(event.target.value)
                    }} 
                    margin="normal"
                />
                <GridListTile className={classes.flex}>
                    {Object.keys(books).map((book, b) => (
                        <Book
                            key={books[book].id}
                            id={books[book].id}
                            cover={books[book].imageLinks && books[book].imageLinks.smallThumbnail}
                            title={books[book].title}
                            shelf={books[book].shelf}
                            shelves={shelves}
                            onChangeShelves={onChangeShelves}/>
                    ))}
                </GridListTile>
            </div>
        );
    };
};

export default withStyles(styles)(Search);