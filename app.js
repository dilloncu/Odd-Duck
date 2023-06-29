"use strict";

const oduckContainer = document.querySelector("section");
const resultsButton = document.querySelector("section + div");
const image1 = document.querySelector("section img:first-child");
const image2 = document.querySelector("section img:nth-child(2)");
const image3 = document.querySelector("section img:nth-child(3)");

let clicks = 0;
const maxClicksAllowed = 9;

let allProducts = [];

function getRandomNumber() {
  return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

let usedProducts = [];

function renderProducts() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

  while (product1 === product2 || product1 === product3 || product2 === product3 || usedProducts.includes(product1) || usedProducts.includes(product2) || usedProducts.includes(product3)) {
    product1 = getRandomNumber();
    product2 = getRandomNumber();
    product3 = getRandomNumber();
    
  }

  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;

  usedProducts = [];
  usedProducts.push(product1, product2, product3);
}

function handleProductClick(event) {
  if (event.target === oduckContainer) {
    alert("Continue");
  } else {
    clicks++;
    let clickedProduct = event.target.alt;
    for (let i = 0; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
      }
    }
    if (clicks === maxClicksAllowed) {
      oduckContainer.removeEventListener("click", handleProductClick);
      oduckContainer.className = "no-voting";
      resultsButton.addEventListener("click", renderChart);
      resultsButton.className = "clicks-allowed";
    } else {
      renderProducts();
    }
  }
}

function renderResults() {
  let ul = document.querySelector("ul");
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

const banana = new Product("banana","img/banana.jpg")
const bathroom = new Product("bathroom", "img/bathroom.jpg")
const boots = new Product("boots","img/boots.jpg")
const breakfast = new Product("breakfast", "img/breakfast.jpg")
const bubblegum = new Product("bubblegum","img/bubblegum.jpg")
const chair = new Product("chair","img/chair.jpg")
const cthulhu = new Product("cthulhu", "img/cthulhu.jpg")
const dogduck = new Product ("dog-duck","img/dog-duck.jpg")
const dragon = new Product("dragon","img/dragon.jpg")
const pen = new Product("pen","img/pen.jpg")
const petsweep = new Product("pet-sweep","img/pet-sweep.jpg")
const scissors = new Product("scissors","img/scissors.jpg")
const shark = new Product("shark","img/shark.jpg")
const sweep = new Product("sweep","img/sweep.png")
const tauntaun = new Product("tauntaun","img/tauntaun.jpg")
const unicorn = new Product("unicorn", "img/unicorn.jpg")
const watercan = new Product("water-can","img/water-can.jpg")
const wineglass = new Product("wine-glass","img/wine-glass.jpg")

renderProducts();

oduckContainer.addEventListener("click", handleProductClick);

function renderChart() {
  const productNames = [];
  const productViews = [];
  const productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }

  const data = {
    labels: productNames,
    datasets: [
      {
        label: "clicks",
        data: productClicks,
        backgroundColor: ["yellow"],
        borderColor: ["orange"],
        borderWidth: 1,
      },
      {
        label: "views",
        data: productViews,
        backgroundColor: ["orange"],
        borderColor: ["yellow"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
  };

  const productChart = document.getElementById("chart");
  const myChart = new Chart(productChart, config);
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem("product", JSON.stringify(allProducts));
}

function checkLocalStorage() {
  const localProduct = JSON.parse(localStorage.getItem("product"));
  if (localProduct) {
    allProducts = localProduct;
  } else {
    for (let i = 0; i < newProductRange.length; i++) {
      new Product(
        newProductRange[i],
        `img/` + newProductRange[i] + `.jpg`
      );
    }
  }
}
    

checkLocalStorage();
renderProducts()