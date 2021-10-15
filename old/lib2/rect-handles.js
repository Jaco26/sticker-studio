

const translateXStart = (dimensions, setDimensions, newX) => {
    const { x, w } = dimensions
    setDimensions({
        x: x + (newX - x),
        w: w - (newX - x)
    })
}

const translateXEnd = (dimensions, setDimensions, newX) => {
    setDimensions({
        w: newX - dimensions.x
    })
}

const translateYStart = (dimensions, setDimensions, newY) => {
    const { y, h } = dimensions
    setDimensions({
        y: y + (newY - y),
        h: h - (newY - y)
    })
}

const translateYEnd = (dimensions, setDimensions, newY) => {
    setDimensions({ 
        h: newY - dimensions.y
    })
}




export const createRectHandles = ({ x = null, y = null, w = null, h = null } = {}) => {
    const _state = { x, y, w, h }

    const size = 6
    const halfOfSize = size / 2

    const x1 = () => _state.x - halfOfSize
    const y1 = () => _state.y - halfOfSize
    const x2 = () => _state.x - halfOfSize + _state.w / 2
    const y2 = () => _state.y - halfOfSize + _state.h / 2
    const x3 = () => _state.x - halfOfSize + _state.w
    const y3 = () => _state.y - halfOfSize + _state.h

    const handles = [
        [
            x1,
            y1,
            (dimensions, setDimensions, x, y) => {
                translateXStart(dimensions, setDimensions, x)
                translateYStart(dimensions, setDimensions, y)
            }
        ],
        [
            x2,
            y1,
            (dimensions, setDimensions, x, y) => {
                translateYStart(dimensions, setDimensions, y)
            }
        ],
        [
            x3,
            y1,
            (dimensions, setDimensions, x, y) => {
                translateXEnd(dimensions, setDimensions, x)
                translateYStart(dimensions, setDimensions, y)
            }
        ],
        [
            x3,
            y2,
            (dimensions, setDimensions, x, y) => {
                translateXEnd(dimensions, setDimensions, x)
            }
        ],
        [
            x3,
            y3,
            (dimensions, setDimensions, x, y) => {
                translateXEnd(dimensions, setDimensions, x)
                translateYEnd(dimensions, setDimensions, y)
            }
        ],
        [
            x2,
            y3,
            (dimensions, setDimensions, x, y) => {
                translateYEnd(dimensions, setDimensions, y)
            }
        ],
        [
            x1,
            y3,
            (dimensions, setDimensions, x, y) => {
                translateXStart(dimensions, setDimensions, x),
                translateYEnd(dimensions, setDimensions, y)
            }
        ],
        [
            x1,
            y2,
            (dimensions, setDimensions, x, y) => {
                translateXStart(dimensions, setDimensions, x)
            }
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
            handles.forEach(([x, y]) => {
                ctx.beginPath()
                ctx.strokeRect(x(), y(), size, size)
                ctx.closePath()
            })
        },
        isHit(mouseX, mouseY) {
            for (let i = 0; i < handles.length; i++) {
                const [x, y, resizeRect] = handles[i]
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
