import { setupCanvas } from './lib2/canvas'
import { createRect } from './lib2/rect'


export function setupObserver() {
    const observers = []

    return {
        notify(type, payload) {
            observers.forEach(ob => {
                ob.onNotify(type, payload)
            })
        },
        addObserver(ob) {
            observers.push(ob)
        },
        removeObserver(ob) {
            observers.splice(observers.indexOf(ob), 1)
        }
    }

}

/**
 * 
 * @param {import('./lib2/canvas').Canvas} canvas 
 * @returns 
 */
function createInputManager(canvas) {

    const { notify, addObserver, removeObserver } = setupObserver()

    canvas.on('mousedown', ({ offsetX, offsetY }) => {

        notify('mousedown', { offsetX, offsetY })

        canvas.on('mousemove',({ offsetX, offsetY }) => {

            notify('mousemove', { offsetX, offsetY })

        })
    })

    canvas.on('mouseup', ({ offsetX, offsetY }) => {

        notify('mouseup', { offsetX, offsetY })

        canvas.off('mousemove')

    })

    return { addObserver, removeObserver }

}




function setupElements() {
    const elements = []

    const physics = setupObserver()

    return {
        addRect({ x, y, w, h, fillStyle = '', strokeStyle = '' } = {}) {
            elements.push({ x, y, w, h, fillStyle, strokeStyle })
        },
        remove(elem) {
            elements.splice(elements.indexOf(elem), 1)
        }
    }
}


function setupPhysics() {



    const updateRect = (rect, { x, y, w, h } = {}) => {
        rect.x = x || rect.x
        rect.y = y || rect.y
        rect.w = w || rect.w
        rect.h = h || rect.h
    }

    return {
        rectIsHit() {

        },
        rectUpdateDimensions(rect, { x, y, w, h } = {}) {
            rect.x = x || rect.x
            rect.y = y || rect.y
            rect.w = w || rect.w
            rect.h = h || rect.h
        },
    }
}


const elements = [
    createRect(30, 30, 40, 40)
]


const canvas = setupCanvas({ containerID: 'canvas' })
const input = createInputManager(canvas)






















































class Elements {
    constructor() {
        this.elements = []
    }
    paint(main, overlay) {

    }
}


class Observer {
    /**
     * 
     * @param {string} type 
     * @param {*} payload 
     */
    onNotify(type, payload) {
        throw new Error('onNotify: NOT_IMPLEMENTED')
    }
}

class Subject {
    /**
     * @type {Observer[]}
     */
    observers = []

    /**
     * 
     * @param {string} type 
     * @param {*} payload 
     */
    notify(type, payload) {
        this.observers.forEach(observer => observer.onNotify(type, payload))
    }
}


class Paintbrush {
    /**
     * 
     * @param {CanvasRenderingContext2D} main 
     * @param {CanvasRenderingContext2D} overlay 
     */
    constructor(main, overlay) {
        this.main = main
        this.overlay = overlay
    }

    /**
     * 
     * @param {Rect} rect 
     */
    _paintRect(rect) {
        const { x, y, w, h, fillStyle, strokeStyle, isSelected } = rect


    }
}


class Handles {
    constructor(rectDimensions) {
        this.rectDimensions = rectDimensions

    }
}


class ResizeRectState {
    update(rect, x, y) {

    }
}

class MoveRectState {
    update(rect, x, y) {

    }
}

class Rect {
    fillStyle = ''
    strokeStyle = ''

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
}



