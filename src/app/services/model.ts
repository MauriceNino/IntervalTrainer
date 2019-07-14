export class Plan{
    constructor(){

    }
    planName: string=""
    iterations: Iteration[]=[]
}

export class Iteration{
    constructor(){

    }
    active: number=0
    pause: number=0
    repeats: number=0
    pauseAfter: number=0
}