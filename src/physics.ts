import { Rect } from "./interfaces.js";

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

