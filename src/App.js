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
    books: [],
    booksSearchResults: []
  }

  // Get all Books from API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

    BooksAPI.getAll().then((booksSearchResults) => {
      this.setState({ booksSearchResults })
    })
  }


  getSearchResults = (searchQuery) => {

    console.log(searchQuery)

    // Search the API 
    // Then set state of BookSearchResults
    BooksAPI.search(searchQuery)
      .then(() => {

        this.setState(state => ({
          books: state.booksSearchResults

        }))
      })

      //
      .then(() => {
        console.log('testing');
      })


  }


  // Update a Book and Change its shelf (DB and UI)
  onBookShelfChange = (bookChanged, newShelf) => {

    // Update the Database via the API
    // Then: Update the Books []
    // Then: Update the State
    BooksAPI.update(bookChanged, newShelf)

      .then(() => {

        this.state.books.forEach(function (element) {
          // console.log(element.id);
          // console.log(bookChanged.id);
          if (element.id === bookChanged.id) {
            element.shelf = newShelf
            //  console.log('shelf changed')
            //  console.log(element)
          } // End of IF

        }) // END: For Each      

      }) // END: Arrow Function


      .then(() => {
        // console.log('shelf changed check')
        this.setState(state => ({
          books: state.books
        }))

      }) // END: Arrow Function

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
          <BookSearch
            books={this.state.booksSearchResults}
            onBookShelfChange={this.onBookShelfChange}
            getSearchResults={this.getSearchResults}
          />
        )} />

      </div >
    )
  }
}

export default BooksApp
