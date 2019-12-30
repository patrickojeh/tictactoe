'use strict';

window.onload = () => {

  const r1c1 = document.querySelector('[data-row="1"][data-column="1"]');
  const r1c2 = document.querySelector('[data-row="1"][data-column="2"]');
  const r1c3 = document.querySelector('[data-row="1"][data-column="3"]');
  const r2c1 = document.querySelector('[data-row="2"][data-column="1"]');
  const r2c2 = document.querySelector('[data-row="2"][data-column="2"]');
  const r2c3 = document.querySelector('[data-row="2"][data-column="3"]');
  const r3c1 = document.querySelector('[data-row="3"][data-column="1"]');
  const r3c2 = document.querySelector('[data-row="3"][data-column="2"]');
  const r3c3 = document.querySelector('[data-row="3"][data-column="3"]');

  const tiles       = Array.from(document.querySelectorAll('[role="button"]'));
  const restartBtn  = document.querySelector('a.restart');
  const mainGameEl  = document.querySelector('.tiles-box');

  const winAlertEl = document.querySelector('.win-alert');

  // if a tile has already been played on.
  function alreadyPlayedOnTile(tile) {
    if (tile.classList.contains('x') || tile.classList.contains('o')) {
      return true
    }
  }

  function computerPlay() {
    let tile = pickRandomTile();
    if (!alreadyPlayedOnTile(tile)) {
      tile.classList.add('o');
      if (!validWin()) {
        mainGameEl.classList.remove('disable');
      }
    } else {
      try {
        computerPlay();
      } catch(e) {
        // draw();
      }
    }
  }

  function humanPlay() {
    // human must not be able to play on existing tile
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener('click', function() {    
        if (!alreadyPlayedOnTile(this)) {
          this.classList.add('x');
          if (!validWin()) {
            mainGameEl.classList.add('disable');
            let compMove = setInterval(() => {
              computerPlay();
              clearInterval(compMove);
            }, 500); 
          }          
        }
      })
    }
  }

  function pickRandomTile() {
    const random = Math.floor(Math.random() * tiles.length);
    return tiles[random];
  }

  function validWin() {
    if (r1c1.classList.contains('x') && r1c2.classList.contains('x') && r1c3.classList.contains('x')) {
      return winner('X');
    } else if (r1c1.classList.contains('o') && r1c2.classList.contains('o') && r1c3.classList.contains('o')) {
      return winner('O');
    }

    if (r2c1.classList.contains('x') && r2c2.classList.contains('x') && r2c3.classList.contains('x')) {
      return winner('X');
    } else if (r2c1.classList.contains('o') && r2c2.classList.contains('o') && r2c3.classList.contains('o')) {
      return winner('O');
    }

    if (r3c1.classList.contains('x') && r3c2.classList.contains('x') && r3c3.classList.contains('x')) {
      return winner('X');
    } else if (r3c1.classList.contains('o') && r3c2.classList.contains('o') && r3c3.classList.contains('o')) {
      return winner('O');
    }

    if (r1c1.classList.contains('x') && r2c1.classList.contains('x') && r3c1.classList.contains('x')) {
      return winner('X');
    } else if (r1c1.classList.contains('o') && r2c1.classList.contains('o') && r3c1.classList.contains('o')) {
      return winner('O');
    }

    if (r1c2.classList.contains('x') && r2c2.classList.contains('x') && r3c2.classList.contains('x')) {
      return winner('X');
    } else if (r1c2.classList.contains('o') && r2c2.classList.contains('o') && r3c2.classList.contains('o')) {
      return winner('O');
    }

    if (r1c3.classList.contains('x') && r2c3.classList.contains('x') && r3c3.classList.contains('x')) {
      return winner('X');
    } else if (r1c3.classList.contains('o') && r2c3.classList.contains('o') && r3c3.classList.contains('o')) {
      return winner('O');
    }

    if (r1c1.classList.contains('x') && r2c2.classList.contains('x') && r3c3.classList.contains('x')) {
      return winner('X');
    } else if (r1c1.classList.contains('o') && r2c2.classList.contains('o') && r3c3.classList.contains('o')) {
      return winner('O');
    }
    
    if (r1c3.classList.contains('x') && r2c2.classList.contains('x') && r3c1.classList.contains('x')) {
      return winner('X');
    } else if (r1c3.classList.contains('o') && r2c2.classList.contains('o') && r3c1.classList.contains('o')) {
      return winner('O');
    }
  }

  function restartGame() {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].className = '';
    }
    winAlertEl.innerHTML = '';
    mainGameEl.classList.remove('disable');
  }

  function winner(i) {
    // console.log(`${i} has won the game!`);
    let emoticon = (i === 'O') ? '🙁' : '😊';
    winAlertEl.innerHTML = `Player ${i} wins! <span>${emoticon}</span>`;
    return true;
  }

  (function() {
    humanPlay();
  })();

  restartBtn.onclick = (e) => {
    e.preventDefault();
    restartGame();
  }

}