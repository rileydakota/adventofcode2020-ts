//import { ParsePolicy, ParsePasswords } from './day2.1'
import axios, { AxiosResponse } from 'axios'
import { exception } from 'console';

//const inputUrl = 'https://webhook.site/01dab2df-2367-403a-8c8a-85a6d6cc7d08'
const inputUrl = 'https://adventofcode.com/2020/day/2/input'
let session = process.env.github_session


// 1-3 a: abcde 
// first number is first position
// second number is second position
// third character is the character to check for
// forth string is the password
// 
// ^ Check if char a exists in the first or and third char of the string, but not both

enum PasswordStatus { comp_exists_in_first='compliant - matches first position', comp_exists_in_last='compliant - matches last position', non_comp_exists_in_both='exists in both places', non_comp_exists_in_neither='exists in neither required spot' }

interface CorporatePasswordEvalObject {
    PolicyChar : string
    FirstPos: number,
    LastPos: number,
    Password: string
}

interface ComplianceObject {
    Compliant: boolean,
    Detail: PasswordStatus
    PasswordEvalObject:CorporatePasswordEvalObject

}



export function ParsePolicy(line: string): CorporatePasswordEvalObject {
    //const minVal, maxVal, policyChar, Password = string.split()
    const splitString = line.split(' ');
    const splitVals = splitString[0].split('-')
    const splitNums = splitVals.map(Number)
    //splitVals.localeCompare(Number)

    let truncPolicyChar = splitString[1]
    //truncPolicyChar = truncPolicyChar.substring(0, truncPolicyChar.length - 1);

    const firstPos = splitNums[0]
    const lastPos = splitNums[1]
    const policyChar: string = truncPolicyChar//.substring(0, splitString[1].length -1)
    const password: string = splitString[2]
    const result : CorporatePasswordEvalObject = {
        PolicyChar: policyChar,
        FirstPos: firstPos,
        LastPos: lastPos,
        Password: password
    }
    //result.PolicyChar.substring(0, result.PolicyChar.length -1);
    return result
}

export function ParsePasswords(body:AxiosResponse): Array<CorporatePasswordEvalObject> {
    
    let CorporatePasswordPolicyArray = new Array<CorporatePasswordEvalObject>();
    
    const rawData = body.data
    const splitLines = rawData.split('\n')
    for (const line in splitLines){
        const object: CorporatePasswordEvalObject = ParsePolicy(splitLines[line])
        if (object.FirstPos === undefined || object.LastPos === undefined || object.PolicyChar === undefined || object.Password === undefined ){
            console.debug('empty value in array')
        }
        else {CorporatePasswordPolicyArray.push(object)}

    }
    //console.log(CorporatePasswordPolicyArray)
    //CorporatePasswordPolicyArray.pop()


    return CorporatePasswordPolicyArray


}



function EvalCompliance(target: CorporatePasswordEvalObject): ComplianceObject {
    const char = target.PolicyChar.substring(0, target.PolicyChar.length -1);

    //console.log(char)
    const passwordCharArray = target.Password.split('')
    
    //substract 1 from Position values because computer science
    const firstPos = target.FirstPos -1
    const LastPos = target.LastPos -1
    //console.log(firstPos, LastPos)
    //non-compliant - both match
    if (passwordCharArray[firstPos] == char && passwordCharArray[LastPos] == char) {
       const returnObj: ComplianceObject = {
           Compliant: false,
           Detail: PasswordStatus.non_comp_exists_in_both,
           PasswordEvalObject: target
       }
       return returnObj
    }

    //non-compliant - neither match
    //console.log(passwordCharArray[firstPos], )
    if (passwordCharArray[firstPos] != char && passwordCharArray[LastPos] != char) {
        const returnObj: ComplianceObject = {
            Compliant: false,
            Detail: PasswordStatus.non_comp_exists_in_neither,
            PasswordEvalObject: target
        }
        return returnObj
    }
    
    //compliant - first position matches
    if (passwordCharArray[firstPos] == char) {
        const returnObj: ComplianceObject = {
            Compliant: true,
            Detail: PasswordStatus.comp_exists_in_first,
            PasswordEvalObject: target
        }
        return returnObj
    }
    
    //compliant - last position matches
    else { //(passwordCharArray[target.FirstPos] === target.PolicyChar) {
        const returnObj: ComplianceObject = {
            Compliant: true,
            Detail: PasswordStatus.comp_exists_in_last,
            PasswordEvalObject: target
        }
        return returnObj
    }
}


    export async function answer(){
        const input = await axios.get(inputUrl, {headers: {cookie:'session='+session}, withCredentials: true})
        //console.log(input.data)
        let ParsedPasswords = ParsePasswords(input)
        //ParsedPasswords = ParsedPasswords[0-10]
        let nonComplianceCount: number = 0
        //for (let x in ParsedPasswords) {
        ParsedPasswords.forEach(function(value){
            const complianceResult = EvalCompliance(value)
            //console.log(complianceResult)
            if (complianceResult.Compliant === true){
                //console.log(complianceResult)
                nonComplianceCount++
            }
        })
        //console.log('Number of non-compliant passwords: ' + nonComplianceCount)
        return nonComplianceCount    
        //}
    }