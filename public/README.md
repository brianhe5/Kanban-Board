Brian He
505804874

Thank you, DID the EC, so the startMoveButton doesnt work
I removed the border while a card is moving for project 3, but already implemented it for project2
  - I was unsure if it was supposed to be kept or not, but decided to remove it in place of the feature that borders a card after it is placed


========================================================================
problems
========================================================================
  - dragging buttons only drags the buttons
  
========================================================================
graveyard
========================================================================
Move button
     <!-- this.startMoveButton = document.createElement('button');
     this.startMoveButton.classList.add('startMove');
     const moveImage = document.createElement('img');
     moveImage.src = 'icons/move.svg';
     moveImage.alt = 'Move';
     this.startMoveButton.appendChild(moveImage);
     this.startMoveButton.addEventListener('click', this.handleMove.bind(this));
     this.buttonDivElement.appendChild(this.startMoveButton); -->

HandleMove()
      <!-- handleMove() {
    this.mover.startMoving(this.articleElement);
    } -->
StartMoving, StopMoving, Move Card
moveCard is unnecessary (done by )
<!-- 
    //THIS GOT MOVED INSIDE THE IF STATEMENT
    this.isMoving = true;
    this.currentCard = selectedCard;
    this.currentCard.classList.add('moving');
    //finds card's source column
    this.currentCardColumn = this.currentCard.closest('.column');


    
    if(this.isMoving === true){
      const columnTitles = document.querySelectorAll('.columnTitle');
      columnTitles.forEach(column => {
        const moveHereButton = document.createElement('button');
        moveHereButton.textContent = MOVE_HERE_TEXT;
        moveHereButton.classList.add('moveHere');
        moveHereButton.addEventListener('click', this.moveCard);
        column.after(moveHereButton);
      })

      const columns = document.querySelectorAll('.column');
      columns.forEach(col => {
        const cards = col.querySelectorAll('.card');
        cards.forEach(cardElement => {
          const moveHereButtonCard = document.createElement('button');
          moveHereButtonCard.textContent = MOVE_HERE_TEXT;
          moveHereButtonCard.classList.add('moveHere');
          moveHereButtonCard.addEventListener('click', this.moveCard);
          cardElement.after(moveHereButtonCard);
        })
      })    
    }
  }
  //
  stopMoving() {
    //if find a card with .moving class,
    if(document.querySelector('.moving')) {
      this.currentCard.classList.remove('moving');

    }
    //Remove all buttons
    const buttons = document.querySelectorAll('.moveHere');
    buttons.forEach(button => {
      button.remove();
    })

    //reset variables
    this.isMoving = false;
    this.current = null;
    this.currentCardColumn = null;
  }

  moveCard(event) {
    const destination = event.currentTarget;
    destination.after(this.currentCard);
    //call stopMoving() after placing card down
    this.stopMoving();
  } -->
  Mover Constructor
    <!-- this.moveCard = this.moveCard.bind(this); -->
