

export interface Canvas {
    width(w?: number): number
    height(h?: number): number
    draw(cb: (main: CanvasRenderingContext2D, overlay: CanvasRenderingContext2D) => void): void
    clear(): void
    on(type: string, listener: (e: MouseEvent) => void): void
    off(type: string): void
}

export interface Observer {
    onNotify(type: string, payload: any): void
}

export interface Subject {
    observers: Observer[]
    notify(type: string, payload: any): void
    addObserver(ob: Observer): void
    removeObserver(ob: Observer): void
}

