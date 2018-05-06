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

    // console.log(searchQuery)

    // Search the API 
    // Then set state of BookSearchResults
    BooksAPI.search(searchQuery)

      // Result Set returned of all books as per the search parameters
      .then(booksSearchResults => {
        return booksSearchResults
      })

      // Process each book in the params
      .then(booksSearchResults => {

        // console.log('books reuslt ' + booksSearchResults)

        if (booksSearchResults != null) {

          // Get Book IDs for each book in Result Set
          let resultSet = booksSearchResults.map(b => b.id);
          let bookRequests = [];

          // Fetch each book as per the ID and add to new BookRequests Object
          resultSet.forEach(function (b) {
            bookRequests.push(BooksAPI.get(b))
          })

          return Promise.all(bookRequests)
            .then(newResultSet => {
              ///Return the new ResultSet Object
              return newResultSet
            })
        }
        else{
          // console.log('books results empty')
          return booksSearchResults = []
        }

      })

      // Once completed we then set the state to update the UI
      .then(booksSearchResults => {

        this.setState(state => ({
          booksSearchResults
        }))
      })

  } // End of getSearchResults



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
        this.setState(this.state.books)
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

        <Route path='/search' render={
          (history) => (
            <BookSearch
              booksSearchResults={this.state.booksSearchResults}
              onBookShelfChange={this.onBookShelfChange}
              getSearchResults={this.getSearchResults}
            />
          )
        }
        />

      </div >
    )
  }
}


export default BooksApp
