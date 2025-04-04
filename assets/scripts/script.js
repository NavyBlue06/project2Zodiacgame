
// All card images (just once)
const cardImages = [
  "assets/images/Aries/1.png",
  "assets/images/Taurus/2.png",
  "assets/images/Gemini/3.png",
  "assets/images/Cancer/4.png",
  "assets/images/Leo/5.png",
  "assets/images/Virgo/6.png",
  "assets/images/Libra/7.png",
  "assets/images/Scorpio/8.png",
  "assets/images/Sagittarius/9.png",
  "assets/images/Capricorn/10.png",
  "assets/images/Aquarius/11.png",
  "assets/images/Pisces/12.png",
];

// Game state variables
let firstFlippedCard = null;
let firstFlippedButton = null;
let firstFlippedRow = null;
let isFlippingAllowed = true;
let isTopRowFlipped = false;
let isBottomRowFlipped = false;
let score = 0;

// DOM elements
const scoreDisplay = document.getElementById("score-update");
const resetButton = document.getElementById("reset-button");
const modal = document.getElementById("popup-Modal");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const closePopup = document.getElementById("close-popup");
const closeButton = document.getElementById("close-button");

// Function: Update score display
function updateScore() {
  scoreDisplay.textContent = `Score:${score}`;
}

// Function: Reset flip state
function resetFlipState() {
  firstFlippedCard = null;
  firstFlippedButton = null;
  firstFlippedRow = null;
  isFlippingAllowed = true;
  isTopRowFlipped = false;
  isBottomRowFlipped = false;
}

// Function: Shuffle a copy of the card images
function getShuffledCards() {
  const shuffled = [...cardImages];
  shuffled.sort(() => 0.5 - Math.random());
  return shuffled;
}

// Function: Assign shuffled cards to row buttons
function assignCardsToRow(startBtnId, shuffledCards, row) {
  for (let i = 0; i < shuffledCards.length; i++) {
    const buttonId = `btn${startBtnId + i}`;
    const button = document.getElementById(buttonId);
    const img = button.querySelector("img");
    const cardImage = shuffledCards[i];

    // Reset image to card back
    img.src = "assets/images/13-card-before/card-before-flipping.png";

    // Remove old listeners by replacing the button entirely
    const newButton = button.cloneNode(true);
    newButton.querySelector("img").src = img.src;
    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener("click", () =>
      handleFlip(newButton, cardImage, row)
    );
  }
}

// Function: Set up the whole game
function setupGame() {
  const topShuffled = getShuffledCards();
  const bottomShuffled = getShuffledCards();
  assignCardsToRow(1, topShuffled, "top");
  assignCardsToRow(13, bottomShuffled, "bottom");
  updateScore();
  resetFlipState();
}


// Function: Handle card flipping
function handleFlip(button, cardImage, row) {
  if (!isFlippingAllowed) return;

  if (row === "top" && isTopRowFlipped) {
    alert("You have already flipped a card in the top row!");
    return;
  }
  if (row === "bottom" && isBottomRowFlipped) {
    alert("You have already flipped a card in the bottom row!");
    return;
  }

  const img = button.querySelector("img");
  if (img.src.includes(cardImage)) return;

  img.src = cardImage;

  if (!firstFlippedCard) {
    firstFlippedCard = cardImage;
    firstFlippedButton = button;
    firstFlippedRow = row;
    if (row === "top") isTopRowFlipped = true;
    if (row === "bottom") isBottomRowFlipped = true;
  } else {
    isFlippingAllowed = false;

    if (firstFlippedCard === cardImage) {
      let zodiacSign = cardImage.split("/")[2];
      displayPopup(zodiacSign);
      score++;
      updateScore();
      resetFlipState();
    } else {
      setTimeout(() => {
        img.src = "assets/images/13-card-before/card-before-flipping.png";
        firstFlippedButton.querySelector("img").src =
          "assets/images/13-card-before/card-before-flipping.png";
        resetFlipState();
      }, 1000);
    }
  }
}

