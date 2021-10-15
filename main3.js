import { setupCanvas } from './lib2/canvas.js'
import { setupObserver } from './main2.js'

const RECT = 'RECT'

const createRect = (x, y, w = 50, h = 50, fillStyle = '', strokeStyle = '') => ({
    type: RECT, x, y, w, h, fillStyle, strokeStyle, isSelected: false
})

const canvas = setupCanvas({ containerID: 'canvas' })

const physics = (() => {

    return {
        isHit(elem, x, y) {
            if (elem.type === RECT) {
                return (
                    elem.x <= x &&
                    elem.x + elem.w >= x &&
                    elem.y <= y &&
                    elem.y + elem.h >= y
                )
            }
        }
    }
})()


const paintbrush = (() => {

    const { notify, addObserver, removeObserver  } = setupObserver()
    
    return {
        addObserver,
        removeObserver,
        rect(ctx, { x, y, w, h, fillStyle, strokeStyle }) {
            ctx.beginPath()
            ctx.fillStyle = fillStyle || 'transparent'
            ctx.strokeStyle = strokeStyle || 'transparent'
            ctx.rect(x, y, w, h)
            ctx.stroke()
            ctx.fill()
            ctx.closePath()
        },
        onNotify(type, payload) {
            if (type === 'element_selected') {
                if (payload.type === RECT) {
                    canvas.draw((main, overlay) => {
                        this.rect(main, payload)
                    })
                }
            }
        }
    }
})()

const elements = (() => {

    const elems = [
        createRect(50, 50, 50, 50, 'yellow'),
        createRect(100, 100, 50, 50, 'red'),
        createRect(500, 400, 50, 50, 'green')
    ]

    const { notify, addObserver, removeObserver } = setupObserver()
    
    return {
        addObserver,
        removeObserver,
        paint() {
            canvas.draw((main, overlay) => {
                elems.forEach(elem => {
                    switch (elem.type) {
                        case RECT: paintbrush.rect(main, elem)
                    }
                })
            })
        },
        onNotify(type, payload) {
            if (type === 'mousedown') {
                const selected = elems.find(elem => physics.isHit(elem, payload.x, payload.y))
                if (selected) {
                    notify('element_selected')
                }
            }
        }
    }

})()


canvas.on('mousedown', e => {

    console.log(physics.isHit(elements.all(), e.offsetX, e.offsetY))

})


elements.paint()
