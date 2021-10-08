import { setupComponent } from './lib/component.js'

setupComponent({
    elems: {
        container: '.side-bar',
        menuTrigger: '.header__menu-trigger',
        content: '.side-bar__content',
        main: '.main'
    },
    events: {
        menuTrigger: [
            'click',
            (elems, evt) => {
                const action = elems.content.classList.contains('side-bar__content--active')
                    ? 'remove'
                    : 'add'
                elems.content.classList[action]('side-bar__content--active')
                elems.menuTrigger.classList[action]('header__menu-trigger--active')
                elems.main.classList[action]('main--side-bar-active')
            }
        ]
    }
})
