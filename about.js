class TeamMemberCard extends HTMLElement {
    static observedAttributes = ['name', 'role', 'description', 'img'];

    searchBarVisible = false;

    attributeChangedCallback(name, _, newValue) {
        this[name] = newValue;
    }
  
    connectedCallback(){      
        this.innerHTML = `
            <div class="team-member-card">
                <img class="team-member-img" src="${this.img}"/>
                <div class="team-member-descr">
                    <p class="team-member-name">${this.name}</p>
                    <p class="team-member-role">${this.role}</p>
                    <p>${this.description}</p>
                </div>
            </div>
            `;
        this.style.width = "min-content";
    }
}

customElements.define('team-member', TeamMemberCard);