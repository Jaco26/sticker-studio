const isNull = value => value === null
const isUndefined = value => value === undefined
const isNullOrUndefined = value => isNull(value) || isUndefined(value)


export function setupElements() {
    const _state = {
        elements: [],
        selectedIdx: null
    }

    return {
        addElement(elem) {
            _state.elements.unshift(elem)
        },
        getElements() {
            return _state.elements
        },
        trySelect(x, y) {
            const idx = _state.elements.findIndex(elem => elem.isHit(x, y))
            _state.selectedIdx = idx > -1 ? idx : null
            return this.getSelected()
        },
        getSelected() {
            return _state.elements[_state.selectedIdx]
        },
        deleteSelected() {
            if (isNullOrUndefined(_state.selectedIdx)) {
                return
            }
            _state.elements.splice(_state.selectedIdx, 1)
            _state.selectedIdx = null
        },
    }
}