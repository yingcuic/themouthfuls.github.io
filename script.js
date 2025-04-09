async function loadTestimonials() {
  const container = document.getElementById("testimonial-container");

  for (let i = 1; i <= 100; i++) {
    try {
      const response = await fetch(`testimonials/testimonial${i}.json`);
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

      const data = await response.json();
      console.log(`Loaded testimonial ${i}:`, data);

      const card = document.createElement("div");
      card.className = "testimonial-card";

      const avatar = document.createElement("img");
      avatar.src = `images/avatars/avatar${i}.png`;
      avatar.alt = `${data.name}'s Avatar`;
      avatar.className = "testimonial-avatar";

      const name = document.createElement("div");
      name.className = "testimonial-name";
      name.textContent = data.name;

      const quote = document.createElement("div");
      quote.className = "testimonial-quote";
      quote.textContent = data.testimonial.length > 180
        ? data.testimonial.slice(0, 180) + "..."
        : data.testimonial;

      const readMore = document.createElement("span");
      readMore.className = "read-more";
      readMore.textContent = "Read More";

      let expanded = false;
      readMore.onclick = () => {
        expanded = !expanded;
        quote.textContent = expanded
          ? data.testimonial
          : data.testimonial.slice(0, 180) + "...";
        readMore.textContent = expanded ? "Show Less" : "Read More";
      };

      card.appendChild(avatar);
      card.appendChild(name);
      card.appendChild(quote);
      card.appendChild(readMore);

      container.appendChild(card);

    } catch (e) {
      console.warn(`Error loading testimonial${i}.json`, e);
    }
  }
}

loadTestimonials();

function scrollTestimonials(direction) {
  const container = document.getElementById("testimonial-container");
  const scrollAmount = 340; // adjust as needed
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}