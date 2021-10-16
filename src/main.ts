import { makeCanvas } from './canvas.js'
import {
    createRect,
    rectDidCollideWithRect,
    rectDraw,
    rectIsHit,
    rectMove,
    rectResize,
} from './shapes/rect.js'

import { FiniteStateMachine } from './state.js'

const canvas = makeCanvas({ constainerID: 'canvas' })

const elements = [
    createRect(50, 50, 50, 50, 'blue', 'red'),
    createRect(150, 150, 50, 50, 'orange', 'brown'),
]

const [rect, rect2] = elements

const dragBox = createRect(0, 0, 0, 0, '', 'green')


function testCollision() {
    if (rectDidCollideWithRect(rect, dragBox)) {
        rect.fillStyle = 'red'
        dragBox.strokeStyle = 'red'
    } else {
        rect.fillStyle = 'blue'
        dragBox.strokeStyle = 'green'
    }
}

function paint() {
    canvas.clear()
    canvas.draw(main => {
        rectDraw(main, rect)
        rectDraw(main, rect2)
        rectDraw(main, dragBox)
    })    
} 

paint()

const stateMachine = new FiniteStateMachine('idle', {
    mousedownX: 0,
    mousedownY: 0,
    mousemoveX: 0,
    mousemoveY: 0,
})

stateMachine.addState('idle', {
    handleInput(x, y) {
        return {
            mousedownX: x,
            mousedownY: y
        }
    },
    update() {
        if (
            rectIsHit(rect, this.mousedownX, this.mousedownY) ||
            rectIsHit(rect2, this.mousedownX, this.mousedownY)
        ) {
            rect.dragOffsetX = this.mousedownX - rect.x
            rect.dragOffsetY = this.mousedownY - rect.y
            rect2.dragOffsetX = this.mousedownX - rect2.x
            rect2.dragOffsetY = this.mousedownY - rect2.y
            return 'move'
        }
        return 'drag'
    }
})

stateMachine.addState('move', {
    handleInput(x, y) {
        return {
            mousemoveX: x,
            mousemoveY: y
        }
    },
    update() {
        rectMove(rect, this.mousemoveX, this.mousemoveY)
        rectMove(rect2, this.mousemoveX, this.mousemoveY)
        testCollision()
        paint()
    }
})

stateMachine.addState('drag', {
    handleInput(x, y) {
        return {
            mousemoveX: x,
            mousemoveY: y
        }
    },
    update() {
        const { mousemoveX, mousemoveY, mousedownX, mousedownY } = this
        rectResize(dragBox, mousemoveX, mousemoveY, mousedownX, mousedownY)
        testCollision()
        paint()
    }
})

canvas.on('mousedown', e => {
    stateMachine.handleInput(e.offsetX, e.offsetY)
    stateMachine.update()
    stateMachine.handleInput(e.offsetX, e.offsetY)
    stateMachine.update()
    canvas.on('mousemove', e => {
        stateMachine.handleInput(e.offsetX, e.offsetY)
        stateMachine.update()
    })
})

canvas.on('mouseup', e => {
    canvas.off('mousemove')
    stateMachine.reset()
})

canvas.on('mouseleave', e => {
    canvas.off('mousemove')
    stateMachine.reset()
})