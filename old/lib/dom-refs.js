

export function setupDOMRefs({ elems, events }) {
    const elements = Object.entries(elems).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: document.querySelector(value)
        }),
        {}
    )
    
    Object.entries(events).forEach(([key, [type, listener]]) => {
        const elem = elements[key]
        elem.addEventListener(type, evt => {
            listener(elements, evt)
        })
    })
}


