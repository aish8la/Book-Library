const addNewButton = document.querySelector('.new-button');
const formDialogue = document.querySelector('.form-dialogue');
const formCloseButton = document.querySelector('.form-close-button');

addNewButton.addEventListener('click', () => {
    formDialogue.showModal();
});

formCloseButton.addEventListener('click', () => {
    formDialogue.close();
});