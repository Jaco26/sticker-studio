import { Rect } from "./interfaces.js";

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