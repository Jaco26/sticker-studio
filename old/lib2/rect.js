
import { createRectHandles } from './rect-handles.js'



export const createRect = (x = 0, y = 0, w = 0, h = 0) => {
    const _data = {
        dimensions: { x, y, w, h },
        strokeStyle: '',
        fillStyle: '',
        isSelected: false
    }

    const handles = createRectHandles({ x, y, w, h })

    const _isInnerHit = (x, y) => (
        _data.dimensions.x <= x &&
        _data.dimensions.x + _data.dimensions.w >= x &&
        _data.dimensions.y <= y &&
        _data.dimensions.y + _data.dimensions.h >= y
    )

    const _setDimensions =({ x, y, w, h } = {}) => {
        _data.dimensions.x = x || _data.dimensions.x
        _data.dimensions.y = y || _data.dimensions.y
        _data.dimensions.w = w || _data.dimensions.w
        _data.dimensions.h = h || _data.dimensions.h
    }

    const _drawInner = ctx => {
        const { x, y, w, h } = _data.dimensions
        ctx.beginPath()
        ctx.fillStyle = _data.fillStyle || 'transparent'
        ctx.strokeStyle = _data.strokeStyle || 'transparent'
        ctx.rect(x, y, w, h)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
    }

    const _drawHandles = ctx => {
        handles.draw(ctx)
    }

    const states = (() => {

        let initXOffset = null
        let initYOffset = null

        return {
            IDLE: {
                handleInput({ type, x, y }) {
                    console.log('IDLE.handleInput')
                    if (_isInnerHit(x, y)) {
                        initXOffset = x - _data.dimensions.x
                        initYOffset = y - _data.dimensions.y
                        return 'SELECTED'
                    }
                },
                draw(main, overlay) {
                    _drawInner(main)
                },
            },
            SELECTED: {
                handleInput({ type, x, y }) {
                    console.log('SELECTED.handleInput')
                    handles.update(_data.dimensions)
                    if (type === 'mousedown') {
                        if (_isInnerHit(x, y)) {
                            initXOffset = x - _data.dimensions.x
                            initYOffset = y - _data.dimensions.y
                        } else {
                            return 'IDLE'
                        }
                    }
                    if (type === 'mousemove') {
                        const resizeRect = handles.isHit(x, y)
                        if (resizeRect) {
                            resizeRect(_data.dimensions, _setDimensions, x, y)
                            handles.update(_data.dimensions)
                        } else if (_isInnerHit(x, y)) {
                            _setDimensions({
                                x: x - initXOffset,
                                y: y - initYOffset
                            })
                        }
                    }
                },
                draw(main, overlay) {
                    _drawInner(main)
                    _drawHandles(overlay)
                }
            },
        }
    })()


    let state = states.IDLE

    return {
        handleInput(x, y) {
            const next = state.handleInput(x, y)
            if (next) {
                state = states[next]
            }
        },
        draw(main, overlay) {
            state.draw(main, overlay)
        },
        // setDimensions({ x, y, w, h } = {}) {
        //     state.setDimensions({ x, y, w, h })
        // },
        // isHit(x, y) {
            // return 
        // },
        // setDimensions({ x, y, w, h } = {}) {
        //     _data.dimensions.x = x || _data.dimensions.x
        //     _data.dimensions.y = y || _data.dimensions.y
        //     _data.dimensions.w = w || _data.dimensions.w
        //     _data.dimensions.h = h || _data.dimensions.h
        // },
        // dimensions() {
        //     return _data.dimensions
        // },
        // isHit(x, y) {
        //     const isInnerHit = _data.dimensions.x <= x &&
        //         _data.dimensions.x + _data.dimensions.w >= x &&
        //         _data.dimensions.y <= y &&
        //         _data.dimensions.y + _data.dimensions.h >= y
        //     return this.selected()
        //         ? isInnerHit || handles.isHit(x, y)
        //         : isInnerHit
        // },
        // isSelected() {
        //     return _data.isSelected
        // },
        // selected(value) {
        //     if (value !== undefined) {
        //         _data.selected = value
        //     }
        //     return _data.selected
        // },
        fillStyle(value) {
            if (value !== undefined) {
                _data.fillStyle = value
            }
            return _data.fillStyle
        },
        strokeStyle(value) {
            if (value !== undefined) {
                _data.strokeStyle = value
            }
            return _data.strokeStyle
        },
        // /**
        //  * 
        //  * @param {CanvasRenderingContext2D} ctx 
        //  */
        // draw(ctx) {
        //     const { x, y, w, h } = _data.dimensions
        //     ctx.beginPath()
        //     ctx.fillStyle = _data.fillStyle || 'transparent'
        //     ctx.strokeStyle = _data.strokeStyle || 'transparent'
        //     ctx.rect(x, y, w, h)
        //     ctx.stroke()
        //     ctx.fill()
        //     ctx.closePath()
        // }
    }

}
