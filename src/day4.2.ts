let string = `byr:1983 iyr:2017
pid:796082981 cid:129 eyr:2030
ecl:oth hgt:182cm

iyr:2019
cid:314
eyr:2039 hcl:#cfa07d hgt:171cm ecl:#0180ce byr:2006 pid:8204115568

byr:1991 eyr:2022 hcl:#341e13 iyr:2016 pid:729933757 hgt:167cm ecl:gry

hcl:231d64 cid:124 ecl:gmt eyr:2039
hgt:189in
pid:#9c3ea1

ecl:#1f58f9
pid:#758e59
iyr:2022
hcl:z
byr:2016 hgt:68 eyr:1933`

let teststring1pass = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm'
let teststring1fail = 'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929'
let teststring2pass = 'hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm'
let teststring2fail = 'hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in'

const valid_values:string[] = ['byr','iyr','eyr','hgt','hcl','ecl','pid']

// validate value regex

let byr_re = /(?<=byr:)[1][9][2-9][0-9]|[2][0][0][0-2]$/
let iyr_re = /(?<=iyr:)[2][0][1][0-9]|[2][0][2][0]$/
let eyr_re = /(?<=eyr:)[2][0][2][0-9]|[2][0][3][0]$/
let hgt_re = /(?<=hgt:)([5][9]|[6][0-9]|[7][0-6])in$|(?<=hgt:)([1][5-8][0-9]|[1][9][0-3])cm$/
//let hgt_in_re = /(?<=hgt:)([5][9]|[6][0-9]|[7][0-6])in$/
let hcl_re = /(?<=hcl:)(#[a-z0-9]{6}$)/
let ecl_re = /(?<=ecl:)(gry|amb|brn|gry|grn|hzl|blu|oth)$/
let pid_re = /(?<=pid:)([0-9]{9})$/

//identify field regex

let byr = /^byr:.*/
let iyr = /^iyr:.*/
let eyr = /^eyr:.*/
let hgt = /^hgt:.*/
let hcl = /^hcl:.*/
let ecl = /^ecl:.*/
let pid = /^pid:.*/
let cid = /^cid:.*/

//teststring1fail.match(byr_re)

function CheckValidPassport (passportSingleLine: string) {
  //f (passport.search('hcl') != -1 && passport.search('iyr'))
  for (let cnt in valid_values){
    if (passportSingleLine.search(valid_values[cnt]) == -1){
      return false
    }
  }
  return true
}

function validateField (passportFielditem: string) {
  if (passportFielditem.match(byr)){
    if (passportFielditem.match(byr_re)){
      return true
    }
    else {return false}
  }
  else if (passportFielditem.match(iyr)){
    if (passportFielditem.match(iyr_re)){
      return true
    }
    else {return false}
  }
  else if (passportFielditem.match(eyr)){
    if (passportFielditem.match(eyr_re)){
      return true
    }
    else {return false}
  }
  else if (passportFielditem.match(hgt)){
    if (passportFielditem.match(hgt_re)){
      return true
    }
    else {return false}
  }
  else if (passportFielditem.match(hcl)){
    if (passportFielditem.match(hcl_re)){
      return true
    }
    else {return false}
  }
  else if (passportFielditem.match(ecl)){
    if (passportFielditem.match(ecl_re)){
      return true
    }
    else {return false}
  }
  else if (passportFielditem.match(pid)){
    if (passportFielditem.match(pid_re)){
      return true
    }
    else {return false}
  }
  else if (passportFielditem.match(cid)){
    return true
  }
  else {console.log('invalidfield'); return false}
  }


let testfield1pass = 'ecl:oth'
console.log('field is valid:' + validateField(testfield1pass) + ' ' + testfield1pass)
const split = string.split('\n')

  
CheckValidPassport(teststring1pass) //should be true
CheckValidPassport(teststring1fail) //missing hgt
CheckValidPassport(teststring2pass)  //only missing cid which is okay
CheckValidPassport(teststring2fail) //missing birth year


let passportBuffer : string = ''
let passportArray : string[] = []
let passportValidCount : number = 0

console.log(split.length)

for (iter in split){
  //console.log(iter)
  
  if (split[iter] === ''){
    passportArray.push(passportBuffer)
    passportBuffer = ''
  }

  passportBuffer = passportBuffer + ' ' + split[iter]
  if (iter == split.length -1){
    //console.log('does this code ever execute')
    passportArray.push(passportBuffer)
    passportBuffer = ''
  }
}

//console.log(passportArray)

for (let iter in passportArray) {
  let allfieldsvalid = true
  
  if (CheckValidPassport(passportArray[iter]) == true) {
    fieldArray = passportArray[iter].split(' ')
    //console.log(fieldArray)
    for (let fieldIter in fieldArray) { 
      //console.log(fieldIter)
      if (fieldArray[fieldIter] === '' ) { continue}
      else {validateField(fieldArray[fieldIter]); 
            if (validateField(fieldArray[fieldIter]) === false) {
              console.log('field invalid: ' + fieldArray[fieldIter]); 
              allfieldsvalid = false} 
            else{
              } }
    }
    
    if (allfieldsvalid === true) {passportValidCount++; allfieldsvalid = true}
  }
}

console.log(passportValidCount)
//console.log(passportArray[0].split(' '))
//should be 2

