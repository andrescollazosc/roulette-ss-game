import { dataArray } from "./data.js";

const containerGame = document.getElementById("container-game");
const btnToggle = document.getElementById("btn-toggle");
const resultContainer = document.getElementById('result-container');

let firstImage;
let secondImage;
let thirdImage;

let resultFindImg1;
let resultFindImg2;
let resultFindImg3;

const generateImage = () => {
  let time = 150;
  let counterTimer = 1;

  removeAlert();

  for (let index = 1; index <= 10; index++) {
    setTimeout(function () {
      randomImg();
      
      if (counterTimer == 10) {
        validateResultGame(resultFindImg1, resultFindImg2, resultFindImg3);
      }

      counterTimer++;
    }, time);

    time += 150;    
  }  
};

const randomImg = () => {
  loadImages();

  const value1 = random();
  const value2 = random();
  const value3 = random();

  searchImagesByValue(value1, value2, value3);
  setImagesInElements();
};

function loadImages() {
  firstImage = containerGame.children[0].children[0];
  secondImage = containerGame.children[1].children[0];
  thirdImage = containerGame.children[2].children[0];
}

function random() {
  return Math.floor(Math.random() * 10);
}

function searchImagesByValue(valueImg1, valueImg2, valueImg3) {
  resultFindImg1 = findImage(valueImg1);
  resultFindImg2 = findImage(valueImg2);
  resultFindImg3 = findImage(valueImg3);
}

function findImage(value) {
  const result = dataArray.find((x) => x.id === value);

  return result
    ? result
    : {
        id: 11,
        src: "imgs/hqdefault.jpg",
      };
}

function setImagesInElements() {
  firstImage.src = resultFindImg1.src;
  secondImage.src = resultFindImg2.src;
  thirdImage.src = resultFindImg3.src;
}

function validateResultGame(img1, img2, img3) {
  if (!img1) {
    return;
  }

  if (img1.id === img2.id && img1.id === img3.id) {
    console.log("Ganaste, Felicitaciones");
    validateAlert();
  }
}

function validateAlert() {
  if (resultContainer.classList.contains('hide-alert')) {
    resultContainer.classList.replace('hide-alert', 'show-alert');
  }
}

function removeAlert() {
  if (resultContainer.classList.contains('show-alert')) {
    resultContainer.classList.replace('show-alert', 'hide-alert');
  }
}

btnToggle.addEventListener("click", generateImage);
