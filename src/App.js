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



  // Search API based on input Query
  // For each book returned we need to get the book shelf value
  // For each book shelf value we must add the object back to the searchQuery
  getSearchResults = (searchQuery) => {

    console.log(searchQuery)

    // Search the API 
    // Then set state of BookSearchResults
    BooksAPI.search(searchQuery)

      // Result Set Returned
      .then(booksSearchResults => {
        return booksSearchResults
      })

      // Get Book IDs for each book in Result Set
      // We now need to fetch the Book Shelf value for each Book
      // The value for each shelf needs to be appended to the Result Set
      // Once completed we then set the state
      .then(booksSearchResults => {

        let resultSet = booksSearchResults.map(b => b.id);
        let bookRequests = [];

        console.log(resultSet)

        resultSet.forEach(function (b) {
          bookRequests.push(BooksAPI.get(b))
        })

        return Promise.all(bookRequests).then(function (resultSet) {
          console.log(resultSet);

          ///Update the booksSearchResults Result with appended book shelf values
          return resultSet
        })
      })

      .then(booksSearchResults => {

        console.log('testing this 2')

        this.setState(state => ({
          booksSearchResults
        }))
      })

  } // End of getSearchResults


  /*
   BooksAPI.get(bookID).then(book => {
            console.log(book.title + ' ' + book.shelf)
            
            this.setState({currentBookShelf: book.shelf.toString() })
        })
        */

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
