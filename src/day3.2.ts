import axios, { AxiosResponse } from 'axios'
import { exception } from 'console';
import { stringify } from 'querystring';



const inputUrl = 'https://adventofcode.com/2020/day/3/input'
let session = process.env.github_session

interface Coord {
    hasTree : boolean
}

interface PlayerPos {
    x: number,
    y: number
}

// 0 [ 0 1 2 3 4 5 ]
// 1 [ 0 1 2 3 4 5 ]
// 2 [ 0 1 2 3 4 5 ]

export class Map {
    rawMapData: string;
    parsedMapData: Coord[][] = []
    currentPlayerPos: PlayerPos = {x: 0, y: 0}
    
    // the farthest a player can travel right before reset
    xbounds: number

    // the farthest a play can travel down before end
    ybounds: number

    constructor(mapData: string) {
        this.rawMapData = mapData;
        let splitMapData = this.rawMapData.split('\n')
        let numXPos = splitMapData[0].length
        this.xbounds = numXPos - 1
        this.ybounds = splitMapData.length -1

        
        for (let step = 0; step < numXPos; step++){
            this.parsedMapData.push(new Array)
        }
        //adding the arrays for x coordinates

        for (let yRow in splitMapData) {
            const charArray = splitMapData[yRow].split('')
            for (let xChar in charArray){
                //let coord
                switch(charArray[xChar]){
                    case '.':
                        //let coord : Coord = {hasTree: false}
                        this.parsedMapData[xChar].push({hasTree: false})
                        break;
                    case '#':
                        //let coord
                        this.parsedMapData[xChar].push({hasTree: true})
                        break;
                    default:
                        console.log(charArray[xChar])
                        exception('unsupported char in provided map')
                        break;
                }
                //this.parsedMapData[xChar].push(charArray[xChar])
            }
            //switch (splitMapData[yRow])
        }

    }
    moveRight(increment: number){
        
        //where we plan to be
        let sum = this.currentPlayerPos.x + increment
        
        //check if it puts us out of bounds
        if (sum > this.xbounds ) {
            //console.debug('player went out of bounds - resetting x')
            //console.debug('sum: ', sum)
            let diff = sum - this.xbounds
            //console.debug('diff: ', diff)
            //let remainder = increment - diff
            //console.debug('remainder: ', remainder)
            this.currentPlayerPos.x = diff - 1
            return
        }
        else {
            this.currentPlayerPos.x = this.currentPlayerPos.x + increment
            return
        }
        
        //this.currentPlayerPos.x = this.currentPlayerPos.x + increment
    }
    moveDown(increment: number){
        
        //where we plan to be
        let sum = this.currentPlayerPos.y + increment
        if (sum > this.ybounds - 1){
            console.debug('end of map reached')
            throw exception('end of map reached')
            
        }
        else {
            this.currentPlayerPos.y = sum
        }
        //this.currentPlayerPos.y = this.currentPlayerPos.y + increment

        
    }
    standingOnTree(){
        const status: boolean = this.parsedMapData[this.currentPlayerPos.x][this.currentPlayerPos.y].hasTree
        return status
    }

}

function countTreesFromSlope(map: Map, x: number, y: number){
    let treeCounter: number = 0
    console.log(map.ybounds)
    console.log(map.parsedMapData[0].length)

    for (let step = 0; step < map.ybounds-1; step++){
        map.moveRight(x)
        map.moveDown(y)
        if (map.standingOnTree() == true ){
            treeCounter++
        }
    }
}

export async function answer(){
    const input = await axios.get(inputUrl, {headers: {cookie:'session='+session}, withCredentials: true})
    //console.log(input.data)
    const map = new Map(input.data)
    const slope1 = countTreesFromSlope(map, 1,1)
    const slope2 = countTreesFromSlope(map, 3,1)
    const slope3 = countTreesFromSlope(map, 5,1)
    const slope4 = countTreesFromSlope(map, 7,1)
    

    console.log(slope1, slope2, slope3, slope4)
    // for (let step in map.parsedMapData[0]) {
    //     console.log('iter')
    //     map.moveRight(3)
    //     map.moveDown(1)
    //     if (map.standingOnTree() == true ){
    //         treeCounter++
    //     }
        
    // }
    return slope2
}

