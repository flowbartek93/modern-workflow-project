import '../styles/styles.css'
import _ from 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import ClientArea from './modules/ClientArea'




let mobileMenu = new MobileMenu();
let sticky = new StickyHeader();

new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);
new ClientArea();


let modal;

document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', (el) => {
        el.preventDefault()

        if (typeof modal === "undefined") {
            import( /* webpackChunkName: "modal" */ './modules/Modal').then(res => {
                modal = new res.default();
                setTimeout(() => modal.openModal(), 20)
            }).catch((err) => console.log(err))

        } else {
            modal.openModal()
        }


    })
})

if (module.hot) {
    module.hot.accept();
}