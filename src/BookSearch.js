import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

// TODO
// Re-render page when going back to main page
// BUG: Search Results - the select is not reflecting the value from the API


class BookSearch extends Component {

    // Ensure we receive the properties as expected
    static propTypes = {
        booksSearchResults: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func.isRequired,
        getSearchResults: PropTypes.func.isRequired
    }


    state = {
        query: ''
    }

    // Update Search Bar
    updateQuery = (query) => {
        this.props.getSearchResults(query.trim());
        this.setState({ query: query.trim() })
    }

    // Take in Book ID
    // USE API to get shelf value and return
    // Call getSearchResults which will update the API
    getBookShelf(bookID) {
        BooksAPI.get(bookID).then(book => {
            console.log(book.title + ' ' + book.shelf)
            return book.shelf.toString()
        })
    }



    render() {

        // Preference: Reference the books by using 'books' instead of this.props.books
        const { booksSearchResults, onBookShelfChange } = this.props;
        const { query } = this.state

        return (

            <div className="search-books">

                <div className="search-books-bar">

                    <Link className='close-search' to='/'>Back to Home</Link>

                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>


                <div className="search-books-results">
                    <ol className="books-grid">

                        {booksSearchResults.map(book =>

                            < li key={book.id} >
                                <div className="book">
                                    <div className="book-top">

                                        <div className="book-cover" style={{
                                            width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                        }}></div>

                                        <div className="book-shelf-changer">

                                            <select
                                                value={this.getBookShelf(book.id)}
                                                onChange={(event) => onBookShelfChange(book, event.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading" >Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>

                                </div>
                            </li>
                        )
                        }


                    </ol>
                </div>
            </div>

        ) // End of Return

    } // End of Render

} // End of Component

export default BookSearch