//create a pop up when cards are matched
const zodiacStories = {
  Aries: "Aries is the first sign of the zodiac, and that’s pretty much how those born under this sign see themselves: first. Aries are the leaders of the pack, first in line to get things going. Whether or not everything gets done is another question altogether, for an Aries prefers to initiate rather than to complete. Do you have a project needing a kick-start? Call an Aries, by all means. The leadership displayed by Aries is most impressive, so don’t be surprised if they can rally the troops against seemingly insurmountable odds—they have that kind of personal magnetism. An Aries won’t shy away from new ground, either. Those born under this sign are often called the pioneers of the zodiac, and it’s their fearless trek into the unknown that often wins the day. Aries is a bundle of energy and dynamism, kind of like a Pied Piper, leading people along with its charm and charisma. The dawning of a new day—and all of its possibilities—is pure bliss to an Aries.",
  Taurus: "Taurus is the second sign of the zodiac, and it’s represented by the bull. This is appropriate, as Tauruses may be seen as stubborn as bulls. A less appropriate astrological symbol could not be found for this sign. Taurus is a fixed sign, and it’s this fixed quality that can translate into steadfastness. Taurus doesn’t start out with the intention of being in it for the long haul, but quite often that’s what happens. Tauruses are reliable and practical, and they do well in fields that involve them in some sort of creative activity. Because they’re not afraid to roll up those sleeves and get their hands dirty, Tauruses can be found in the world of haute cuisine, landscaping, and interior decorating. Tauruses are also quite musical, and work well in environments that allow for creative expression. Tauruses make for great friends, and they’re the most dependable of the zodiac signs.",
  Gemini: "Gemini is the third sign of the zodiac, and those born under this sign will be quick to tell you all about it. That’s because they love to talk! It’s not just idle chatter with these folks, either. The driving force behind a Gemini’s conversation is their mind. The Gemini-born are intellectually inclined, forever probing people and places in search of information. The more information a Gemini collects, the better. Sharing that information later on with those they love is also a lot of fun, for Geminis are supremely interested in developing their relationships. Dalliances with those of this astrology sign are always enjoyable, since Geminis are bright, quick-witted, and the proverbial life of the party. Even though their intellectual minds can rationalize forever and a day, Geminis also have a surplus of imagination waiting to be tapped. Can a Gemini be boring? Never!",
  Cancer: "Cancer is the fourth sign of the zodiac, and all those born under this sign have a lot in common. They’re quick to take offense, but they also have a good sense of humor. Cancers are excellent caretakers, and where they differ from other signs is that they’re not afraid to take care of themselves. They’re the first to laugh and first to say, “I need a break.”",
  Leo: "Leo is the fifth sign of the zodiac. These folks are impossible to miss, since they love being center stage. Making an impression is Job #1 for Leos, and when you consider their personal magnetism, you see the job is quite easy. Leos are an ambitious lot, and their strength of purpose allows them to accomplish a great deal. The fact that this horoscope sign is also creative makes their endeavors fun for them and everyone else. They’re also supremely talented and have a flair for the dramatic. Warmth and enthusiasm seem to seep from every Leo pore, making these folks a pleasure to be around. They do love pleasure! It’s the Lion that symbolizes Leos, and the king (or queen) of the jungle is a most appropriate mascot, since they consider themselves the rulers of their universe (and the zodiac at that).",
  Virgo: "Virgo is the sixth sign of the zodiac, to be exact, and that’s the way Virgos like it: exacting. Those born under this horoscope sign are forever the butt of jokes for being so picky and critical (and they can be), but their ‘attention to detail’ is for a reason: to help others. Virgos, more than any other zodiac sign, were born to serve, and it gives them great joy. They are also tailor-made for the job, since they are industrious, methodical, and efficient. The sense of duty borne by these folks is considerable, and it ensures that they will always work for the greater good.",
  Libra: "Libra is the seventh sign of the zodiac, and it’s at this point in the zodiac that we start to see a shift. While the first six signs of the zodiac focus on the individual, the last six focus on the individual’s contact with others and with the world. Libras are first and foremost focused on others and how they relate to them. We can call this the sign of Partnership with a capital ‘P’ because these folks do not want to be alone! For a Libra, everything is better if it’s done as a pair. Libras are good when paired up, too, since they epitomize balance, harmony, and a sense of fair play.",
  Scorpio: "Scorpio is the eighth sign of the zodiac, and that shouldn’t be taken lightly—nor should Scorpios! Those born under this sign are dead serious in their mission to learn about others. There’s no fluff or chatter for Scorpios; these folks will zero in on the essential questions, gleaning the secrets that lie within. Scorpios concern themselves with beginnings and endings, and are unafraid of either; they also travel in a world that is black and white and has little use for gray.",
  Sagittarius: "Sagittarius is the ninth sign of the zodiac, and is one of the three fire signs; it is often symbolized as a centaur half-man, half-horse, aiming an arrow toward the sky. This represents Sagittarius’ search for meaning and knowledge.",
  Capricorn: "Capricorn is the tenth sign of the zodiac, and it’s also the sign that is most likely to last until the very end. Capricorns are very patient and will wait a long time for something they want. The flip side of this is that they can be very stubborn. They are also very resourceful and good at managing their time and money.",
  Aquarius: "Aquarius is the eleventh sign of the zodiac, and Aquarians are the perfect representatives for the Age of Aquarius. Those born under this sign have the social conscience needed to carry us into the new millennium. These folks are humanitarian, philanthropic, and keenly interested in making the world a better place.",
  Pisces: "Pisces is the twelfth sign of the zodiac, and it is also the final sign in the zodiacal cycle. Hence, this sign brings together many of the characteristics of the eleven signs that have come before it. Pisces, however, are happiest keeping many of these qualities under wraps. These folks are selfless, spiritual, and very focused on their inner journey."
};

// Function: Display zodiac popup
function displayPopup(zodiacSign) {
  popupTitle.textContent = `You have matched ${zodiacSign}!`;
  popupText.textContent = zodiacStories[zodiacSign];
  modal.style.display = "flex";
}

// Event listeners for popup close buttons
closePopup.addEventListener("click", () => {
  modal.style.display = "none";
});
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Reset button logic
resetButton.addEventListener("click", () => {
  score = 0;
  setupGame();
  console.log("Game reset!");
});

// Begin game
setupGame();