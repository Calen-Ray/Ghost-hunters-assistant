

let app = new Vue({
    el: '#app',
    data: {
        ghostList: [

        ],
        hardEvidence: [],
        mapSelected : false,
        currentRotation : 0,
        mapPicked : '',
        topMap : '',
        showJournal: false,
        showStrengthweakness: false,
        showGhostBehavior: false,
        showNightmareTip: false,
        showGhostTip: false,
        mapOptions: [
            {'name' : 'Tanglewood-Drive', 'url' : 'images/location_images/tanglewood_drive.PNG', 'descriptive': '„Where it all began; our first reports of the paranormal came from here. It\'s only small, but it holds more secrets than meets the eye.”'},
            {'name' : 'Ridgeview-Court', 'url' : 'images/location_images/ridgeview_court.PNG', 'descriptive': '„This building has a real history of death. Who sold the building to claim its next victims?”'},
            {'name' : 'Willow-Street', 'url' : 'images/location_images/willow_street.PNG', 'descriptive': '„A newly built home in an established area. Reports say it was built on top of something unearthly.”'},
            {'name' : 'Edgefield-Road', 'url' : 'images/location_images/edgefield_road.PNG', 'descriptive': '„This cozy house turned into something much more than a home for the living.”'},
            {'name' : 'Bleasdale-Farmhouse', 'url' : 'images/location_images/bleasdale_farmhouse.PNG', 'descriptive': '„A beautiful traditional house in the woods. It\'s a shame nobody was around to hear the residents running for their lives.”'},
            {'name' : 'Camp-Woodwind', 'url' : 'images/location_images/camp_woodwind.PNG', 'descriptive': '„This outdoor retreat was evacuated due to some campfire stories coming to life.”'},
            {'name' : 'Grafton-Farmhouse', 'url' : 'images/location_images/grafton_farmhouse.PNG', 'descriptive': '„A long-abandoned farmhouse, located in the middle of nowhere. Who knows what still lurks within.”'},
            {'name' : 'Sunny-Meadows-Mental-Institution', 'url' : 'images/location_images/sunny_meadows.PNG', 'descriptive': '„This vast asylum holds more than just cobwebs and debris. Some say you can still hear the screams.”'},
            {'name' : 'Brownstone-High-School', 'url' : 'images/location_images/brownstone_highschool.PNG', 'descriptive': '„Shut down due to unnatural deaths, this isolated school has been abandoned for decades.”'},
            {'name' : 'Maple-Lodge-Campsite', 'url' : 'images/location_images/large_campsite.PNG', 'descriptive': '„This outdoor retreat was evacuated due to some campfire stories coming to life.”'},
            {'name' : 'Prison', 'url' : 'images/location_images/prison_door.PNG', 'descriptive': '„Recently closed due to some unexplainable deaths, this facility now imprisons the paranormal.”'},
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
        document.body.classList.remove('hidden-overflow')
    }, // end of body-class

    rotateModal: function () {
        console.log(this.currentRotation)
        this.currentRotation = this.currentRotation - 360 / document.querySelectorAll('.rotate-slider .slides li').length;
        console.log(this.currentRotation)
        document.querySelector('.rotate-slider .slides').style['transform'] = 'translateX(-50%) rotate('+this.currentRotation+'deg)'
        this.isSelected()
    }, // end of body-class

    forceScrollToTop: function () {
        window.scrollTo(0, 0)
    }, // end of body-class

    scrollModalFeature: function () {

        this.currentRotation = this.currentRotation - 360 / document.querySelectorAll('.rotate-slider .slides li').length;
        console.log(this.currentRotation)
        document.querySelector('.rotate-slider .slides').style['transform'] = 'translateX(-50%) rotate('+this.currentRotation+'deg)'
    }, // end of body-class


    rotateModalOpposite: function () {
        this.currentRotation = this.currentRotation + 360 / document.querySelectorAll('.rotate-slider .slides li').length;
        console.log(this.currentRotation)
        document.querySelector('.rotate-slider .slides').style['transform'] = 'translateX(-50%) rotate('+this.currentRotation+'deg)'
        this.isSelected()
    }, // end of body-class


    labelModalParts: function () {
        console.log('Forcing attributes to slides')
        slides = document.querySelectorAll('.rotate-slider .slides li')
        loop = 0
        chunkCount = 360 / document.querySelectorAll('.rotate-slider .slides li').length
        slides.forEach(ele => {
            ele.setAttribute('rotationValue', chunkCount*loop)
            loop = loop + 1
        })
        this.isSelected()
    }, // end of body-class

    isSelected: function () {
        slides = document.querySelectorAll('.rotate-slider .slides li')
        slides.forEach(ele => {ele.classList.remove('selected-map')})
        convertedRotation = Math.floor(Math.abs(this.currentRotation)) % 360
        slides.forEach(ele => {
            // console.log(Math.floor(ele.getAttribute('rotationValue')))
            // console.log('vs')
            // console.log(convertedRotation)
            if (Math.floor(ele.getAttribute('rotationValue')) == convertedRotation) {
                console.log('new map selected -> '+ ele.classList)
                this.topMap = ele
                ele.classList.add('selected-map')
            }
        })
    }, // end of isselected

    },// end methods
    created: function () {
        this.loadGhosts()
        this.loadHardEvidence()
        window.setTimeout(this.labelModalParts, 500)
        window.setTimeout(this.forceScrollToTop, 100)
        // this.scrollModalFeature()
    },//end created
    computed: {
        // a computed getter
        // isSelected: function () {
        //     slides = document.querySelectorAll('.rotate-slider .slides li')
        //     slides.forEach(ele => {
        //         if (ele.rotationValue == this.currentRotation) {
        //             this.topMap = ele
        //         }
        //     })
        // }
      } // emd of computed
});
