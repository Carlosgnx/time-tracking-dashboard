"use strict";

/********Variables**********/
const cards = [];
const dailyElem = document.querySelector(".profile__daily");
const weeklyElem = document.querySelector(".profile__weekly");
const monthlyElem = document.querySelector(".profile__monthly");

/********Functions**********/
function displayCards(cards, timeframe) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const template = document.querySelector("template").content;
  cards.forEach((card) => {
    const container = template.querySelector(".card");
    container.style.backgroundImage = `url(${card.image})`;
    container.style.backgroundColor = `${card.background}`;
    template.querySelector(".card__title").innerText = card.title;
    template.querySelector(
      ".card__time"
    ).innerText = `${card.timeframes[timeframe].current}hrs
      `;
    template.querySelector(
      ".last-week-time"
    ).innerText = `${card.timeframes[timeframe].previous}hrs`;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  cardsContainer.appendChild(fragment);
}

/********Listeners**********/
document.addEventListener("click", (e) => {
  const clickOn = (selector) => e.target.matches(selector);

  if (clickOn(".profile__daily")) {
    dailyElem.style.color = "gainsboro";
    weeklyElem.style.color = "var(--pale-blue)";
    monthlyElem.style.color = "var(--pale-blue)";
    displayCards(cards, "daily");
  }
  if (clickOn(".profile__weekly")) {
    weeklyElem.style.color = "gainsboro";
    dailyElem.style.color = "var(--pale-blue)";
    monthlyElem.style.color = "var(--pale-blue)";
    displayCards(cards, "weekly");
  }
  if (clickOn(".profile__monthly")) {
    monthlyElem.style.color = "gainsboro";
    dailyElem.style.color = "var(--pale-blue)";
    weeklyElem.style.color = "var(--pale-blue)";
    displayCards(cards, "monthly");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        cards.push(element);
      });
    });
  displayCards(cards, "daily");
});
