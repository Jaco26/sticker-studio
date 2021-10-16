
export interface State {
    handleInput(x: number, y: number): Dict<any>
    update(): string|void
}

type Dict<T> = { [key: string]: T}

export class FiniteStateMachine {
    states: Dict<State> = {}
    private currentState = ''

    private initialState: string
    private data: Dict<any>

    constructor(initialState: string, data: Dict<any>) {
        this.initialState = initialState
        this.currentState = initialState
        this.data = data
    }

    private get _data() {
        return this.data
    }

    reset() {
        this.currentState = this.initialState
    }

    addState(name: string, state: State) {
        this.states[name] = state
    }

    handleInput(x: number, y: number) {
        this.data = {
            ...this.data,
            ...this.states[this.currentState].handleInput.call(this._data, x, y)
        }
    }

    update() {
        const nextState = this.states[this.currentState].update.call(this._data)
        if (nextState) {
            this.currentState = nextState
        }
    }
}

