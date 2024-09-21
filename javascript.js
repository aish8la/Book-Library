//Default Data / Import Books in Bulk
const bulkAddData = [
    {
        book_title: "To Kill a Mockingbird",
        book_author: "Harper Lee",
        book_pages: 281,
        read_status: true
    },
    {
        book_title: "1984",
        book_author: "George Orwell",
        book_pages: 328,
        read_status: false
    },
    {
        book_title: "The Great Gatsby",
        book_author: "F. Scott Fitzgerald",
        book_pages: 180,
        read_status: true
    },
    {
        book_title: "Pride and Prejudice",
        book_author: "Jane Austen",
        book_pages: 432,
        read_status: false
    },
    {
        book_title: "The Catcher in the Rye",
        book_author: "J.D. Salinger",
        book_pages: 234,
        read_status: true
    },
    {
        book_title: "The Hobbit",
        book_author: "J.R.R. Tolkien",
        book_pages: 310,
        read_status: false
    },
]

//Book Object Constructor

//Old Constructor Function
// function BookObject(bookId, title, author, pages, isRead) {
//     this.bookId = bookId;
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.isRead = isRead;
// };

// BookObject.prototype.readToggle = function() {
//     this.isRead = !this.isRead;
// };

class BookObject {
    constructor(bookId, title, author, pages, isRead) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    readToggle() {
        this.isRead = !this.isRead;
    }
}

//ID generators
const idGenerator = {
    newId: 0,
    generateBookId: function () {
    return `bkID-${++this.newId}`;
    }
};

// UI Object
const uiElement = {
    elementCreate: function(tagName, attribute = {}, textContent) {
        const element = document.createElement(tagName);
    
        for (const key in attribute) {
            if (attribute.hasOwnProperty(key)) {
                element.setAttribute(key, attribute[key]);
            }
            if (textContent) {
                element.textContent = textContent;
            }
        }
        return element;
    },
    element: {},
    elementSelector: function() {
        this.element.bookShelf = document.querySelector('.book-shelf');
        this.element.addNewButton = document.querySelector('.new-button');
        this.element.formDialogue = document.querySelector('.form-dialogue');
        this.element.newBookForm = document.querySelector('.new-book-form');
        this.element.formCloseButton = document.querySelector('.form-close-button');
    },
};

//UI Controllers 
const uiController = {

    closeDialogue: function() {
        this.element.newBookForm.reset();
        this.element.formDialogue.close();
    },

    formSubmit: function(e) {
        e.preventDefault();
        let isFilled = true;
        const inputs = this.element.newBookForm.querySelectorAll('input');
        let newBookData = {};
        let focusInput;
        for(input of inputs) {
            if (input.type === 'checkbox') {
                newBookData[input.name] = input.checked;
            } else if (input.value) {
                newBookData[input.name] = input.value;
            } else {
                isFilled = false;
                newBookData = {};
                focusInput = input;
                break;
            };    
        };
        if (isFilled) {
            this.closeDialogue();
        } else return;
        Library.addNewBook(newBookData);
    },

    cardButtonClick: function(e) {
        if (e.target.matches('[data-button="read"]')) {
            Library.readBook(e.target);
        } else if (e.target.matches('[data-button="delete"]')) {
            Library.deleteBook(e.target);
        }
    },

    init: function() {
        this.element.addNewButton.addEventListener('click', () => {
            this.element.formDialogue.showModal();
        });
        this.element.formCloseButton.addEventListener('click', () => this.closeDialogue());
        this.element.newBookForm.addEventListener('submit', (e) => this.formSubmit(e));
        this.element.bookShelf.addEventListener('click', (e) => this.cardButtonClick(e));
    },

};

Object.setPrototypeOf(uiController, uiElement);

