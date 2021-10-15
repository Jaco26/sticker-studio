
const mouseEvt = e => ({ x: e.offsetX, y: e.offsetY })

class UserInput {

    constructor() {
        this.observers = []
    }

    setup(canvas) {
        canvas.on('mousedown', e => {
            this.notify('mousedown', mouseEvt(e))
            canvas.on('mousemove', e => {
                this.notify('mousedown+mousemove', mouseEvt(e))
            })
        })
        canvas.on('mouseup', e => {
            this.notify('mouseup', mouseEvt(e))
        })
    }

    notify(type, payload) {
        this.observers.forEach(ob => ob.onNotify(type, payload))
    }

    addObserver(ob) {
        this.observers.push(ob)
    }

    removeObserver(ob) {
        this.observers.splice(this.observers.indexOf(ob), 1)
    }
}


class Physics {
    rectIsHit(rect, x, y) {
        return (
            rect.x <= x &&
            rect.x + rect.w >= x &&
            rect.y <= y &&
            rect.y + rect.h >= y
        )
    }
}



class ElemSelectionBoxState {

}

class ElemResizeState {

}

class ElemMoveState {
    constructor(mouseX, mouseY) {
        this.initMouseX = mouseX
        this.initMouseY = mouseY
    }
    onDrag(rect, mouseX, mouseY) {
        rect.x = mouseX - this.initMouseX
        rect.y = mouseY - this.initMouseY
    }
}


class Elements {
    constructor() {
        this.physics = new Physics()
        this.elements = []
        this.selected = []
    }

    addElement(elem) {
        this.elements.push(elem)
    }

    onMousedown(x, y) {
        // delegate to State
        // if mousedown is on rect or rect handles, mousemove will move or resize the rect
        // if mousedown is on empty canvas, mousemove will create selection box that will select all elements with area inside of it

    }

    onMousedownMousemove(x, y) { }

    onMouseup(x, y) { }

    onNotify(type, payload) {
        if (type === 'mousedown') return this.onMousedown(payload.x, payload.y)
        if (type === 'mousedown+mousemove') return this.onMousedownMousemove(payload.x, payload.y)
        if (type === 'mouseup') return this.onMouseup(payload.x, payload.y)
    }
}