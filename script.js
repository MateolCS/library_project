
const addButton = document.querySelector('.open-form')
const submitButton = document.querySelector('.submit-form')
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

class UI {

    static initializeUI(){
        UI.drawLibrary()
        UI.statusEvent()
        UI.deleteBook()
    }

    static drawBook (book) {
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
        if(book.getStatus()){
            bookStatus.textContent = 'Read'
            bookStatus.style.backgroundColor = '#A8B090'
            bookStatus.style.borderColor = '#99A083'
        }else{
            bookStatus.textContent = 'In progress'
            bookStatus.style.backgroundColor = '#c1121f'
            bookStatus.style.borderColor = '#c1121f'
        }
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

    static deleteBook = () =>{
        const deleteButtons = document.querySelectorAll('.delete-card')

        deleteButtons.forEach((button) => {
            button.addEventListener('click', (e)=>{
                const bookName = e.target.parentElement.querySelector('.card-title').textContent
                Storage.deleteBook(bookName)
                e.target.parentElement.remove()
            })
        })
    }

    static drawLibrary () {
        Storage.getLibrary().getBooks().forEach((book) =>{
            mainDisplay.appendChild(UI.drawBook(book))
        })
    }

    static statusEvent(){
        const statusButtons = document.querySelectorAll('.status-button')

        statusButtons.forEach((button) => {
            button.addEventListener('click', (e) =>{
                const bookName = e.target.parentElement.querySelector('.card-title').textContent
                Storage.setStatus(bookName)
                if(e.target.textContent === 'Read'){
                    e.target.textContent = 'In progress'
                    e.target.style.backgroundColor = '#c1121f'
                    e.target.style.borderColor = '#c1121f'
                }else{
                    e.target.textContent = 'Read'
                    e.target.style.backgroundColor = '#A8B090'
                    e.target.style.borderColor = '#99A083'
                }
            })
        })
    }
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

    if(bookTitle === '' || bookAuthor === '' || bookPages === ''){
        alert('Please fill in all fields')
    }else{
        const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus)
    
        nameField.value = ''
        authorField.value = ''
        pagesField.value = ''
        statusCheckbox.checked = true

        return newBook
    }
}

addButton.addEventListener('click', () => {
    form.style.visibility = form.style.visibility === 'visible' ? 'hidden' : 'visible'
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const newBook = getNewBook()
    Storage.addBook(newBook)
    mainDisplay.appendChild(UI.drawBook(newBook))
    UI.deleteBook()
    UI.statusEvent()
    form.style.visibility = 'hidden'
})

UI.initializeUI()
