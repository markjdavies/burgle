class Word {
    path=[];
    value='';
  
    addLetter = (die) => {
      if (this.path.length === 0 || this.areAdjacent(die, this.path[this.path.length - 1])) {
        if (!this.path.some(x => x.index === die.index)) {
          this.path = this.path.concat(die);
          this.value = `${this.value}${die.showingFace.value.toLowerCase()}`;
        }
      }
    }
    
    areAdjacent = (firstDie, secondDie) => {
      return (Math.abs(firstDie.row - secondDie.row) < 2) && (Math.abs(firstDie.col - secondDie.col) < 2)
    }
    
  }

  export default Word;