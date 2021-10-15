
import { createRectHandles } from '../rect-handles.js'

export const createRect = (x = 0, y = 0, w = 0, h = 0) => {
    const _state = {
        dimensions: { x, y, w, h },
        strokeStyle: '',
        fillStyle: '',
        isSelected: false
    }

    const handles = createRectHandles({ x, y, w, h })

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
            const isInnerHit = _state.dimensions.x <= x &&
                _state.dimensions.x + _state.dimensions.w >= x &&
                _state.dimensions.y <= y &&
                _state.dimensions.y + _state.dimensions.h >= y
            return this.selected()
                ? isInnerHit || handles.isHit(x, y)
                : isInnerHit
        },
        isSelected() {
            return _state.isSelected
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
