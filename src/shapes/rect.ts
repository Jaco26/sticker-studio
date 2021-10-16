export interface Rect {
    x: number
    y: number
    w: number
    h: number
    dragOffsetX: number
    dragOffsetY: number
    fillStyle: string
    strokeStyle: string
}

export type CreateRect = (x: number, y: number, w: number, h: number, fillStyle?: string, strokeStyle?: string) => Rect

export const createRect: CreateRect = (x, y, w, h, fillStyle, strokeStyle) => ({
    x, y, w, h, fillStyle, strokeStyle, dragOffsetX: 0, dragOffsetY: 0
})

export const rectMove = (rect: Rect, x: number, y: number) => {
    rect.x = x - rect.dragOffsetX
    rect.y = y - rect.dragOffsetY
}

export const rectResize = (rect: Rect, x: number, y: number, mousedownX: number, mousedownY: number) => {
    let _x = mousedownX
    let _y = mousedownY
    let _width = x - mousedownX
    let _height = y - mousedownY
    if (_width < 0) {
        _x = _x + _width
        _width = mousedownX - _x
    }
    if (_height < 0) {
        _y = _y + _height
        _height = mousedownY - _y
    }
    rect.x = _x
    rect.y = _y
    rect.w = _width
    rect.h = _height
}

export const rectIsHit = (rect: Rect, x: number, y: number) => (
    rect.x <= x &&
    rect.x + rect.w >= x &&
    rect.y <= y &&
    rect.y + rect.h >= y
)

export const rectDidCollideWithRect = (r1: Rect, r2: Rect) => (
    r1.x + r1.w >= r2.x && // Is the RIGHT edge of r1 to the RIGHT of the LEFT edge of r2?
    r1.x <= r2.x + r2.w && // Is the LEFT edge of r1 to the LEFT of the RIGHT edge of r2?
    r1.y + r1.h >= r2.y && // Is the BOTTOM edge of r1 BELOW the TOP edge of r2?
    r1.y <= r2.y + r2.h    // Is the TOP edge of r1 ABOVE the BOTTOM edge of r2?
)

export const rectDraw = (ctx: CanvasRenderingContext2D, rect: Rect) => {
    const { x, y, w, h, fillStyle, strokeStyle } = rect
    ctx.beginPath()
    ctx.fillStyle = fillStyle || 'transparent'
    ctx.strokeStyle = strokeStyle || 'transparent'
    ctx.rect(x, y, w, h)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
}