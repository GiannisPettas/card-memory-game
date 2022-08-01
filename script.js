const game_images = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.jpg',
  'img9.jpg',
  'img10.jpg',
  'img11.jpg',
  'img12.jpg',
];
let flip_count = 0;
let first_image;
let second_image;

//doublicate image paths
game_images.push(...game_images);

//clear gameboard
const gameboard = document.getElementById('gameboard');
gameboard.innerHTML = '';

//shuffle the game_images array
let game_images_length = game_images.length;
for (let i = 0; i < game_images_length - 1; i++) {
  let ri = Math.floor(Math.random() * game_images_length);
  [game_images[i], game_images[ri]] = [game_images[ri], game_images[i]];
}

// create divs inside gameboard, to hold the images
for (let i = 1; i <= game_images.length; i++) {
  const image_holder = document.createElement('div');
  image_holder.classList.add('gm-image-holder');

  const game_image = document.createElement('img');
  game_image.draggable = false;
  game_image.dataset.position = i;
  game_image.dataset.flipped = 'false';
  game_image.dataset.status = 'not-found';
  game_image.src = 'images/card_back.jpg';
  game_image.addEventListener('click', imageClicked);
  image_holder.appendChild(game_image);
  gameboard.appendChild(image_holder);
}

function imageClicked() {
  if (this.dataset.flipped == 'false') {
    if (flip_count < 2) {
      this.style.transform = 'rotateY(180deg)';
      this.src = 'images/' + game_images[this.dataset.position - 1];
      this.dataset.flipped = 'true';
      if (flip_count == 0) {
        first_image = this;
      } else {
        second_image = this;
      }
      flip_count++;
    }
    if (flip_count >= 2) {
      gameboard.style.pointerEvents = 'none';
      setTimeout(flipCardsBack, 700);
    }
  }
}

function flipCardsBack() {
  console.log(
    game_images[first_image.dataset.position - 1],
    game_images[second_image.dataset.position - 1]
  );
  if (
    game_images[first_image.dataset.position - 1] !=
    game_images[second_image.dataset.position - 1]
  ) {
    first_image.style.transform = 'rotateY(0deg)';
    second_image.style.transform = 'rotateY(0deg)';
    first_image.src = 'images/card_back.jpg';
    second_image.src = 'images/card_back.jpg';
    first_image.dataset.flipped = 'false';
    second_image.dataset.flipped = 'false';
  }
  flip_count = 0;
  gameboard.style.pointerEvents = 'all';
}
