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
  onBookShelfChange = (bookChanged, newShelf) => {

    // How do I update the UI?
    console.log('attempting to update UI and DB');
    console.log(bookChanged);
    console.log(newShelf);

    // Update the Database via the API
    // If suscesssful then update the UI
    // API Updated now to update UI
    // loop through the books[] and find the book that was changed
    // then set the shelf value to new value
    BooksAPI.update(bookChanged, newShelf)    
    
    // Promise returned true
    .then(bookChanged, newShelf => {

      this.state.books.forEach(function (element) {
        // console.log(element.id);
        // console.log(bookChanged.id);
        if (element.id === bookChanged.id) {
          element.shelf = newShelf
          console.log('shelf changed')
          console.log(element)
        } // End of IF

      }) // END: of for Each

      this.setState(state => ({
        books: this.state.books.update
      }))


    } // END: THEN Arrow Function

    )

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
