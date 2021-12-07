
let library = []

let addButton = document.querySelector('.open-form')
let submitButton = document.querySelector('.submit-form')
let statusButton = document.querySelector('.status-button')
let deleteCard = document.querySelector('.delete-card')
let form = document.querySelector('form')

console.log(submitButton)

function Book(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function addToLibrary(library){
    library.push(book)
}

addButton.addEventListener('click', () =>{
    form.style.visibility = 'visible'
})

submitButton.addEventListener('click', () =>{
    let inputs = document.querySelector('.inputs')
    let status = document.getElementById('#status')

    let title = inputs.children[0].value
    let author = inputs.children[1].value
    let pages = inputs.children[2].value
})

