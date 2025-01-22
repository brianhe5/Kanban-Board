import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    /*
    constructor() sets up the app.
    An instance of App is created by main in index.js.
    */
    this.mover = new Mover();
  }

  addCard(col, title, color, textColor) {
    // Create a new card instance
    const newCard = new Card(title, color, this.mover, textColor);
    // Get the column element by ID
    const colElem = document.getElementById(col);
    
    // Add the new card to the column
    newCard.addToCol(colElem, this.mover);
    // this.mover.stopMoving();
    // Return the new card instance
    return newCard;
  }
  storeNotes() {
    let notes = [];
    const columns = document.querySelectorAll('.column')
    columns.forEach(col => {
      let columnID = col.id;
      const cards = col.querySelectorAll('.card');
      cards.forEach(cardElement => {
        let note = {
          column: columnID,
          title: cardElement.querySelector('.title').innerText,
          description: cardElement.querySelector(".description").innerText,
          color: cardElement.style.backgroundColor,
          textColor: cardElement.style.color
        };
        notes.push(note);
      });
    });
    localStorage.removeItem('notes');
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  insertNotes() {
    const noteData = JSON.parse(localStorage.getItem('notes'));
    if (noteData) {
      noteData.forEach(note => {
        let { column, title, color, textColor, description } = note;
        let newCard = this.addCard(column, title, color, textColor);
        if (description) {
          newCard.setDescription(description);
        }
      });
    }
  }
}
