async function getData(search) {
    const response = await fetch('./travel_recommendation_api.json');
    const data = await response.json();

    switch(true) {
        case (/beach/.test(search.toLowerCase())):
            return data.beaches;
        case (/temple/.test(search.toLowerCase())):
            return data.temples;            
        case (/countr(y|ies)/.test(search.toLowerCase())):
            return data.countries.flatMap(({ cities}) => cities);
        default: {
            const allDestinations = [
                ...data.beaches,
                ...data.temples,
                ...data.countries.flatMap(({ cities}) => cities)
            ];

            return allDestinations.filter(({ name }) => new RegExp(search.toLowerCase()).test(name.toLowerCase()));
        }            
    }
}

async function search() {
    const searchInput = document.getElementById('search');
    const data = await getData(searchInput.value);

    const results = document.getElementById('destination-results');
    results.innerHTML = '';

    for (let destination of data) {
        const destinationCard = document.createElement('div');

        destinationCard.className = "destination-card";
        destinationCard.innerHTML = `
            <img class="destination-img" src="${destination.imageUrl}"></img>
            <div class="destination-descr">
                <p><strong>${destination.name}</strong></p>
                <p>${destination.description}</p>
                <button class="button">Visit</button>
            </div>
        `;

        results.appendChild(destinationCard);
    }
}

function clearSearch() {
    const searchInput = document.getElementById('search');

    searchInput.value = '';
    searchInput.focus();

    const results = document.getElementById('destination-results');
    results.innerHTML = '';
}

const searchInput = document.getElementById('search');

// Execute a function when the user presses a key on the keyboard
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});