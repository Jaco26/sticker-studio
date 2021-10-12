

const translateXStart = (rect, newX, preserveAspectRatio) => {
    const { x, w } = rect.dimensions()
    rect.setDimensions({
        x: x + (newX - x),
        w: w - (newX - x)
    })
}

const translateXEnd = (rect, newX) => {
    rect.setDimensions({
        w: newX - rect.dimensions().x
    })
}

const translateYStart = (rect, newY) => {
    const { y, h } = rect.dimensions()
    rect.setDimensions({
        y: y + (newY - y),
        h: h - (newY - y)
    })
}

const translateYEnd = (rect, newY) => {
    rect.setDimensions({ 
        h: newY - rect.dimensions().y
    })
}




export const createRectHandles = ({ x, y, w, h }) => {
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
            (rect, x, y) => {
                translateXStart(rect, x)
                translateYStart(rect, y)
            }
        ],
        [
            x2,
            y1,
            (rect, x, y) => {
                translateYStart(rect, y)
            }
        ],
        [
            x3,
            y1,
            (rect, x, y) => {
                translateXEnd(rect, x)
                translateYStart(rect, y)
            }
        ],
        [
            x3,
            y2,
            (rect, x, y) => {
                translateXEnd(rect, x)
            }
        ],
        [
            x3,
            y3,
            (rect, x, y) => {
                translateXEnd(rect, x)
                translateYEnd(rect, y)
            }
        ],
        [
            x2,
            y3,
            (rect, x, y) => {
                translateYEnd(rect, y)
            }
        ],
        [
            x1,
            y3,
            (rect, x, y) => {
                translateXStart(rect, x),
                translateYEnd(rect, y)
            }
        ],
        [
            x1,
            y2,
            (rect, x, y) => {
                translateXStart(rect, x)
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
