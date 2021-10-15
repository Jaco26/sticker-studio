import { Canvas } from './interfaces'

export const makeCanvas = ({ constainerID = '', width = 600, height = 600 }): Canvas => {

    const container = document.getElementById(constainerID)

    if (!container) {
        throw new Error('Invalid containerID')
    }

    const main = document.createElement('canvas')
    const overlay = document.createElement('canvas')

    const mainCtx = main.getContext('2d')
    const overlayCtx = overlay.getContext('2d')

    const listeners = {}

    const pub = {
        width(w) {
            if (w != undefined) {
                main.width = w
                overlay.width = w
            }
            return main.width
        },
        height(h) {
            if (h != undefined) {
                main.height = h
                overlay.height = h
            }
            return main.height
        },
        draw(cb) {
            cb(mainCtx, overlayCtx)
        },
        clear() {
            mainCtx.clearRect(0, 0, this.width(), this.height())
            overlayCtx.clearRect(0, 0, this.width(), this.height())
        },
        on(type, listener) {
            if (listeners[type]) {
                this.off(type)
            }
            listeners[type] = e => listener(e as MouseEvent)
            overlay.addEventListener(type, listeners[type])
        },
        off(type) {
            if (listeners[type]) {
                overlay.removeEventListener(type, listeners[type])
                delete listeners[type]
            }
        }
    }

    pub.width(width)
    pub.height(height)

    container.style.border = '1px solid orange'
    container.style.display = 'flex'

    overlay.style.position = 'absolute'

    container.appendChild(main)
    container.appendChild(overlay)

    return pub

}