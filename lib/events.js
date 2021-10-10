

export function setupEvents() {
    const queue = []
    const listeners = []

    const enqueue = event => queue.push(event)
    const dequeue = () => queue.shift()

    return {
        on(type, listener) {
            listeners[type] = listener
        },
        off(type) {
            delete listeners[type]
        },
        emit(type, payload) {
            enqueue({ type, payload })
        },
        flush() {
            while (queue.length) {
                const { type, payload } = dequeue()
                listeners[type](payload)
            }
        }
    }
}