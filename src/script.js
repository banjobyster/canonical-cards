// Add cards into this element
const cardContainer = document.querySelector(".card-container");

const apiUrl =
  "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";

/**
 * Asynchronously fetches data from the specified API URL.
 * @param {string} apiUrl - The URL of the API to fetch data from.
 * @returns {Promise} - A promise that resolves to an array of data.
 */
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it at a higher level if needed.
  }
}

/**
 * Generates a single card based on the provided post data and appends it to the card container.
 * @param {Object} post - An object containing post information.
 */
async function generateCard(post) {
  // Extract releavant data from post object
  const title = post.title.rendered;
  const image = post.featured_media;
  const link = post.link;

  const authorDetails = post._embedded.author[0];
  const author = authorDetails.name;
  const authorLink = authorDetails.link;

  const gmtDate = new Date(post.date);
  const date = `${gmtDate.getDate()} ${gmtDate.toLocaleString("en-US", {
    month: "long",
  })} ${gmtDate.getFullYear()}`;

  /**
   * Return the value of corresponding term from wp:term.
   * @param {string} term - ID of the term.
   * @returns {string} - Actual value of the term corresponding to the ID.
   */
  const getTerm = (term, defaultValue = "") => {
    let termValue = "";
    for (const termArray of post._embedded["wp:term"]) {
      for (const termObject of termArray) {
        if (termObject.id === term) {
          termValue = termObject.name;
          break;
        }
      }
      if (termValue !== "") {
        break;
      }
    }

    if (termValue === "") termValue = defaultValue;

    return termValue;
  };

  let category = getTerm(post.categories[0]).slice(0, -1);
  const topic = getTerm(post.topic[0], "Ubuntu");

  // Defnine card element as a div
  const card = document.createElement("div");
  card.className = "col-4 col-medium-3 p-card--highlighted";

  // Define the card's inner HTML based on the provided data
  card.innerHTML = `
        <header class="p-card--highlighted__header">
            <h5 class="p-muted-heading">${topic}</h5>
        </header>
        <div class="p-card--highlighted__content">
            <div>
                <a href="${link}">
                    <div class="lazyloaded">
                        <img alt="" loading="lazy" src="${image}">
                    </div>
                </a>
            </div>
            <h3 class="p-heading--4">
                <a href="${link}">${title}</a>
            </h3>
            <p>
                <em>By <a href="${authorLink}">${author}</a> on ${date}</em>
            </p>
        </div>
        <p class="p-card--highlighted__footer">${category}</p>
    `;

  // Append the card to the container
  cardContainer.appendChild(card);
}

/**
 * Fetches data from the API and generates cards.
 */
async function fetchAndCreateCards() {
  try {
    const data = await fetchData(apiUrl);
    data.forEach((item) => {
      generateCard(item);
    });
  } catch (error) {
    console.error("Error fetching and creating cards:", error);
  }
}

// Call the fetchAndCreateCards function to initiate the data fetch and card generation
fetchAndCreateCards();
