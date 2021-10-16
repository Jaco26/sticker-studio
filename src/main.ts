import { makeCanvas } from './canvas.js'
import { Rect } from './interfaces.js'

const canvas = makeCanvas({ constainerID: 'canvas' })

const rect: Rect = {
    x: 40,
    y: 40,
    w: 50,
    h: 50,
    fillStyle: 'blue',
    strokeStyle: 'red'
}

const dragBox: Rect = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    fillStyle: '',
    strokeStyle: 'green'
}

function drawRect(ctx: CanvasRenderingContext2D, rect: Rect) {
    const { x, y, w, h, fillStyle, strokeStyle } = rect
    ctx.beginPath()
    ctx.fillStyle = fillStyle || 'transparent'
    ctx.strokeStyle = strokeStyle || 'transparent'
    ctx.rect(x, y, w, h)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
}


function paint() {
    canvas.clear()
    canvas.draw(main => {
        drawRect(main, rect)
        drawRect(main, dragBox)
    })    
} 

paint()

const dragStateData = {
    mouseDownX: null,
    mouseDownY: null,
    initRectXOffset: null,
    initRectYOffset: null,
}

interface State {
    handleInput(x: number, y: number)
    update(): State
}


const moveRectState: State = {
    handleInput(x: number, y: number) {
        rect.x = x - dragStateData.initRectXOffset 
        rect.y = y - dragStateData.initRectYOffset
    },
    update() {
        paint()
        return this
    }
}

const makeBoxState: State = {
    handleInput(x: number, y: number) {
        dragBox.x = dragStateData.mouseDownX
        dragBox.y = dragStateData.mouseDownY
        dragBox.w = x - dragBox.x
        dragBox.h = y - dragBox.y
    },
    update() {
        paint()
        return this
    }
}


const idleState: State = {
    handleInput(x: number, y: number) {
        dragStateData.mouseDownX = x
        dragStateData.mouseDownY = y
    },
    update() {
        const { mouseDownX, mouseDownY } = dragStateData
        if (
            rect.x <= mouseDownX &&
            rect.x + rect.w >= mouseDownX &&
            rect.y <= mouseDownY &&
            rect.y + rect.h >= mouseDownY
        ) {
            dragStateData.initRectXOffset = dragStateData.mouseDownX - rect.x
            dragStateData.initRectYOffset = dragStateData.mouseDownY - rect.y
            return moveRectState
        }
        return makeBoxState
    }
}

let state = idleState

canvas.on('mousedown', e => {
    state.handleInput(e.offsetX, e.offsetY)
    state = state.update()
    canvas.on('mousemove', e => {
        state.handleInput(e.offsetX, e.offsetY)
        state = state.update()
    })
})

canvas.on('mouseup', e => {
    canvas.off('mousemove')
    state = idleState
})

