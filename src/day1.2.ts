import axios from 'axios'

const inputUrl = 'https://adventofcode.com/2020/day/1/input'
let session = process.env.github_session

// export function getInput(inpurtUrl:string){
//     const result = axios.get(inpurtUrl, {headers: {cookie:'session='+session}, withCredentials: true})//.then((response) => {
//     //console.log(result.data)
//     //let array : string[] = result.data.split('\n')
//         //console.log(array)
//     //let numArray : number[] = array.map(Number)
//         //console.log(numArray)
//     return result
//     }

export function convertToNum(input:any) {
    let array : string = input.data
    let stringArray: string[] = array.split('\n')
    let numArray : number[] = stringArray.map(Number)
    return numArray
}

export async function answer(){
    const input = await axios.get(inputUrl, {headers: {cookie:'session='+session}, withCredentials: true})
    //console.log(input)

    //const input = await getInput(inputUrl)
    const inputArray =  convertToNum(input)

    for (let val1 in inputArray ) {
        //console.log(inputArray[val1])
        let expenseval = inputArray[val1]
        for (let val2 in inputArray) {
            let otherExpenseVal = inputArray[val2]
            //console.log(otherExpenseVal)
            //let sum = expenseval + otherExpenseVal//expense + otherExpense
            for ( let val3 in inputArray) {
                let expenseval3 = inputArray[val3]
                let sum = expenseval + otherExpenseVal + expenseval3
                if (sum === 2020) {
                let answer = expenseval*otherExpenseVal*expenseval3
                console.log(answer)
                return answer
            //    console.log(expense*otherExpense)
            }}
            //break
        }
    }
    //return answer
}
