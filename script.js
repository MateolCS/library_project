const library =[]
//Buttons and areas that we will be working with

let addButton = document.querySelector('.open-form')
let submitButton = document.querySelector('.submit-form')
let statusButton = document.querySelector('.status-button')
let deleteCard = document.querySelector('.delete-card')
let form = document.querySelector('form')
let mainDisplay = document.querySelector('.cards')



// creating book class

class Book{
    constructor(title, author, pages, status,){
        this.title = title
        this.author = author
        this.pages = pages
        this.status = status
        this.createCard = function(){
            let card = document.createElement('div')
            card.classList.add('card')
            let deleteButton = document.createElement('button')
            deleteButton.classList.add('delete-card')
            deleteButton.innerHTML = "&times;"
            deleteButton.addEventListener('click', ()=>{
                card.remove()
                removeFromLibrary(library, title)
                console.log(library)
            })
            card.appendChild(deleteButton)
            let cardTitle = document.createElement('h3')
            cardTitle.innerText = `${title}`
            cardTitle.classList.add('desc')
            cardTitle.classList.add('card-title')
            card.appendChild(cardTitle)
            let cardAuthor = document.createElement('h3')
            cardAuthor.innerText = `${author}`
            cardAuthor.classList.add('desc')
            card.appendChild(cardAuthor)
            let cardPages = document.createElement('h3')
            cardPages.innerText = `${pages}`
            cardPages.classList.add('desc')
            card.appendChild(cardPages)
            let cardStatus = document.createElement('button')
            cardStatus.classList.add('status-button')
            if(status == 'Done!'){
                cardStatus.style.backgroundColor = '#A8B090'
                cardStatus.style.border = '2px solid #99A083'
                cardStatus.innerText = `${status}`
            }else{
                cardStatus.style.backgroundColor = '#dc2f02'
                cardStatus.style.border = '2px solid #d00000'
                cardStatus.innerText = `${status}`
            }
            card.appendChild(cardStatus)
            cardStatus.addEventListener('click', () =>{
                if(status == 'Done!'){
                    cardStatus.style.backgroundColor = '#dc2f02'
                    cardStatus.style.border = '2px solid #d00000'
                    status = 'In progress!'
                    cardStatus.innerText = `${status}`
                }else{
                    cardStatus.style.backgroundColor = '#A8B090'
                    cardStatus.style.border = '2px solid #99A083'
                    status = 'Done!'
                    cardStatus.innerText = `${status}`
                }
            })
            mainDisplay.appendChild(card)
    }
}}


let book1 = new Book('jan', 'kowalk', 123, 'Done!')
let book2 = new Book('adam', 'kowalk', 123, 'In progress!')
let book3 = new Book('stanislaw', 'kowalk', 123, 'In progress!')
let book4 = new Book('ania', 'kowalk', 123, 'In progress!')


library.push(book1)
library.push(book2)
library.push(book3)
library.push(book4)
console.log(library)


function removeFromLibrary(library, bookTitle){
    for(let i = 0; library.length; i++){
        if(library[i].title == bookTitle){
            library.splice(i,1)
            break
        }
    }
}


function fillPage(library){
    for(let i = 0; i < library.length; i++){
        library[i].createCard()
    }
}


fillPage(library)



const getBook = () =>{
    let inputs = document.querySelector('.inputs')
    let statusInfo = document.getElementById('status')
    let status = ''

    let title = inputs.children[0].value
    let author = inputs.children[1].value
    let pages = inputs.children[2].value

    if(statusInfo.checked){
        status = 'Done!'
    }else{
         status = 'In progress'
    }

    return new Book(title, author, pages, status)
}

addButton.addEventListener('click', () =>{
    form.style.visibility = 'visible'
})

submitButton.addEventListener('click', ()=>{
    updateLibrary()
})



const updateLibrary = ()=>{
    //let bookToAdd = getBook()

    if(localStorage.getItem('library') == null){
        localStorage.setItem('library', '[]')
    }

    let oldLibrary = JSON.parse(localStorage.getItem('library'))
    oldLibrary.push(getBook())

    localStorage.setItem('library', oldLibrary)
}

const viewLibrary = ()=>{
    var libraryToView = JSON.parse(localStorage.getItem('library'))
    return libraryToView
}




