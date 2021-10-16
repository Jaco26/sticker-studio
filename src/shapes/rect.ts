export interface Rect {
    x: number
    y: number
    w: number
    h: number
    fillStyle: string
    strokeStyle: string
}

export type CreateRect = (x: number, y: number, w: number, h: number, fillStyle?: string, strokeStyle?: string) => Rect

export const createRect: CreateRect = (x, y, w, h, fillStyle, strokeStyle) => ({
    x, y, w, h, fillStyle, strokeStyle
})