/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  constructor(title, color, mover, textColor) {

    this.mover = mover;
    this.articleElement = document.createElement('article');
    this.articleElement.classList.add('card');
    this.articleElement.style.backgroundColor = color;
    this.articleElement.style.color = textColor;
    //all cards are drag and droppable now!
    this.articleElement.draggable = true;
    this.articleElement.classList.add('draggable');
    // Add drag event listeners
    this.articleElement.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.articleElement.addEventListener('dragend', this.handleDragEnd.bind(this));

    this.titleElement = document.createElement('h3');
    this.titleElement.classList.add('title');
    this.titleElement.textContent = title;
    this.articleElement.appendChild(this.titleElement);

    //create description element where it is initially empty
    this.descriptionElement = document.createElement('p');
    this.descriptionElement.classList.add('description');
    this.setDescription(NO_DESCRIPTION_TEXT);
    this.articleElement.appendChild(this.descriptionElement);

    //create and append text area for editing the description
    this.textareaElement = document.createElement('textarea');
    this.textareaElement.classList.add('editDescription', 'hidden');
    this.textareaElement.addEventListener('blur', this.handleBlur.bind(this)); // Bind the blur event handler
    this.articleElement.appendChild(this.textareaElement);

    this.buttonDivElement = document.createElement('div');
    this.buttonDivElement.classList.add('buttons')
    this.articleElement.appendChild(this.buttonDivElement);

    this.editButton = document.createElement('button');
    this.editButton.classList.add('edit');
    const editImage = document.createElement('img');
    editImage.src = 'icons/edit.svg';
    editImage.alt = 'Edit';
    this.editButton.appendChild(editImage);
    this.editButton.addEventListener('click', this.handleEdit.bind(this));
    this.buttonDivElement.appendChild(this.editButton);

    //movebutton was here

    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete');
    const deleteImage = document.createElement('img');
    deleteImage.src = 'icons/delete.svg';
    deleteImage.alt = 'Delete';
    this.deleteButton.appendChild(deleteImage);
    this.deleteButton.addEventListener('click', this.deleteCard.bind(this));
    this.buttonDivElement.appendChild(this.deleteButton);
  }
  handleDragStart(event) {
    //sets dragging class for current dragging card
    this.articleElement.classList.add('dragging');
    this.articleElement.classList.add('invisible')
    //sets what to do with the data
    event.dataTransfer.effectAllowed = 'move';
    //stores the data of the card
    event.dataTransfer.setData('text/plain', null);
    //start moving and stop moving may be unnecessary
    this.mover.startMoving(this.articleElement);
  }

  handleDragEnd(event) {
    this.articleElement.classList.remove('dragging');
    this.articleElement.classList.remove('invisible')
    this.mover.stopMoving();
  }

  //handleMove() was here

  deleteCard() {
    this.articleElement.remove();
    this.mover.stopMoving();
  }
  handleEdit() {
      // Hide the description and show the textarea
      this.descriptionElement.classList.add('hidden');
      this.textareaElement.classList.remove('hidden');
  
      this.textareaElement.value = this.descriptionElement.textContent;
      this.textareaElement.focus();
      this.textareaElement.select();
  }
  handleBlur() {
    // Set the card's description to the text entered by the user
    this.setDescription(this.textareaElement.value);

    // Hide the textarea and show the description
    this.textareaElement.classList.add('hidden');
    this.descriptionElement.classList.remove('hidden');
  }

  addToCol(colElem, mover) {
 
    colElem.appendChild(this.articleElement);

    this.mover = mover;
  }

  setDescription(text) {

    this.descriptionElement.textContent = text || NO_DESCRIPTION_TEXT;

  }
}