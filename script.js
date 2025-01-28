
    // Card images
    const topCards = [
        "assets/images/Aries/Aries.png",
        "assets/images/Taurus/Taurus.png",
        "assets/images/Gemini/Gemini.png",
        "assets/images/Cancer/Cancer.png",
        "assets/images/Leo/Leo.png",
        "assets/images/Virgo/Virgo.png",
        "assets/images/Libra/Libra.png",
        "assets/images/Scorpio/Scorpio.png",
        "assets/images/Sagittarius/Sagittarius.png",
        "assets/images/Capricorn/Capricorn.png",
        "assets/images/Aquarius/Aquarius.png",
        "assets/images/Pisces/Pisces.png"
    ];
    const bottomCards = [...topCards]; // Duplicate card images for the bottom row

    // Shuffle both rows
    topCards.sort(() => 0.5 - Math.random());
    bottomCards.sort(() => 0.5 - Math.random());

    // Track game state
    let firstFlippedCard = null; // Store the first flipped card
    let firstFlippedButton = null; // Store the first flipped button
    let firstFlippedRow = null; // Store the row of the first flipped card
    let isFlippingAllowed = true; // Prevent simultaneous flipping
    let score = 0;

    let isTopRowFlipped = false; // Has a card been flipped in the top row?
    let isBottomRowFlipped = false; // Has a card been flipped in the bottom row?

    // Handle card flipping
    function handleFlip(button, cardImage, row) {
        if (!isFlippingAllowed) return; // Prevent further flips

        // Restrict flipping multiple cards in the same row
        if (row === "top" && isTopRowFlipped) {
            alert("You have already flipped a card in the top row! Flip a card in the bottom row.");
            return;
        }
        if (row === "bottom" && isBottomRowFlipped) {
            alert("You have already flipped a card in the bottom row! Flip a card in the top row.");
            return;
        }

        const img = button.querySelector("img");

        // Don't flip the same card twice
        if (img.src.includes(cardImage)) return;

        // Flip the card
        img.src = cardImage;

        // First card flip
        if (!firstFlippedCard) {
            firstFlippedCard = cardImage;
            firstFlippedButton = button;
            firstFlippedRow = row;

            // Mark the row as flipped
            if (row === "top") isTopRowFlipped = true;
            if (row === "bottom") isBottomRowFlipped = true;
        } else {
            // Second card flip
            isFlippingAllowed = false; // Block further flipping until reset

            if (firstFlippedCard === cardImage) {
                // Cards match
                score++;
                alert(`It's a match! Current score: ${score}`);
                resetFlipState();
            } else {
                // Cards don't match, flip them back
                setTimeout(() => {
                    img.src = "assets/images/13-card-before/card-before-flipping.png";
                    firstFlippedButton.querySelector("img").src =
                        "assets/images/13-card-before/card-before-flipping.png";
                    resetFlipState();
                }, 1000);
            }
        }
    }

    // Reset game state
    function resetFlipState() {
        firstFlippedCard = null;
        firstFlippedButton = null;
        firstFlippedRow = null;
        isFlippingAllowed = true;
        isTopRowFlipped = false;
        isBottomRowFlipped = false;
    }

    // Assign images to buttons in the top row
    for (let i = 1; i <= 12; i++) {
        const button = document.getElementById(`btn${i}`);
        const cardImage = topCards[i - 1];
        button.addEventListener("click", () => handleFlip(button, cardImage, "top"));
    }

    // Assign images to buttons in the bottom row
    for (let i = 13; i <= 24; i++) {
        const button = document.getElementById(`btn${i}`);
        const cardImage = bottomCards[i - 13];
        button.addEventListener("click", () => handleFlip(button, cardImage, "bottom"));
    }

