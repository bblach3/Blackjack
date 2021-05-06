


let suit = ["spades", "hearts", "diamonds", "clubs"]
let value = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "king", "queen", "ace" ];
var cards = [];
var card = {}
for (var suitIndex = 0; suitIndex < suit.length; suitIndex++){
  for( var valueIndex = 0; valueIndex < value.length; valueIndex++) {
    
    card.suit = suit[suitIndex];
    card.value = value[valueIndex];
    card.url = `images/${value[valueIndex]}_of_${suit[suitIndex]}.png`;
    cards.push(card);
    card = {};
  }
}
// console.log(cards);

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */

 function shuffleArray(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
}




let dealerHand = []
let playerHand = []
let pPoints = 0
let dPoints = 0


let dealerHandContainer = document.querySelector('#dealer-hand')
let playerHandContainer = document.querySelector('#player-hand')

let dealButton = document.querySelector('#deal-button')
let hitButton = document.querySelector('#hit-button')
let standButton = document.querySelector('#stand-button')
let restartButton = document.querySelector('#restart-button')





function DisplayDealerCards(){
     
}

function displayPlayerCards(){

 }



dealButton.addEventListener('click', (e)=>{
    //pop off 4 cards (2 to dealer 2 to player)
    shuffleArray(cards)
    for(var i = 0; i <2; i++){
            let tempCard = cards.pop();
            console.log(tempCard)
            dealerHand.push(tempCard);
        
            var img = document.createElement("img")
            img.setAttribute('style', 'width:100px; height:130px;')
            img.src = tempCard.url
           
            dealerHandContainer.appendChild(img)  
           
    }

    for(var i = 0; i <2; i++){
            let tempCard = cards.pop();
            console.log(tempCard)
            playerHand.push(tempCard);
        
            var img = document.createElement("img")
            img.setAttribute('style', 'width:100px; height:130px;')
            img.src = tempCard.url
           
            playerHandContainer.appendChild(img) 

           
    }
    dPoints = dealerPoints()
    document.getElementById('dtotal').innerHTML = 'Dealer: ' + dPoints
    console.log(dPoints)
    

    pPoints = playerPoints()
    document.getElementById('ptotal').innerHTML = 'Player: ' + pPoints
    console.log(pPoints)

    check()
    document.getElementById("deal-button").disabled = true;
    document.getElementById('messages2').innerHTML = 'Press "Hit" or "Stand" to continue'

})

    

hitButton.addEventListener('click', (e)=>{
    
        let tempCard = cards.pop();
        
        playerHand.push(tempCard);
    
        var img = document.createElement("img")
        img.setAttribute('style', 'width:100px; height:130px;')
        img.src = tempCard.url
        playerHandContainer.appendChild(img)



        tempCard = cards.pop();
        dealerHand.push(tempCard);
        
    
        // var img = document.createElement("img")
        // img.setAttribute('style', 'width:100px; height:130px;')
        // img.src = tempCard.url
        // setTimeout(() => {
        //     dealerHandContainer.appendChild(img) },500) 

        // dPoints = dealerPoints()
        // document.getElementById('dtotal').innerHTML = 'Dealer: ' + dPoints
        // console.log(dPoints)

        pPoints = playerPoints()
        document.getElementById('ptotal').innerHTML = 'Player: ' + pPoints
        console.log(pPoints)

        shuffleArray(cards)
        check()

})

standButton.addEventListener('click', (e)=>{
    
    if (dPoints < 17) {
    let tempCard = cards.pop();
    dealerHand.push(tempCard);
        
    
    var img = document.createElement("img")
    img.setAttribute('style', 'width:100px; height:130px;')
    img.src = tempCard.url
    dealerHandContainer.appendChild(img) 

    dPoints = dealerPoints()
    document.getElementById('dtotal').innerHTML = 'Dealer: ' + dPoints
    console.log(dPoints)
    // winner()
    }
    check()
    winner()
   
})



function playerPoints(){
        var total = 0
        
        for (var i = 0 ; i < playerHand.length; i++)
        {
                if (playerHand[i].value == "jack" || playerHand[i].value == "queen" || playerHand[i].value == "king")
                    playerHand[i].value = 10;
                if (playerHand[i].value == "ace")
                    playerHand[i].value = 11;
                
                total = total + parseInt(playerHand[i].value)
        }
        return total
        
    }


function dealerPoints(){
        var total = 0
        
        for (var i = 0 ; i < dealerHand.length; i++)
        {
                if (dealerHand[i].value == "jack" || dealerHand[i].value == "queen" || dealerHand[i].value == "king")
                    dealerHand[i].value = 10;
                if (dealerHand[i].value == "ace")
                    dealerHand[i].value = 11;
                
                total = total + parseInt(dealerHand[i].value)
        }
        return total
    }


function check() {
    if (pPoints > 21){
        document.getElementById('messages').innerHTML = 'You Busted! You Lose! 😫' 
        document.getElementById('messages3').innerHTML = 'Press "Restart" button to start a new game'
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        // document.getElementById('messages2').innerHTML = 'You Lost!'
        
    }
    else if (dPoints > 21) {
        document.getElementById('messages').innerHTML = 'Dealer Busted! You Win! 😁' 
        document.getElementById('messages3').innerHTML = 'Press "Restart" button to start a new game'
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        // document.getElementById('messages2').innerHTML = 'You Win!'
    }
    else if (pPoints == 21) {
        document.getElementById('messages').innerHTML = 'You\'ve hit Blackjack! You win! 🤩' 
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById('messages3').innerHTML = 'Press "Restart" button to start a new game'
    }

  
}

function winner() {
    if(pPoints > dPoints && pPoints <= 21) {
        document.getElementById('messages2').innerHTML = 'You Win! 🥰'
        
    }
    else if(pPoints < dPoints && dPoints <= 21) {
        document.getElementById('messages2').innerHTML = 'You Lost! 😢'
       
    }
    document.getElementById("deal-button").disabled = true;
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    
    // document.getElementById('messages2').innerHTML = 'Press "Restart" button to start a new game'

}


function restart(){
    
    let dealerHandContents = document.querySelectorAll("#dealer-hand img")
    for(let i =0; i < dealerHandContents.length; i++){ 
    
    console.log(dealerHandContents)
    dealerHandContainer.removeChild(dealerHandContents[i])
   
    }

    let playerHandContents = document.querySelectorAll("#player-hand img")
    for(let i =0; i < playerHandContents.length; i++){ 
    
    console.log(playerHandContents)
    playerHandContainer.removeChild(playerHandContents[i])
  
    }

    dealerHand = []
    playerHand = []
    pPoints == 0
    dPoints = 0

    document.getElementById("deal-button").disabled = false;
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;

    document.getElementById('messages2').innerHTML = 'Press "Deal" button to deal new cards'
    document.getElementById('messages').innerHTML = '' 
    document.getElementById('messages3').innerHTML = ''
    
    pPoints = playerPoints()
    document.getElementById('ptotal').innerHTML = 'Player: ' + pPoints
    console.log(pPoints)

    dPoints = dealerPoints()
    document.getElementById('dtotal').innerHTML = 'Dealer: ' + dPoints
    console.log(dPoints)
    
    
}

restartButton.addEventListener('click', (e)=>{
    pPoints = dPoints = 0
    restart()
    console.log('new game?')
    
})

// window.addEventListener('DOMContentLoaded', function() {
//     // Execute after page load
//   })