import { setupDOMRefs } from './lib/dom-refs.js'
import { setupCanvas } from './lib/canvas.js'
// import { createRect } from './lib/drawing.js'
import { setupElements } from './lib/elements.js'
import { setupEvents } from './lib/events.js'

import { rectHandles, createRect } from './lib/shapes/rect.js'

const canvas = setupCanvas({ containerID: 'canvas' })

const rect = createRect(150, 100, 100, 400)

const handles = rectHandles(rect.dimensions())

canvas.draw((main, overlay) => {
    rect.fillStyle('#88c')
    rect.strokeStyle('#88c')
    rect.draw(main)
    handles.draw(overlay)
})

canvas.on('mousedown', mdEvt => {

    const { offsetX, offsetY } = mdEvt

    const resizeRect = handles.isHit(offsetX, offsetY)

    if (resizeRect) {

        canvas.on('mousemove', mmEvt => {

            const { offsetX, offsetY } = mmEvt

            resizeRect(rect, offsetX, offsetY)

            handles.update(rect.dimensions())

            canvas.clear()

            canvas.draw((main, overlay) => {

                rect.draw(main)
            
                handles.draw(overlay)

            })

        })

    } else if (rect.isHit(offsetX, offsetY)) {

        // TODO: commented code below is buggy
        
        // canvas.on('mousemove', mmEvt => {

        //     const { x, y } = rect.dimensions()

        //     rect.setDimensions({
        //         x: mmEvt.offsetX - x,
        //         y: mmEvt.offsetY - y
        //     })

        //     handles.update(rect.dimensions())

        //     canvas.clear()

        //     canvas.draw((main, overlay) => {

        //         rect.draw(main)

        //         handles.draw(overlay)

        //     })

        // })

    }


})

canvas.on('mouseup', mouseupEvt => {

    canvas.off('mousemove')

})


// // / / // // /  / / // /// / / // /

// const backgroundState = {
//     mode: 'BLUE',
//     options: {
//         BLUE: {
//             update(main, overlay) {
//                 main.clearRect(0, 0, canvas.width(), canvas.height())
//                 main.beginPath()
//                 main.fillStyle = 'blue'
//                 main.fillRect(0, 0, canvas.width(), canvas.height())
//                 main.closePath()
//                 this.mode = 'ORANGE'
//             },
//         },
//         ORANGE: {
//             update(main, overlay) {
//                 main.clearRect(0, 0, canvas.width(), canvas.height())
//                 main.beginPath()
//                 main.fillStyle = 'orange'
//                 main.fillRect(0, 0, canvas.width(), canvas.height())
//                 main.closePath()
//                 this.mode = 'BLUE'
//             }
//         }
//     }
// }


// const lineState = {
//     mode: 'START',
//     x: null,
//     y: null,
//     options: {
//         START: {
//             handleInput(x, y) {
//                 this.x = x
//                 this.y = y
//             },
//             update(main, overlay) {
//                 overlay.beginPath()
//                 overlay.strokeStyle = 'white'
//                 overlay.moveTo(this.x, this.y)
//                 this.mode = 'DRAWING'
//             }
//         },
//         DRAWING: {
//             handleInput(x, y) {
//                 this.x = x
//                 this.y = y
//             },
//             update(main, overlay) {
//                 overlay.lineTo(this.x, this.y)
//                 overlay.stroke()
//             }
//         },
//         FINISH: {
//             handleInput(x, y) {
//                 this.x = x
//                 this.y = y
//             },
//             update(main, overlay) {
//                 overlay.lineTo(this.x, this.y)
//                 overlay.closePath()
//                 this.mode = 'START'
//                 this.x = null
//                 this.y = null
//             }
//         },
//     }
// }


// canvas.on('mousedown', (e) => {
    
//     canvas.draw((main, overlay) => {

//         backgroundState.options[backgroundState.mode].update.call(backgroundState, main, overlay)

//         lineState.options[lineState.mode].handleInput.call(lineState, e.offsetX, e.offsetY)

//         lineState.options[lineState.mode].update.call(lineState, main, overlay)

//     })

//     canvas.on('mousemove', e => {

//         canvas.draw((main, overlay) => {

//             lineState.options[lineState.mode].handleInput.call(lineState, e.offsetX, e.offsetY)

//             lineState.options[lineState.mode].update.call(lineState, main, overlay)

//         })

//     })
// })

// canvas.on('mouseup', e => {

//     canvas.off('mousemove')

//     canvas.draw((main, overlay) => {

//         overlay.closePath()

//         backgroundState.options[backgroundState.mode].update.call(backgroundState, main, overlay)

//         lineState.mode = 'FINISH'

//         lineState.options[lineState.mode].handleInput.call(lineState, e.offsetX, e.offsetY)

//         lineState.options[lineState.mode].update.call(lineState, main, overlay)

//     })
// })




// / / // /// // / // // // /



// const elements = setupElements()

// const events = setupEvents()

// events.on('NEW_RECT', () => {
//     const cvsWidth = canvas.width()
//     const cvsHeight = canvas.height()
//     const rect = createRect(
//         cvsWidth - (cvsWidth / 2 + 50),
//         cvsHeight - (cvsHeight / 2 + 50),
//         100,
//         100
//     )
//     rect.strokeStyle('#333')
//     elements.addElement(rect)
// })

// events.on('TRY_SELECT', () => {

// })


// function draw() {
//     canvas.draw((main, overlay) => {
//         elements.getElements().forEach(elem => elem.draw(main))
//     })
// }


// canvas.on('mousedown', e => {
//     const elem = elements.trySelect(e.offsetX, e.offsetY)
//     console.log(elem)

// })

// setupDOMRefs({
//     elems: {
//         container: '.side-bar',
//         menuTrigger: '.header__menu-trigger',
//         content: '.side-bar__content',
//         main: '.main',
//         btnCircle: '#create-circle',
//         btnRect: '#create-rectangle'
//     },
//     events: {
//         menuTrigger: [
//             'click',
//             (elems, evt) => {
//                 const action = elems.content.classList.contains('side-bar__content--active')
//                     ? 'remove'
//                     : 'add'
//                 elems.content.classList[action]('side-bar__content--active')
//                 elems.menuTrigger.classList[action]('header__menu-trigger--active')
//                 elems.main.classList[action]('main--side-bar-active')
//             }
//         ],
//         btnRect: [
//             'click',
//             () => {
//                 events.emit('NEW_RECT')
//                 events.flush()
//                 draw()
//             }
//         ]
//     }
// })