//Library Object
const Library = {
    myLibrary: [
   
],

readTag: function(tagElement, isRead) {
    let tagClass;
    let tagText;
    if (isRead) {
        tagClass = 'tag read-tag';
        tagText = 'Read';
    } else {
        tagClass = 'tag unread-tag';
        tagText = 'Unread';
    }

    tagElement.setAttribute('class', tagClass);
    tagElement.textContent = tagText;
},

//Create Book Card Function
    createCard: function(bookId, title, author, pages, isRead) {
    const card = this.elementCreate('div', {class: 'book-card', 'data-book-id': bookId, 'data-element-type': 'book-card'});

    const bookDetails = this.elementCreate('div', {class: 'book-details'});
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-title'}, title));
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-author'}, author));
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-pages'}, `${pages} Pages`));

    const cardTags = this.elementCreate('div', {class: 'card-tags'});
    const readTag = this.elementCreate('div', {'data-tag-type': 'read-tag', 'data-book-id': bookId});
    this.readTag(readTag, isRead);
    cardTags.appendChild(readTag);

    const cardButtons = this.elementCreate('div', {class: 'card-buttons'});
    cardButtons.appendChild(this.elementCreate(
        'button',
        {
            class: 'read card-button','data-book-id': bookId,
            'data-element-type': 'card-button',
            'data-button':'read'
        },
        'Read Toggle'
    ));
    cardButtons.appendChild(this.elementCreate(
        'button',
        {class: 'delete card-button',
            'data-book-id': bookId,
            'data-element-type': 'card-button',
            'data-button': 'delete'
        },
        'Delete'
    ));
    card.appendChild(bookDetails);
    card.appendChild(cardTags);
    card.appendChild(cardButtons);
    return card;
},

    displayBooks: function() {
        for (let key = 0; key < this.myLibrary.length; key++) {
            const currentBookId = this.myLibrary[key].bookId;
            const isVisible = !!this.element.bookShelf.querySelector(`[data-element-type="book-card"][data-book-id="${currentBookId}"]`);
            if (!isVisible) {
                this.element.bookShelf.appendChild(this.createCard(this.myLibrary[key].bookId, 
                    this.myLibrary[key].title,
                    this.myLibrary[key].author,
                    this.myLibrary[key].pages,
                    this.myLibrary[key].isRead,
                ));
            }
        }
    },

    addNewBook: function (bookDetails = {}) {
        const {book_title: title, book_author: author, book_pages: pages, read_status: isRead} = bookDetails;
        const bookId = idGenerator.generateBookId();
        const newBook = new BookObject(bookId,  title, author, pages, isRead);
        const newCard = this.createCard(bookId, title, author, pages, isRead);
        this.myLibrary.push(newBook);
        this.element.bookShelf.appendChild(newCard);
    },

    findIndexLibrary: function (bookId) {
        const searchId = bookId;
        const indexOfBook = this.myLibrary.findIndex(book => book.bookId === searchId);
        return indexOfBook;
    },

    deleteBook: function (e) {
        const bookId = e.dataset.bookId;
        const cardElement = e.closest(`[data-element-type="book-card"][data-book-id="${bookId}"]`);
        this.myLibrary.splice(this.findIndexLibrary(bookId), 1);
        this.element.bookShelf.removeChild(cardElement);
    },

    readBook: function (e) {
        const bookId = e.dataset.bookId;
        const bookIndex = this.findIndexLibrary(bookId);
        const tagElement = e.closest(`[data-element-type="book-card"][data-book-id="${bookId}"]`)
                            .querySelector(`[data-tag-type="read-tag"][data-book-id="${bookId}"]`);
        this.myLibrary[bookIndex].readToggle();
        this.readTag(tagElement, this.myLibrary[bookIndex].isRead);
    },
};

Object.setPrototypeOf(Library, uiElement);

function bulkImport(dataArray) {
    dataArray.forEach(book => {
        Library.addNewBook(book);
    });
};

//Initializer
document.addEventListener('DOMContentLoaded', () => {
    uiElement.elementSelector();
    uiController.init();
    bulkImport(bulkAddData);
    Library.displayBooks();
});