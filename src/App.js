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
  }





  getSearchResults = (searchQuery) => {

    console.log(searchQuery)

    // Search the API 
    // Then set state of BookSearchResults
    BooksAPI.search(searchQuery)

      .then(booksSearchResults => {

        this.setState(state => ({
          booksSearchResults
        }))
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
          if (element.id === bookChanged.id) {
            element.shelf = newShelf
          } // End of IF

        }) // END: For Each      

      }) // END: Arrow Function


      .then(() => {

        this.setState(state => ({
          books: state.books


        }))
        console.log('shelf changed check')

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
            booksSearchResults={this.state.booksSearchResults}
            onBookShelfChange={this.onBookShelfChange}
            getSearchResults={this.getSearchResults}

          />

        )} />

      </div >
    )
  }
}


export default BooksApp
