

const translateXStart = (rect, newX, newY) => {
    const { x, w } = rect.dimensions()
    rect.setDimensions({
        x: x + (newX - x),
        w: w - (newX - x)
    })
}

const translateXEnd = (rect, newX, newY) => {
    rect.setDimensions({
        w: newX - rect.dimensions().x
    })
}

const translateYStart = (rect, newX, newY) => {
    const { y, h } = rect.dimensions()
    rect.setDimensions({
        y: y + (newY - y),
        h: h - (newY - y)
    })
}

const translateYEnd = (rect, newX, newY) => {
    rect.setDimensions({ 
        h: newY - rect.dimensions().y
    })
}




export const rectHandles = ({ x, y, w, h }) => {
    const _state = { x, y, w, h }

    const size = 6
    const halfOfSize = size / 2

    const x1 = () => _state.x - halfOfSize
    const y1 = () => _state.y - halfOfSize
    const x2 = () => _state.x - halfOfSize + _state.w / 2
    const y2 = () => _state.y - halfOfSize + _state.h / 2
    const x3 = () => _state.x - halfOfSize + _state.w
    const y3 = () => _state.y - halfOfSize + _state.h

    const xy = [
        [
            x1,
            y1,
            (rect, x, y) => {
                translateXStart(rect, x, y)
                translateYStart(rect, x, y)
            }
        ],
        [
            x2,
            y1,
            translateYStart
        ],
        [
            x3,
            y1,
            (rect, x, y) => {
                translateXEnd(rect, x, y)
                translateYStart(rect, x, y)
            }
        ],
        [
            x3,
            y2,
            translateXEnd
        ],
        [
            x3,
            y3,
            (rect, x, y) => {
                translateXEnd(rect, x, y)
                translateYEnd(rect, x, y)
            }
        ],
        [
            x2,
            y3,
            translateYEnd
        ],
        [
            x1,
            y3,
            (rect, x, y) => {
                translateXStart(rect, x, y),
                translateYEnd(rect, x, y)
            }
        ],
        [
            x1,
            y2,
            translateXStart
        ]
    ]

    return {
        update({ x, y, w, h }) {
            _state.x = x
            _state.y = y
            _state.w = w
            _state.h = h
        },
        draw(ctx) {
            xy.forEach(([x, y]) => {
                ctx.beginPath()
                ctx.strokeRect(x(), y(), size, size)
                ctx.closePath()
            })
        },
        isHit(mouseX, mouseY) {
            for (let i = 0; i < xy.length; i++) {
                const [x, y, resizeRect] = xy[i]
                if (
                    x() <= mouseX &&
                    x() + size >= mouseX &&
                    y() <= mouseY &&
                    y() + size >= mouseY
                ) {
                    return resizeRect
                }
            }
            return false
        }
    }
}


export const createRect = (x = 0, y = 0, w = 0, h = 0) => {
    const _state = {
        dimensions: { x, y, w, h },
        strokeStyle: '',
        fillStyle: '',
        isSelected: false
    }

    return {
        setDimensions({ x, y, w, h } = {}) {
            _state.dimensions.x = x || _state.dimensions.x
            _state.dimensions.y = y || _state.dimensions.y
            _state.dimensions.w = w || _state.dimensions.w
            _state.dimensions.h = h || _state.dimensions.h
        },
        dimensions() {
            return _state.dimensions
        },
        isHit(x, y) {
            return _state.dimensions.x <= x &&
            _state.dimensions.x + _state.dimensions.w >= x &&
            _state.dimensions.y <= y &&
            _state.dimensions.y + _state.dimensions.h >= y
        },
        selected(value) {
            if (value !== undefined) {
                _state.selected = value
            }
            return _state.selected
        },
        fillStyle(value) {
            if (value !== undefined) {
                _state.fillStyle = value
            }
            return _state.fillStyle
        },
        strokeStyle(value) {
            if (value !== undefined) {
                _state.strokeStyle = value
            }
            return _state.strokeStyle
        },
        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         */
        draw(ctx) {
            const { x, y, w, h } = _state.dimensions
            ctx.beginPath()
            ctx.fillStyle = _state.fillStyle || 'transparent'
            ctx.strokeStyle = _state.strokeStyle || 'transparent'
            ctx.rect(x, y, w, h)
            ctx.stroke()
            ctx.fill()
            ctx.closePath()
        }
    }

}
