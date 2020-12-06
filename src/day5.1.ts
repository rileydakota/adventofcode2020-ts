
//replace with better logic
const inputData = `FFBFFBBLRL
FBFBBFBLRR
FBFFBBBRLL
FFBBFBFRRR
BFBBBBFLRR
`

let rowArray: number[] = [...Array(128).keys()]
let columnArray: number[] = [...Array(8).keys()]

//console.log(rowArray)

function LocateRow (airlineArray: number[], seatCode: string ) {
  let result: number[] = airlineArray
  let len: number
  let mid: number
  let rowCode = seatCode.split('').slice(0,7)

  for (let char in rowCode){
    switch (rowCode[char]) {
      case "F":
        len = result.length;
        mid = Math.ceil(len/2);
        result = result.slice(0,mid);
        break;
      case 'B':
        len = result.length;
        mid = Math.ceil(len/2);
        result = result.slice(mid);
        break;
      default:
        console.log('error');
        throw "Invalid Value - must be either F or B";
    }
  }
  return result[0]
  }
  


function LocateSeat ( columnArray: number[], seatCode: string) {
  let columnCode = seatCode.split('').slice(7)
  let result = columnArray
  let len: number
  let mid: number

for (let char in columnCode){
    switch (columnCode[char]) {
      case "L":
        len = result.length;
        mid = Math.ceil(len/2);
        result = result.slice(0,mid);
        break;
      case 'R':
        len = result.length;
        mid = Math.ceil(len/2);
        result = result.slice(mid);
        break;
      default:
        console.log('error');
        throw "Invalid Value - must be either L or R";
    }
  }
  return result[0]

}

function GetSeatId (row: number, column: number): number{
  const answer = (row * 8) + column
  return answer
}

const testSeatCode = 'FBFBBFFRLR'
const testLocateRow = LocateRow(rowArray, testSeatCode)
console.log('row is ' + testLocateRow)
const testLocateSeat = LocateSeat(columnArray, testSeatCode)
console.log('column is ' + testLocateSeat)
const testGetSeatId = GetSeatId(testLocateRow, testLocateSeat)
console.log('seatId is ' + testGetSeatId)

function answer(){
  const boardingCodeArray = inputData.split('\n');
  let highestSeatId = 0
  for (let x in boardingCodeArray) {
    let boardingCode = boardingCodeArray[x]
    let seatRow = LocateRow(rowArray, boardingCode)
    let seatColumn = LocateSeat(columnArray, boardingCode)
    let seatCodeId = GetSeatId(seatRow, seatColumn)
    if (seatCodeId > highestSeatId) {
      highestSeatId = seatCodeId
    }
  }
  return highestSeatId
}

console.log(answer())
