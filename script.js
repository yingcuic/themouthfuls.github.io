const testimonialFiles = [
  "testimonials/testimonial10.json",
  "testimonials/testimonial9.json",
  "testimonials/testimonial5.json",
  "testimonials/testimonial8.json",
  "testimonials/testimonial1.json",
  "testimonials/testimonial2.json",
  "testimonials/testimonial3.json",
  "testimonials/testimonial4.json",
  "testimonials/testimonial6.json",
  "testimonials/testimonial7.json",
];

// Function to load and display testimonials dynamically
async function loadTestimonials() {
  try {
    const testimonialContainer = document.getElementById(
      "testimonial-container"
    );

    // Clear any existing testimonials
    testimonialContainer.innerHTML = "";

    // Loop through each testimonial file
    for (const file of testimonialFiles) {
      const response = await fetch(file); // Fetch the JSON file
      if (!response.ok) throw new Error(`Failed to load ${file}`);

      const testimonial = await response.json(); // Get the JSON object

      // Create testimonial card elements
      const testimonialCard = document.createElement("div");
      testimonialCard.classList.add("testimonial-card");

      // Create the avatar element
      const avatar = document.createElement("img");
      avatar.classList.add("avatar");
      avatar.src = testimonial.avatar || "images/avatars/default.jpg"; // Default avatar if not provided
      avatar.alt = `Avatar of ${testimonial.name}`;

      // Create the name element
      const name = document.createElement("h3");
      name.textContent = testimonial.name; // This is accessing .name from the JSON file

      // Create the quote element (added)
      const quote = document.createElement("p");
      quote.classList.add("testimonial-quote");
      quote.innerHTML = `<span class="quote-mark">“</span><strong>${testimonial.quote}</strong><span class="quote-mark">”</span>`;

      // Create the testimonial text element
      const text = document.createElement("p");
      text.textContent = testimonial.testimonial; // This is accessing .text from the JSON file

      // Create the rating element
      const rating = document.createElement("div");
      rating.classList.add("testimonial-rating");

      // Add star rating
      for (let i = 0; i < 5; i++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.textContent = i < testimonial.rating ? "★" : "☆"; // Full star or empty star based on JSON rating
        rating.appendChild(star);
      }

      // Append everything to the testimonial card
      testimonialCard.appendChild(avatar);
      testimonialCard.appendChild(name);
      testimonialCard.appendChild(quote);
      testimonialCard.appendChild(text);
      testimonialCard.appendChild(rating);

      // Append the testimonial card to the container
      testimonialContainer.appendChild(testimonialCard);
    }
  } catch (error) {
    console.error("Error loading testimonials:", error);
    const testimonialContainer = document.getElementById(
      "testimonial-container"
    );
    testimonialContainer.innerHTML = `<p>Error loading testimonials. Please try again later.</p>`;
  }
}

// Call the function to load testimonials when the page is loaded
document.addEventListener("DOMContentLoaded", loadTestimonials);
