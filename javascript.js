const addNewButton = document.querySelector('.new-button');
const formDialogue = document.querySelector('.form-dialogue');
const formCloseButton = document.querySelector('.form-close-button');
const myLibrary = [];

addNewButton.addEventListener('click', () => {
    formDialogue.showModal();
});

formCloseButton.addEventListener('click', () => {
    formDialogue.close();
});

function BookObject(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

BookObject.prototype.readToggle = function() {
    return !this.read;
}