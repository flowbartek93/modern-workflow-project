import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(
        els,
        scrollPercent

    ) {
        this.itemsToReveal = els
        this.hideInitially();
        this.browserHeight = window.innerHeight;
        this.scrollPercent = scrollPercent;
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events();
    }


    events() {



        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener('resize', debounce(() => {

            this.browserHeight = window.innerHeight;



        }, 333))

    }

    calcCaller() {


        this.itemsToReveal.forEach(item => {

            if (item.isRevealed == false) {
                this.calculateIfScrolledTo(item)

            }



        })
    }


    calculateIfScrolledTo(item) {

        if (window.scrollY + this.browserHeight > item.offsetTop) {


            let scrollPercent = (item.getBoundingClientRect().top / this.browserHeight) * 100;


            if (scrollPercent < this.scrollPercent) {
                item.classList.add('reveal-item--is-visible')
                item.isRevealed = true;

                if (item.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }
        }



    }

    hideInitially() {

        this.itemsToReveal.forEach(item => {

            item.classList.add('reveal-item')

            item.isRevealed = false;



        })

        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;

    }
}


export default RevealOnScroll