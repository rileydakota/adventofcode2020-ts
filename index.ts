import * as day1prob1 from './src/day1.1';
import * as day1prob2 from './src/day1.2';
import * as day2prob1 from './src/day2.1';
import * as day2prob2 from './src/day2.2';
import * as day3prob1 from './src/day3.1';
import * as day3prob2 from './src/day3.2';


//const answerday1 = day1prob.answer()
//day1prob.answer().then(function (result){console.log('Problem 1 answer is: ' + result)})

let testString = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`

async function solveAll(){
   const day1answer1 = await day1prob1.answer()
   console.log('day1 answer1 is ' + day1answer1)
   const day1answer2 = await day1prob2.answer()
   console.log('da3y1 answer2 is ' + day1answer2)
   const day2answer1 = await day2prob1.answer()
   console.log('day2 answer1 is ' + day2answer1)
   const day2answer2 = await day2prob2.answer()
   console.log('day2 answer2 is ' + day2answer2)
   const test = new day3prob1.Map(testString) //Map(MapData:testString)
   const day3answer1 = await day3prob1.answer()
   console.log(day3answer1)
   const day3answer2 = await day3prob2.answer()
   console.log(day3answer2)
}

//day2prob1.answer()
solveAll()