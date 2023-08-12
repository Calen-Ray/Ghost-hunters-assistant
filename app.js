

Vue.component('profile-page', {
    props: ['user'],
    data: function () {
        return {


        }
    }, // end of data
    methods: {

    }, // end of methods
    mounted: function () {

    }, // end of mounted
    created: function () {

    }, // end of created
    template: `
    <div class='profile' v-if='user.username'>
        <img src='https://www.pngitem.com/pimgs/m/31-313496_red-pokemon-trainer-red-hd-png-download.png'>
        <p v-if='user.inbound'></p>
        <div class="profile-details">
            <h3>[[user.username]]</h3>
            <p>Caught pokemon: [[user.caught_pokemon_details.length]]</p>
            <p>Caught shiny pokemon: [[user.caught_pokemon_shinies_details.length]]</p>
        </div>
        <div class="listed-shiny-pokemon" v-if='user.caught_pokemon_shinies_details.length > 0'>
            <pokemon-card-shiny
                v-for='pokemon in user.caught_pokemon_shinies_details'
                :poke=pokemon
            ></pokemon-card-shiny>
        </div>
        <div class="listed-pokemon" v-if='user.caught_pokemon_details.length > 0'>
            <pokemon-card
                v-for='pokemon in user.caught_pokemon_details'
                :poke=pokemon
            ></pokemon-card>
        </div>

    </div>
    
    `, // end of template
})// end of profile component




Vue.component('pokemon-card', {
    props: ['poke'],
    data: function () {
        return {


        }
    }, // end of data
    methods: {

    }, // end of methods
    mounted: function () {

    }, // end of mounted
    created: function () {

    }, // end of created
    template: `
                <div>
                <h3><a :href="[[poke.url_detail]]">[[poke.name]] </a></h3>
                <p>#[[poke.num]] </p>
                <img :src="[[poke.basic_img_url]]" alt="">
                <ul>
                    <li v-for='type in poke.types_short' :class='[[type.type]]'>[[type.type]]</li>
                </ul>
                </div>
    
    `, // end of template
})// end of pokemon component



Vue.component('pokemon-card-shiny', {
    delimiters: ['[[', ']]'],
    props: ['poke'],
    data: function () {
        return {


        }
    }, // end of data
    methods: {
        convert_to_shiny_url: function(){
            url = this.poke.basic_img_url
            //  this just reverses the url, and adds shiny to it, then returns the string re-oriented. 
            rev_url = url.split("").reverse().join("")
            rev_url = rev_url.replace('/','/ynihs/')
            rev_url = rev_url.split("").reverse().join("")
            return rev_url
        }
    }, // end of methods
    mounted: function () {

    }, // end of mounted
    created: function () {

    }, // end of created
    template: `
                <div>
                <h3><a :href="[[poke.url_detail]]">[[poke.name]] </a></h3>
                <p>#[[poke.num]] </p>
                <img :src="convert_to_shiny_url()" alt="">
                <ul>
                    <li v-for='type in poke.types_short' :class='[[type.type]]'>[[type.type]]</li>
                </ul>
                </div>
    
    `, // end of template
})// end of shiny pokemon component






let app = new Vue({
    el: '#app',
    data: {
        ghostList: [

        ],
        currentEvidence: [],
    },
    methods: {

    loadGhosts: function () {
        document.querySelectorAll('#ghost-list li').forEach(liItem => {this.ghostList.push(liItem.innerText)})
    }, // end load ghosts 

    },// end methods
    created: function () {
        this.loadGhosts()
    }//end created
});