//
//  Initial data and settings
//
let moneyHave = 10;
const possibleMultipliers = [0.1, 0.5, 1.5, 3.0];
const states = [
  'tutorial',
  'game',
  'gameover'
];

// Setup game event system handler
window.addEventListener('onGameStateChanged', e => {
  const state = e.detail.newState;

  // Reset whole game data
  if (state === 'tutorial') {

    moneyHave = 10;
    $('#game .money').text(moneyHave);
    $('#game .given-money').text(0);
    $('#game .form-control-range').val(0);
  }

  // Set value of total money of user earnings
  if ( state === 'gameover') {
    $('#gameover .money').text(moneyHave)
  }
});

/*
  Function to change game state
 */
function goToState(newState) {
  //
  // Hide all steps instead of new state
  //
  states.forEach( state => {

    // Select div by jQuery
    const stateDiv = $(`#${state}`);

    // Check if from all states here is the new state.
    if (state === newState) {
      // Dispatch event to our event handler
      //
      // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
      //
      const event = new CustomEvent('onGameStateChanged',
        { detail : { newState: newState }}
      );
      window.dispatchEvent(event);

      // Show state block
      stateDiv.show()
    } else {

      // Hide others
      stateDiv.hide()
    }
  })
}

/*
  Game logic function
 */
function calculateProfit() {
  // Get what money user want to give
  const moneyToGive = parseInt(
    $('#game .given-money').text()
  );
  // Get what money user has left
  const restMoney = parseInt(
    $('#game .money').text()
  );

  // Get the random multiplier from given one
  const randomMultiplier = possibleMultipliers[
    Math.floor(Math.random() * possibleMultipliers.length)
  ];
  // Calculate the profit
  const resultMoney = moneyToGive * randomMultiplier;

  // Calculate the whole money what user has got from lottery
  return restMoney + resultMoney;
}

function calculateProfitAndQuit() {
  moneyHave = calculateProfit();
  // Moving to gameover state
  goToState('gameover')
}


function onSliderChange(val) {
  //
  // onChange event re-render values based on current range slider value
  //
  $('#game .money').text(moneyHave - val);
  $('#game .given-money').text(val);
}
