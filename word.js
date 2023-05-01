import helper from './helper.js';

class Word {
	constructor(word) {
		//events
		this.onDie = null;
		this.onHit = null;

		//methods to create properties
		this.init(word);
		this.createElement();
		this.resetStartPosition();
	}

	//set Word properties
	init(word) {
		this.word = word;

		this.letters = word.split('');

		//if DOM element already exists, change it's innerText
		if (this.el) {
			this.el.inerText = this.word;
		}
	}

	createElement() {
		this.el = document.createElement('div');
		this.el.innerText = this.word;
		this.el.classList.add('word');
		//this.el.style.position = 'absolute';

		helper.wrapper.append(this.el);

		//set margin to center element in the view
		this.el.style.margin = `-${this.el.offsetHeight / 2}px 0 0 -${this.el.offsetWidth / 2}px`;
	}

	resetStartPosition() {
		const wrapElemRect = helper.wrapper.getBoundingClientRect();

		let x = helper.random(0, 250) + this.el.offsetHeight / 2;
		x *= Math.round(Math.random()) ? 1 : -1;

		const wrapRectHeight = wrapElemRect.height * -1;
		const y = wrapRectHeight + 32 + (this.el.offsetWidth / 2);
		console.log(wrapElemRect);
		
		//spawn location of word
		this.elTransform = `translate(${x}px, ${y}px)`;
		
		//moves element to x,y of 'hero' location
		this.el.style.transform = this.elTransform;
	}

	/*--------------------------------------------------------------------*/

    //prototype methods
	attack() {
		const sequence = [
			{
				offset: 0,
				transform: this.elTransform,
			},
			{
				offset: 1,
				transform: `translate(0,0)`,
			},
		];

		this.attackAnimation = this.el.animate(sequence, {
			duration: 20000,
			delay: 0,
		});

		this.attackAnimation.onfinish = () => {
			// if animation finishes hero got hit
			this.onHit(this);
		};
	}

	stop() {
		this.attackAnimation.pause();
	}

	damage(letter) {
		this.letters.splice(0, 1);
		this.el.innerText = this.letters.join('');

		if (!this.el.classList.contains('target')) {
			this.el.classList.add('target');
		}

		if (this.letters.length === 0) {
			this.onDie(this);
		}
	}

	reset(word) {
		this.el.classList.remove('target');
		this.init(word);
		this.resetStartPosition();
		this.attackAnimation.cancel();

		this.attack();
	}
}

export default Word;