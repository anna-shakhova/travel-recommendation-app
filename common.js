class CommonNavigation extends HTMLElement {
    static observedAttributes = ["search"];

    searchBarVisible = false;

    attributeChangedCallback(name, _, newValue) {
        if (name === 'search') {
            this.searchBarVisible = newValue === 'true';
        }
    }
  
    connectedCallback(){
        const searchClasses = this.searchBarVisible ? 'search-container visible' : 'search-container';
        
        this.innerHTML = `
            <nav class="nav-bar">
                <div class="logo">
                    <span class="logo-pic"><i class="fa fa-plane" aria-hidden="true"></i></span>
                    <span>TravelHack</span>
                </div>
                
                <div class="nav-items">
                    <a href="./" class="nav-item">Home</a>
                    <a href="./about.html" class="nav-item">About Us</a>
                    <a href="./contact.html" class="nav-item">Contact Us</a>
                </div>

                <div class="${searchClasses}">
                    <input class="search-input" type="text" id="search" placeholder="Enter a destination or keyword..." />
                    <button class="search-container-button" id="search-btn" onclick="search()"><i class="fa fa-search" aria-hidden="true"></i></button>
                    <button class="search-container-button" id="clear-btn" onclick="clearSearch()"><i class="fa fa-times" aria-hidden="true"></i></button>
                </div>
            </nav>
            `;
    }
}

class MediaLinks extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <div class="media">
                <span class="media-item"><i class="fa fa-twitter" aria-hidden="true"></i></span>
                <span class="media-item"><i class="fa fa-facebook" aria-hidden="true"></i></span>
                <span class="media-item"><i class="fa fa-instagram" aria-hidden="true"></i></span>
                <span class="media-item"><i class="fa fa-youtube-play" aria-hidden="true"></i></span>
            </div>
            `;
    }
}

customElements.define('common-nav', CommonNavigation);
customElements.define('media-links', MediaLinks);
