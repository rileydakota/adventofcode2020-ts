import * as day1prob1 from './src/day1.1';
import * as day2prob2 from './src/day1.2';


//const answerday1 = day1prob.answer()
//day1prob.answer().then(function (result){console.log('Problem 1 answer is: ' + result)})


async function solveAll(){
   const day1answer1 = await day1prob1.answer()
   console.log('day1 answer1 is ' + day1answer1)
   const day1answer2 = await day2prob2.answer()
   console.log('day1 answer2 is ' + day1answer2)
}

solveAll()