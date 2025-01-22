/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
    this.currentCardColumn = null;
    this.currentCard = null;
    this.isMoving = false;

    //drop zones are initially set when app begins
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
      column.classList.add("dropZone");
      column.addEventListener('dragenter', this.handleDragEnterColumn.bind(this));
      column.addEventListener('dragover', this.handleDragOverColumn.bind(this));
      column.addEventListener('dragleave', this.handleDragLeaveColumn.bind(this));
      column.addEventListener('drop', this.handleDropInColumn.bind(this));
    });
  }

  handleDragEnterColumn(event) {
    event.preventDefault();
    // TODO: figure out what would happen when card enters column
    event.currentTarget.classList.add('drag-over');
  }
  handleDragOverColumn(event) {
    //preventDefault allows for dropping
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
  handleDragLeaveColumn(event) {
    event.currentTarget.classList.remove('drag-over');
  }
  handleDropInColumn(event) {
    event.preventDefault();
    const column = event.currentTarget;
    //if it doesnt move out of the column
    column.classList.remove('drag-over');
    
    if (this.currentCard) {
      column.appendChild(this.currentCard);
    }
    this.stopMoving();
  }
  startMoving(selectedCard) {
    if (this.currentCard === selectedCard) {
      this.stopMoving();
    }
    else if (this.currentCard !== null) {
      this.stopMoving();
    }
    this.isMoving = true;
    this.currentCard = selectedCard;
    this.currentCard.classList.add('moving');
    //finds card's source column
    this.currentCardColumn = this.currentCard.closest('.column');
  }
  stopMoving() {
    //if find a card with .moving class,
    if(document.querySelector('.moving')) {
      this.currentCard.classList.remove('moving');

    }
    this.isMoving = false;
    this.current = null;
    this.currentCardColumn = null;
  }

}


