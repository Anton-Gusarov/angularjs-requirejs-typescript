/// <reference path='typings/all_node.d.ts' />

export class Sequental {

    private completed = 0;

    constructor (private tasks: Function[], private cb: Function) {

        this.next();

    }

    public next () {
        if (!this.tasks[this.completed]) {
            return this.cb();
        }

        this.tasks[this.completed](()=>{
            this.completed++;
            this.next();
        });
    }

}