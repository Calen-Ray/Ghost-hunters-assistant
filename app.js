

let app = new Vue({
    el: '#app',
    data: {
        ghostList: [

        ],
        hardEvidence: [],
        mapSelected : false,
        mapPicked : '',
        mapOptions: [
            {'name' : 'Tanglewood-Drive', 'url' : 'images/location_images/tanglewood_drive.PNG'},
            {'name' : 'Ridgeview-Court', 'url' : 'images/location_images/ridgeview_court.PNG'},
            {'name' : 'Willow-Street', 'url' : 'images/location_images/willow_street.PNG'},
            {'name' : 'Edgefield-Road', 'url' : 'images/location_images/edgefield_road.PNG'},
            {'name' : 'Bleasdale-Farmhouse', 'url' : 'images/location_images/bleasdale_farmhouse.PNG'},
            {'name' : 'Camp-Woodwind', 'url' : 'images/location_images/camp_woodwind.PNG'},
            {'name' : 'Grafton-Farmhouse', 'url' : 'images/location_images/grafton_farmhouse.PNG'},
            {'name' : 'Sunny-Meadows-Mental-Institution', 'url' : 'images/location_images/sunny_meadows.PNG'},
            {'name' : 'Brownstone-High-School', 'url' : 'images/location_images/brownstone_highschool.PNG'},
            {'name' : 'Maple-Lodge-Campsite', 'url' : 'images/location_images/large_campsite.PNG'},
            {'name' : 'Prison', 'url' : 'images/location_images/prison_door.PNG'},
            // {'name' : 'Sunny-Meadows-Mental-Institution', 'url' : ''},
            // {'name' : 'Removed-Maps', 'url' : ''},
            // {'name' : 'Asylum', 'url' : ''},
        ]
    },
    methods: {

    loadGhosts: function () {
        // pulls ghosts rose adds to the HTML into the vue app so rose never has to get her hands dirty with javascript
        document.querySelectorAll('#ghost-list li').forEach(liItem => {this.ghostList.push(liItem.innerText)})
    }, // end load ghosts 

    loadHardEvidence: function () {
        // pulls ghosts rose adds to the HTML into the vue app so rose never has to get her hands dirty with javascript
        document.querySelectorAll('#hard-evidence > li').forEach(liItem => {this.hardEvidence.push(liItem.innerText)})
    }, // end load ghosts 

    ruleOutGhost: function (evidence) {
        // console.log(evidence)
        document.querySelectorAll('#ghost-list > li').forEach(ghostPoss => {
            if (ghostPoss.innerHTML.includes(evidence) && !ghostPoss.classList.contains('excluded')) {
                console.log("Found ghost with evidence " + evidence)
                console.log(ghostPoss)
                ghostPoss.classList.toggle('excluded')
            }
        })
    }, // end load ghosts 

    ruleInGhost: function (evidence) {
        // console.log(evidence)
        document.querySelectorAll('#ghost-list > li').forEach(ghostPoss => {
            if (ghostPoss.innerHTML.includes(evidence)  && !ghostPoss.classList.contains('included')) {
                console.log("Found ghost with evidence " + evidence)
                console.log(ghostPoss)
                ghostPoss.classList.toggle('included')
            }
        })
    }, // end load ghosts 

    excludedEvidence: function () {
        returnList = []
        document.querySelectorAll('#hard-evidence > li').forEach(evidenceNode => {
            if (evidenceNode.classList.contains('excluded')){
                returnList.push(evidenceNode.innerText)
            }
        })
        return returnList
    }, // end of excludedEvidence

    includeEvidence: function () {
        returnList = []
        document.querySelectorAll('#hard-evidence > li').forEach(evidenceNode => {
            if (evidenceNode.classList.contains('included')){
                returnList.push(evidenceNode.innerText)
            }
        })
        return returnList
    }, // end of excludedEvidence

    qaGhostEvidence: function () {
        // clear options 
        document.querySelectorAll('#ghost-list > li').forEach(ghostPoss => {ghostPoss.classList = ''})
        excludeIf = this.excludedEvidence()
        includeIf = this.includeEvidence()
        console.log('excluding the following '+ excludeIf)
        document.querySelectorAll('#ghost-list > li').forEach(ghostCard => {
            ghostEvidence = []
            ghostCard.querySelectorAll('#three-evidence li').forEach(thisGhostsEvidence => {
                ghostEvidence.push(thisGhostsEvidence.innerText)
                if (excludeIf.includes(thisGhostsEvidence.innerText)) {
                    ghostCard.classList.add('excluded')
                }
                else if (includeIf.includes(thisGhostsEvidence.innerText) && !ghostCard.classList.contains('excluded')) {
                    ghostCard.classList.add('included')
                }
            }) // end of #three-evidence li').forEach
            // final check needs to see if theres any found evidence that is NOT in this ghosts three evidence.
            includeIf.forEach(needsToBePresent => {
                if (!ghostEvidence.includes(needsToBePresent)){
                    ghostCard.classList.add('excluded')
                }
            })
            // Finally go through things and make sure theres not exclusion and inclusion together
            document.querySelectorAll('#ghost-list > li.included.excluded').forEach(ghostCard => {
                ghostCard.classList.toggle('included')
            })
        }) // end of #ghost-list > li').forEach

    }, // end load ghosts 

    clickEvidence: function (evidence){
        //  When an evidence is clicked, it's routed to this function with string format
        console.log(evidence + ' was clicked')
        document.querySelectorAll('#hard-evidence > li').forEach(evidencePoss => {
            if (evidencePoss.innerHTML.includes(evidence)) {
                //  if it's here, than we are swapping classes on evidence

                // if it's excluded, clear classes
                if (evidencePoss.classList.contains('excluded')) {
                    evidencePoss.classList.toggle('excluded')
                }
                // if it's included set to exclude and remove included
                else if (evidencePoss.classList.contains('included')) {
                    evidencePoss.classList.toggle('included')
                    evidencePoss.classList.toggle('excluded')
                }
                // if it's not excluded you must be trying to include (first click again)
                else if (!evidencePoss.classList.contains('excluded')) {
                    evidencePoss.classList.toggle('included')
                }
                this.qaGhostEvidence()
            } 
        }) // end of evidence class modification
    }, // end clickEvidence ghosts 

    setBodyClass: function (mapName) {
        this.mapSelected = mapName;
        document.body.classList.add(mapName)
    }, // end of body-class

    },// end methods
    created: function () {
        this.loadGhosts()
        this.loadHardEvidence()

    }//end created
});