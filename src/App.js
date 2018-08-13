import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import Shelf from './Shelf';
import Search from './Search';
import './App.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';

const styles = {
  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  flex: {
    flexGrow: 1,
  }
};

class App extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    books: {},
    shelves: {
      currentlyReading: {
        name: 'Currently Reading',
        type: 'currentlyReading',
        books: {}
      },
      wantToRead: {
        name: 'Want To Read',
        type: 'wantToRead',
        books: {}
      },
      read: {
        name: 'Read',
        type: 'read',
        books: {}
      }
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      Object.keys(this.state.shelves).map((shelf, s) => {
        let books = {};

        response.map(book => {
          books[book.id] = book;
          book.shelf === shelf && this.addBookToShelf(book, shelf);
        });
        this.setState({ books });
      });
    });
  };

  addBookToShelf = (book, shelf) => { 
    let shelves = {...this.state.shelves}
    shelves[shelf].books[book.id] = book;

    this.setState({shelves});

  };

  updateShelf = (books, shelf) => {
    let shelves = {...this.state.shelves}
    shelves[shelf].books = books;
    this.setState({ shelves });
  };

  changeShelves = (id, shelf) => {
    const book = {
      id: id
    };
  
    BooksAPI.update(book, shelf).then((shelves) => {
      Object.keys(shelves).map((shelf, s) => {
        let books = {};
        shelves[shelf].map(bookId => {
          if (!this.state.books[bookId]) {
            books[bookId] = book;
          } else {
            books[bookId] = this.state.books[bookId];
          }

          books[bookId].shelf = shelf;

        });

        this.updateShelf(books, shelf);
      });
    });
  };

  searchBooks = (query) => {
    query && BooksAPI.search(query).then((response) => {
      let books = {};
      let bookIds = [];
      Object.keys(this.state.shelves).map((shelf, s) => {
        response.length && response.map(book => {
          books[book.id] = book;
          if (this.state.shelves[shelf].books[book.id]) {
            books[book.id].shelf = shelf;
            bookIds.push(book.id);
          } else if (!this.state.shelves[shelf].books[book.id] && bookIds.indexOf(book.id) < -1) {
            books[book.id].shelf = '';
          }
        });
      });
      this.setState({ books });
    });
  };

  render() {
    const { shelves, books } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Library
            </Typography>
          </Toolbar>
        </AppBar>
        <GridList>
          <Route exact path='/' render={() => 
            (Object.keys(shelves).map((shelf, i) => (
              <Shelf 
                key={shelves[shelf].type}
                name={shelves[shelf].name}
                onChangeShelves={this.changeShelves}
                shelves={shelves}
                books={shelves[shelf].books}
                />
            ))
          )}/>
        </GridList>
        <GridList>
          <Route path='/search' render={({ history }) =>
            <Search
              shelves={shelves}
              onChangeShelves={this.changeShelves}
              onSearch={this.searchBooks}
              books={books} />
          }/>
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(App);
