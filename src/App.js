import React from 'react'
import { Route } from 'react-router-dom'

// APIs
import * as BooksAPI from './BooksAPI'

// Styling
import './App.css'

// UI
import BookList from './BookList'
import BookSearch from './BookSearch'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  // Get all Books from API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Update a Book and Change its shelf (DB and UI)
  onBookShelfChange = (book, shelf) => {

    // How do I update the UI?
    console.log('attempting to update UI and DB');
    console.log(book);
    console.log(shelf);

    // Update the Database via the API
    // If suscesssful then update the UI
    BooksAPI.update(book, shelf).then(book => {
      this.setState(state => ({
        books: state.books.update
      }))
    })
  }



  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BookList
            books={this.state.books}
            onBookShelfChange={this.onBookShelfChange}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <BookSearch />
        )} />
      </div>
    )
  }
}

export default BooksApp
