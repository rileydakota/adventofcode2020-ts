import axios, { AxiosResponse } from 'axios'



const inputUrl = 'https://adventofcode.com/2020/day/2/input'
let session = process.env.github_session


// Example List of Passwords
// 1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc
//
// first number is minimum number of required char for policy
// second number is max number of required char for policy
// letter is the required char for policy
// 4th string is the password to audit agasint the policy

enum PasswordStatus { too_few= "Too Few", too_many="Too Many", compliant="Compliant" }

interface CorporatePasswordEvalObject {
    PolicyChar : string
    MinVal: number,
    MaxVal: number,
    Password: string
}

interface ComplianceObject {
    Compliant: boolean,
    Detail: PasswordStatus
    PasswordEvalObject:CorporatePasswordEvalObject

}


export function ParsePolicy(line: string): CorporatePasswordEvalObject {
    const splitString = line.split(' ');
    const splitVals = splitString[0].split('-')
    const splitNums = splitVals.map(Number)

    let truncPolicyChar = splitString[1]

    const minVal = splitNums[0]
    const maxVal = splitNums[1]
    const policyChar: string = truncPolicyChar
    const password: string = splitString[2]
    const result : CorporatePasswordEvalObject = {
        PolicyChar: policyChar,
        MinVal: minVal,
        MaxVal: maxVal,
        Password: password
    }
    return result
}

export function ParsePasswords(body:AxiosResponse): Array<CorporatePasswordEvalObject> {
    
    let CorporatePasswordPolicyArray = new Array<CorporatePasswordEvalObject>();
    
    const rawData = body.data
    const splitLines = rawData.split('\n')
    for (const line in splitLines){
        const object: CorporatePasswordEvalObject = ParsePolicy(splitLines[line])
        if (object.MaxVal === undefined || object.MinVal === undefined || object.PolicyChar === undefined || object.Password === undefined ){
            console.debug('empty value in array')
        }
        else {CorporatePasswordPolicyArray.push(object)}

    }
    return CorporatePasswordPolicyArray
}

function EvalCompliance(target: CorporatePasswordEvalObject): ComplianceObject {
    const char = target.PolicyChar.substring(0, target.PolicyChar.length -1);
    const passwordCharArray = target.Password.split('')
    let charCount : number = 0
    for (const iter in passwordCharArray){
       const arrayChar = passwordCharArray[iter]
       //console.log( char, arrayChar) 
       if (char == arrayChar){
            charCount++
        }
    }
    if (charCount < target.MinVal){ //|| charCount > target.MaxVal) {
        //console.log(charCount, target.MinVal, target.MaxVal, false)
        const returnObj:ComplianceObject = {
            Compliant: false,
            Detail: PasswordStatus.too_few,
            PasswordEvalObject: target
        }
        return returnObj }
    else if (charCount > target.MaxVal){
        const returnObj:ComplianceObject = {
            Compliant: false,
            Detail: PasswordStatus.too_many,
            PasswordEvalObject: target
        }
        return returnObj
    } 
    else {
        const returnObj:ComplianceObject = {
            Compliant: true,
            Detail: PasswordStatus.compliant,
            PasswordEvalObject: target
        }
        return returnObj
        //console.log(charCount, target.MinVal, target.MaxVal, true)
        //return true
    }



}

export async function answer(){
    const input = await axios.get(inputUrl, {headers: {cookie:'session='+session}, withCredentials: true})
    const ParsedPasswords = ParsePasswords(input)
    let nonComplianceCount: number = 0
    ParsedPasswords.forEach(function(value){
        const complianceResult = EvalCompliance(value)
        if (complianceResult.Compliant === true){
            nonComplianceCount++
        }
    })
    return nonComplianceCount    
}