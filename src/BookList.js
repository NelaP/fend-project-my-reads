import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class BookList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    // Update BookShelf


    render() {

        // I prefer this so we can reference the books by using 'books'
        const { books } = this.props;

        // filter all books based on the SHELF i.e. category
        let booksCurrentlyReading = books.filter(book => book.shelf === "currentlyReading");
        let booksWantToRead = books.filter(book => book.shelf === "wantToRead");
        let booksRead = books.filter(book => book.shelf === "read");

        return (

            <div className="list-books">

                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                    {console.log(booksCurrentlyReading)}
                                    {booksCurrentlyReading.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">

                                                    <div className="book-cover" style={{
                                                        width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                    }}></div>

                                                    <div className="book-shelf-changer">
                                                        <select>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading" selected="selected">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors.join(', ')}</div>
                                            </div>
                                        </li>
                                    ))}

                                </ol>
                            </div>
                        </div>




                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                    {console.log(booksWantToRead)}
                                    {booksWantToRead.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">

                                                    <div className="book-cover" style={{
                                                        width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                    }}></div>

                                                    <div className="book-shelf-changer">
                                                        <select>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead" selected="selected"> Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors.join(', ')}</div>
                                            </div>
                                        </li>
                                    ))}

                                </ol>
                            </div>
                        </div>


                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                    {console.log(booksRead)}
                                    {booksRead.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">

                                                    <div className="book-cover" style={{
                                                        width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                    }}></div>

                                                    <div className="book-shelf-changer">
                                                        <select>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read" selected="selected">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors.join(', ')}</div>
                                            </div>
                                        </li>
                                    ))}


                                </ol>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="open-search">
                    <Link to='/search' className='add-contact'> Add a Book</Link>
                </div>


            </div> // End of List of Books

        ) // End of Return

    } // End of Render

} // End of Component


export default BookList
