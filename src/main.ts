import { makeCanvas } from './canvas.js'
import { createRect, Rect } from './shapes/rect.js'

import { rectIsHit, rectDidCollideWithRect } from './physics.js'
import { rectDraw } from './brush.js'
import { FiniteStateMachine } from './state-machine.js'

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
        rectDraw(main, dragBox)
    })    
} 

paint()

const stateMachine = new FiniteStateMachine('idle', {
    mouseDownX: 0,
    mouseDownY: 0,
    XOffset: 0,
    YOffset: 0,
})

stateMachine.addState('idle', {
    handleInput(x, y) {
        this.mouseDownX = x
        this.mouseDownY = y
    },
    update() {
        if (rectIsHit(rect, this.mouseDownX, this.mouseDownY)) {
            this.XOffset = this.mouseDownX - rect.x
            this.YOffset = this.mouseDownY - rect.y
            return 'move'
        }
        return 'drag'
    }
})

stateMachine.addState('move', {
    handleInput(x, y) {
        rect.x = x - this.XOffset
        rect.y = y - this.YOffset
        testCollision()
    },
    update() {
        paint()
    }
})

stateMachine.addState('drag', {
    handleInput(x, y) {
        let _x = this.mouseDownX
        let _y = this.mouseDownY
        let _width = x - this.mouseDownX
        let _height = y - this.mouseDownY

        if (_width < 0) {
            _x = _x + _width
            _width = this.mouseDownX - _x
        }

        if (_height < 0) {
            _y = _y + _height
            _height = this.mouseDownY - _y
        }

        dragBox.x = _x
        dragBox.y = _y
        dragBox.w = _width
        dragBox.h = _height

        testCollision()
    },
    update() {
        paint()
    }
})

canvas.on('mousedown', e => {
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

