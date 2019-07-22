var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(account => account.amount >=  100000);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset.bankBalances.reduce(function(accumulator, current){
  return accumulator + parseInt(current.amount);
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

var sumOfInterests = dataset.bankBalances.reduce(function(accumulator, current){
  if (['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].includes(current.state)){
    return accumulator + Math.round((((parseInt(current.amount)) * 0.189))); 
  } else {
    return accumulator;
  }
}, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = dataset.bankBalances.reduce(function(obj, current){
  if(!obj[current.state]){
    obj[current.state] = Math.round(parseInt(current.amount));
  } else {
    obj[current.state] += Math.round(parseInt(current.amount));
  }
  return obj;
}, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
let sumStateArr = Object.entries(stateSums).map(function(key){
  return key;
})
var sumOfHighInterests = sumStateArr.reduce(function(accumulator, current){
  if (['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].includes(current[0]) === false){
    let interest = Math.round((((Number(current[1])) * 0.189))); 
    if (interest > 50000){
      return accumulator + interest;
    } else {
      return accumulator;
    }
  } else {
    return accumulator;
  }
}, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

var lowerSumStates = sumStateArr.reduce(function(accumulator, current){
  if (current[1] < 1000000){
    accumulator.push(current[0]);
  } 
  return accumulator;
}, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = sumStateArr.reduce(function(accumulator, current){
  if (current[1] > 1000000){
    return accumulator + current[1];
  } else {
    return accumulator;
  }
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = sumStateArr.every(function(current){
  if (['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].includes(current[0]) === false){
    return current[1] > 1000000;
  }
});

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = sumStateArr.some(function(current){
  if (['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].includes(current[0])){
    return current[1] > 2550000;
  }
});


module.exports = {
  hundredThousandairs : hundredThousandairs,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
