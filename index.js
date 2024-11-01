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
        default:
            return data;
    }
}

async function search() {
    const searchInput = document.getElementById('search');
    const data = await getData(searchInput.value);

    const results = document.getElementById('destination-results');
    results.style.visibility = "visible";

    for (let destination of data) {
        const destinationCard = document.createElement('div');

        destinationCard.className = "destination-card";
        destinationCard.innerHTML = `
            <img class="destination-img" src="${destination.imageUrl}"></img>
            <div class="destination-descr">
                <p>${destination.name}</p>
                <p>${destination.description}</p>
                <button>Visit</button>
            </div>
        `;

        results.appendChild(destinationCard);
    }

    console.log(data);

    // replace with real code
    console.log(searchInput.value);
}

function clearSearch() {
    const searchInput = document.getElementById('search');

    searchInput.value = '';
    searchInput.focus();
}
