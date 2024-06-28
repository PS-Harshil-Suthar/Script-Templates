document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const defaultCardId = 1;
  showCard(defaultCardId); // Show the first card by default
}

function showCard(cardId) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => (card.style.display = "none")); // Hide all cards
  const selectedCard = document.getElementById(`card-${cardId}`);
  if (selectedCard) {
    selectedCard.style.display = "block"; // Show the selected card if found
  } else {
    console.error(`Card with id ${cardId} not found`);
  }

  const links = document.querySelectorAll(".sidebar a");
  links.forEach((link) => link.classList.remove("active"));

  // Add 'active' class to the clicked link
  links[cardId - 1].classList.add("active");
}

function copyToClipboard(cardId) {
  const cardContentElement = document.querySelector(
    `#card-${cardId} .card-content`
  );
  if (!cardContentElement) {
    console.error(`Content element for card with id ${cardId} not found`);
    return;
  }
  const cardContent = cardContentElement.innerText;
  navigator.clipboard
    .writeText(cardContent)
    .then(() => showCopyPopup(cardContent))
    .catch((error) => console.error("Could not copy text: ", error));
}

function showCopyPopup(content) {
  const popupContainer = document.getElementById("popup-container");
  if (!popupContainer) {
    console.error("Popup container not found");
    return;
  }
  popupContainer.innerHTML = `
    <div class="card2">
      <div class="card-header">
        <h2 class="card-title">Content Copied</h2>
        <button class="close-btn copy-btn" onclick="closePopup()">Close</button>
      </div>
      <div class="card-content">
        <pre><p class="content-text" style="font-size: 1.3em">${content}</p><br /></pre>
      </div>
    </div>
  `;
  popupContainer.style.display = "block"; // Show the popup box
}

function closePopup() {
  const popupContainer = document.getElementById("popup-container");
  if (popupContainer) {
    popupContainer.style.display = "none";
  } else {
    console.error("Popup container not found");
  }
}

// function searchCards() {
//   const input = document.getElementById('searchInput').value.toLowerCase();
//   const cards = document.querySelectorAll('.card');
//   cards.forEach(card => {
//       const title = card.querySelector('.card-title').innerText.toLowerCase();
//       if (title.includes(input)) {
//           card.style.display = 'block';
//       } else {
//           card.style.display = 'none';
//       }
//   });
// }
