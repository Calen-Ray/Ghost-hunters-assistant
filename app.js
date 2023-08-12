

let app = new Vue({
    el: '#app',
    data: {
        ghostList: [

        ],
        currentEvidence: [],
    },
    methods: {

    loadGhosts: function () {
        // pulls ghosts rose adds to the HTML into the vue app so rose never has to get her hands dirty with javascript
        document.querySelectorAll('#ghost-list li').forEach(liItem => {this.ghostList.push(liItem.innerText)})
    }, // end load ghosts 

    },// end methods
    created: function () {
        this.loadGhosts()
    }//end created
});