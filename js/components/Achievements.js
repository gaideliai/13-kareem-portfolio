"use strict";
import data from '../data/achievements-data.js';

class Achievements {
    constructor (target) {
        this.target = target;

        this.DOMnumbers = null;
        this.numbersAnimated = false;

        this.render();        
        this.scroll();
        this.autoCounter();        
    }

    render() {
        const DOM = document.querySelector(this.target);
        if (!DOM) {
            throw 'ERROR: fix Achievements!';
        }

        let HTML = '';

        for (let i=0; i<data.length; i++) {
            const ach = data[i];
            HTML +=`<div class="cards col-3">
                        <i class="fa fa-${ach.icon}"></i>
                        <div class="number" data-num="${ach.number}">0</div>
                        <h4>${ach.title}</h4>
                    </div>`;
        }

        DOM.innerHTML = HTML;
        this.DOMnumbers = DOM.querySelectorAll('.number');
    }    

    autoCounter() {
        window.addEventListener('load', () => {
        const speed = 1000 / 24;
        
            for ( let i=0; i<this.DOMnumbers.length; i++ ) {
                let step = 0;
                const elem = this.DOMnumbers[i];
                const from = 0;
                const to = parseInt(this.DOMnumbers[i].dataset.num);
                const time = 2000;
                const totalSteps = Math.ceil(time / speed) + 1;
                
                elem.textContent = from;
                
                const timer = setInterval(() => {
                    step++;
                    elem.textContent = Math.round((to - from) / totalSteps * step);
                    if ( step === totalSteps ) {
                        clearInterval( timer );
                    }
                }, speed);
            }
        })
    }

    scroll() {
        window.addEventListener('scroll', () => {
            const height = this.DOMnumbers[0].offsetTop - window.innerHeight;
            if ( height < window.scrollY && !this.numbersAnimated ) {
                const totalTime = 2000;
                const framesPerSecond = 24;
                const framesCount = (totalTime / 1000) * framesPerSecond;
                let count = 0;
                
                const clock = setInterval(() => {
                    for ( let i=0; i<this.DOMnumbers.length; i++ ) {
                        this.DOMnumbers[i].innerText = Math.ceil(count * parseInt(this.DOMnumbers[i].dataset.num) / framesCount);
                    }
                    count++;
                    if ( count > framesCount ) {
                        clearInterval(clock);
                    }
                }, 1000 / framesPerSecond);     //speed=1000/framesPerSecond

                this.numbersAnimated = true;
            }
        })
    }
}

export default Achievements;