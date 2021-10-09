


/**
 * @typedef Canvas
 * @property {(w?: number) => number} width
 * @property {(h?: number) => number} height
 * @property {(cb: (mainCtx: CanvasRenderingContext2D, overlayCtx: CanvasRenderingContext2D))} draw
 * @property {(type: 'mousedown'|'mouseenter'|'mouseleave'|'mousemove'|'mouseout'|'mouseover'|'mouseup', listener: (evt: MouseEvent))} on
 * @property {(type: 'mousedown'|'mouseenter'|'mouseleave'|'mousemove'|'mouseout'|'mouseover'|'mouseup')} off
 */

const MOUSE_EVENTS = [
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup'
]

const validateMouseEventType = type => {
    if (!MOUSE_EVENTS.includes(type)) {
        throw new Error('Invalid event type. Must be one of:', MOUSE_EVENTS.join(','))
    }
}

/**
 * 
 * @returns {Canvas}
 */
export function setupCanvas({ containerID = '', width = 600, height = 600  } = {}) {

    const container = document.getElementById(containerID)

    if (!container) {
        throw new Error('Invalid containerID')
    }

    const main = document.createElement('canvas')
    const overlay = document.createElement('canvas')

    const mainCtx = main.getContext('2d')
    const overlayCtx = overlay.getContext('2d')

    const listeners = {}

    /**
     * @type {Canvas}
     */
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
            validateMouseEventType(type)
            if (listeners[type]) {
                this.off(type)
            }
            listeners[type] = listener
            overlay.addEventListener(type, listener)
        },
        off(type) {
            validateMouseEventType(type)
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