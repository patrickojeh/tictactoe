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

  const tiles       = [...document.querySelectorAll('[role="button"]')];
  const restartBtn  = document.querySelector('a.restart');
  const mainGameEl  = document.querySelector('.tiles-box');

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
      mainGameEl.classList.remove('disable');
    } else {
      try {
        computerPlay();
      } catch(e) {
        // gameOver();
      }
    }
  }

  function humanPlay() {
    // human must not be able to play on existing tile
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener('click', function() {        
        this.classList.add('x');
        mainGameEl.classList.add('disable');
        let compMove = setInterval(() => {
          computerPlay();
          clearInterval(compMove);
        }, 500);
      })
    }
  }

  function pickRandomTile() {
    const random = Math.floor(Math.random() * tiles.length);
    return tiles[random];
  }

  function restartGame() {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].className = '';
    }
    mainGameEl.classList.remove('disable');
  }

  (function startGame() {
    humanPlay();
  })();

  restartBtn.onclick = (e) => {
    e.preventDefault();
    restartGame();
  }

}