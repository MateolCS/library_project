
const addButton = document.querySelector('.open-form')
const submitButton = document.querySelector('.submit-form')
const statusButton = document.querySelector('.status-button')
const deleteCard = document.querySelector('.delete-card')
const form = document.querySelector('form')
const mainDisplay = document.querySelector('.cards')


class Library {
    books = []

    constructor(inBooks){
        if(inBooks === undefined){
            this.books = []
        }else{
            this.books = inBooks    
        }    
    }

    setBooks(inBooks){
        this.books = inBooks
    }

    addBook(inBook){
        this.books.push(inBook)
    }

    deleteBook(bookName){
        this.books = this.books.filter((book) => book.getName() !== bookName)
    }

    getBooks(){
        return this.books
    }

    setStatus(bookName){
        this.books.filter((book) => {
            if(book.getName() === bookName){
                book.setStatus()
            }
        })
    }
}

class Book{
    constructor(name, author, pages, status){
        this.name = name
        this.author = author
        this.pages = pages
        this.status = status
    }

    getName(){
        return this.name
    }

    getAuthor(){
        return this.author
    }

    getPages(){
        return this.pages
    }

    getStatus(){
        return this.status
    }

    setStatus(){
        this.status = !this.status
    } 
}

class Storage {
    
    static setLibrary(library){
        localStorage.setItem('library', JSON.stringify(library))
    }

    static getLibrary(){
        const library = Object.assign(new Library(), JSON.parse(localStorage.getItem('library')))
        library.setBooks(library.getBooks().map((book) => Object.assign(new Book(), book)))

        return library
    }

    static addBook(book){
        const library = Storage.getLibrary()
        library.addBook(book)
        Storage.setLibrary(library)
    }

    static deleteBook(bookName){
        const library = Storage.getLibrary()
        library.deleteBook(bookName)
        Storage.setLibrary(library)
    }

    static setStatus(bookName){
        const library = Storage.getLibrary()
        library.setStatus(bookName)
        Storage.setLibrary(library)
    }
}

const drawBook = (book) => {
    const bookCard = document.createElement('div')
    bookCard.classList.add('card')
     
    const bookName = document.createElement('h2')
    bookName.textContent = book.getName()
    bookName.classList.add('card-title')

    const bookAuthor = document.createElement('p')
    bookAuthor.textContent = book.getAuthor()
    bookAuthor.classList.add('bg-color')

    const bookPages = document.createElement('p')
    bookPages.textContent = `Pages: ${book.getPages()}`
    bookPages.classList.add('bg-color')

    const bookStatus = document.createElement('p')
    bookStatus.textContent = book.getStatus() ? 'Read' : 'In progress'
    bookStatus.classList.add('status-button')

    const deleteBook = document.createElement('i')
    deleteBook.classList.add('fa-solid', 'fa-xmark', 'delete-card')

    bookCard.appendChild(deleteBook)
    bookCard.appendChild(bookName)
    bookCard.appendChild(bookAuthor)
    bookCard.appendChild(bookPages)
    bookCard.appendChild(bookStatus)
    

    return bookCard

}

const getNewBook = () => {
    const nameField = document.querySelector('.form-title')
    const bookTitle = nameField.value

    const authorField = document.querySelector('.form-author')
    const bookAuthor = authorField.value

    const pagesField = document.querySelector('.form-pages')
    const bookPages = pagesField.value

    const statusCheckbox = document.querySelector('#status')
    const bookStatus = statusCheckbox.checked

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus)
    
    nameField.value = ''
    authorField.value = ''
    pagesField.value = ''
    statusCheckbox.checked = true

    return newBook
}

const book1 = new Book('Harry Potter', 'J.K. Rowling', 400, false)
const book2 = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1000, false)
const book3 = new Book('The Hobbit', 'J.R.R. Tolkien', 400, true)

const library = new Library([book1, book2, book3])

Storage.setLibrary(library)

const library2 = Storage.getLibrary()
console.log(library2)

mainDisplay.appendChild(drawBook(book1))

addButton.addEventListener('click', () => {
    form.style.visibility = 'visible'
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const newBook = getNewBook()
    Storage.addBook(newBook)
    mainDisplay.appendChild(drawBook(newBook))
    form.style.visibility = 'hidden'
})


