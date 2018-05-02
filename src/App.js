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

  // Get all Books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BookList books={this.state.books}/>
        )} />
        <Route path='/search' render={({ history }) => (
          <BookSearch />
        )} />
      </div>
    )
  }
}

export default BooksApp
