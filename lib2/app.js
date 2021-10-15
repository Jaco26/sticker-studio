import { setupCanvas } from './canvas.js'
import { createRect } from './rect.js'


// function createRect(x, y, w, h) {

//     const dimensions = { x, y, w, h }
//     let fillStyle = ''

//     let handles = null

//     const idleState = {
//         draw(ctx) {

//         },
//         isHit(x, y) {

//         },
//     }

//     const selectedState = {
//         draw(ctx) {

//         },
//         isHit(x, y) {
            
//         },
//     }

//     let state = idleState

//     function setDimensions({ x, y, w, h } = {}) {
//         dimensions.x = x || dimensions.x
//         dimensions.y = y || dimensions.y
//         dimensions.w = w || dimensions.w
//         dimensions.h = h || dimensions.h
//     }

//     return {
//         setDimensions,
//     }
// }

/**
 * 
 * @param {import('./canvas').Canvas} canvas 
 */
function createMouseInput(canvas) {

    const observers = []

    const notify = (type, { mouseX, mouseY }) => {
        observers.forEach(observer => {
            observer.onNotify(type, { mouseX, mouseY })
        })
    }

    canvas.on('mousedown', e => {

        notify('mousedown', { mouseX: e.offsetX, mouseY: e.offsetY })

        canvas.on('mousemove', e => {

            notify('mousemove', { mouseX: e.offsetX, mouseY: e.offsetY })
            
        })

    })

    canvas.on('mouseup', e => {

        notify('mouseup', { mouseX: e.offsetX, mouseY: e.offsetY })

        canvas.off('mousemove')

    })

    return {
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
 * @param {import('./canvas').Canvas} canvas 
 */
const createElements = (canvas) => {
    const elements = []

    const draw = () => {
        canvas.clear()
        canvas.draw((main, overlay) => {
            elements.forEach(elem => {
                elem.draw(main, overlay)
            })
        })
    }

    return {
        addElement(elem) {
            elements.push(elem)
            draw()
        },
        onNotify(type, { mouseX, mouseY }) {
            if (['mousedown', 'mousemove', 'mouseup'].includes(type)) {
                elements.forEach(elem => {
                    elem.handleInput({ type, x: mouseX, y: mouseY })
                })
                draw()
            }
        }
    }
}


export function main() {

    const canvas = setupCanvas({
        containerID: 'canvas',
        width: 800,
        height: 600
    })

    const rect1= createRect(40, 40, 100, 75)
    rect1.fillStyle('blue')
    rect1.strokeStyle('red')

    const rect2 = createRect(120, 400, 100, 75)
    rect2.fillStyle('blue')
    rect2.strokeStyle('red')

    const elements = createElements(canvas)

    elements.addElement(rect1)
    elements.addElement(rect2)

    const mouseInput = createMouseInput(canvas)

    mouseInput.addObserver(elements)

}