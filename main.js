import { setupDOMRefs } from './lib/dom-refs.js'
import { setupCanvas } from './lib/canvas.js'
import { createRect } from './lib/drawing.js'

setupDOMRefs({
    elems: {
        container: '.side-bar',
        menuTrigger: '.header__menu-trigger',
        content: '.side-bar__content',
        main: '.main'
    },
    events: {
        menuTrigger: [
            'click',
            (elems, evt) => {
                const action = elems.content.classList.contains('side-bar__content--active')
                    ? 'remove'
                    : 'add'
                elems.content.classList[action]('side-bar__content--active')
                elems.menuTrigger.classList[action]('header__menu-trigger--active')
                elems.main.classList[action]('main--side-bar-active')
            }
        ]
    }
})

const canvas = setupCanvas({ containerID: 'canvas' })

const elements = []

canvas.on('mousedown', e => {
    canvas.clear()
    const rect = createRect(e.offsetX - 25, e.offsetY - 25, 50, 50)
    rect.fillStyle('orange')
    rect.strokeStyle('blue')
    elements.push(rect)
    canvas.draw(ctx => {
        elements.forEach(elem => elem.draw(ctx))
    })
})
