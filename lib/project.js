import { createRectHandles } from './rect-handles.js'
import { createRect } from './shapes/rect.js'

/**
 * @callback Action
 * @param {string} type
 * @param {*} payload 
 */


/** @type {Action} */
const hi = (type, payload) => {
    return 'hello'
}

/**
 * @typedef ActionCtx
 * @property {Action[]} history
 * @property {[]} elements
 */

const actions = {
    /**
     * 
     * @param {ActionCtx} ctx 
     * @param {*} param1 
     */
    ADD_RECT: (ctx, { x, y, w, h }) => {
        ctx.history.push('ADD_RECT')

    }
}



/**
 * 
 * @typedef Project 
 * @property {(x: number, y: number, w: number, h: number)} addRect
 * @property {(type: string, payload: *)} dispatch
 */

/**
 * 
 * @param {{ [key: string]: (ctx: ActionCtx, payload: *) }} actions
 * @returns {Project}
 */
export const createProject = (actions) => {

    const elements = []

    const history = []

    const handles = createRectHandles()

    return {
        dispatch(type, payload) {
            actions[type]({ history, elements }, payload)
        },
    }

}
