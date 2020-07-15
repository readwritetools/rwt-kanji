//=============================================================================
//
// File:         /node_modules/rwt-kanji/rwt-kanji.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2020
// License:      MIT
// Initial date: Apr 23, 2020
// Contents:     Designer card with horizontal title, vertically transformed subtitle,
//               blockquoted text, and image with mouse-over explanation.
//
//=============================================================================

const Static = {
	componentName:    'rwt-kanji',
	elementInstance:  1,
	htmlURL:          '/node_modules/rwt-kanji/rwt-kanji.blue',
	cssURL:           '/node_modules/rwt-kanji/rwt-kanji.css',
	htmlText:         null,
	cssText:          null
};

Object.seal(Static);

export default class RwtKanji extends HTMLElement {
	
	constructor() {
		super();
				
		// guardrails
		this.instance = Static.elementInstance++;
		this.isComponentLoaded = false;

		// child elements
		this.mainTitle = null;
		this.sideTitle = null;
		this.slogan = null;
		this.imageBlock = null;
		this.imageText = null;
		this.image = null;
		
		Object.seal(this);
	}

	//-------------------------------------------------------------------------
	// customElement life cycle callback
	//-------------------------------------------------------------------------
	async connectedCallback() {		
		if (!this.isConnected)
			return;

		try {
			var htmlFragment = await this.getHtmlFragment();
			var styleElement = await this.getCssStyleElement();

			this.attachShadow({mode: 'open'});
			this.shadowRoot.appendChild(htmlFragment); 
			this.shadowRoot.appendChild(styleElement); 
			
			this.identifyChildren();
			this.registerEventListeners();
			this.sendComponentLoaded();
		}
		catch (err) {
			console.log(err.message);
		}
	}

	//-------------------------------------------------------------------------
	// initialization
	//-------------------------------------------------------------------------

	// Only the first instance of this component fetches the HTML text from the server.
	// All other instances wait for it to issue an 'html-template-ready' event.
	// If this function is called when the first instance is still pending,
	// it must wait upon receipt of the 'html-template-ready' event.
	// If this function is called after the first instance has already fetched the HTML text,
	// it will immediately issue its own 'html-template-ready' event.
	// When the event is received, create an HTMLTemplateElement from the fetched HTML text,
	// and resolve the promise with a DocumentFragment.
	getHtmlFragment() {
		return new Promise(async (resolve, reject) => {
			var htmlTemplateReady = `${Static.componentName}-html-template-ready`;
			
			document.addEventListener(htmlTemplateReady, () => {
				var template = document.createElement('template');
				template.innerHTML = Static.htmlText;
				resolve(template.content);
			});
			
			if (this.instance == 1) {
				var response = await fetch(Static.htmlURL, {cache: "no-cache", referrerPolicy: 'no-referrer'});
				if (response.status != 200 && response.status != 304) {
					reject(new Error(`Request for ${Static.htmlURL} returned with ${response.status}`));
					return;
				}
				Static.htmlText = await response.text();
				document.dispatchEvent(new Event(htmlTemplateReady));
			}
			else if (Static.htmlText != null) {
				document.dispatchEvent(new Event(htmlTemplateReady));
			}
		});
	}
	
	// Use the same pattern to fetch the CSS text from the server
	// When the 'css-text-ready' event is received, create an HTMLStyleElement from the fetched CSS text,
	// and resolve the promise with that element.
	getCssStyleElement() {
		return new Promise(async (resolve, reject) => {
			var cssTextReady = `${Static.componentName}-css-text-ready`;

			document.addEventListener(cssTextReady, () => {
				var styleElement = document.createElement('style');
				styleElement.innerHTML = Static.cssText;
				resolve(styleElement);
			});
			
			if (this.instance == 1) {
				var response = await fetch(Static.cssURL, {cache: "no-cache", referrerPolicy: 'no-referrer'});
				if (response.status != 200 && response.status != 304) {
					reject(new Error(`Request for ${Static.cssURL} returned with ${response.status}`));
					return;
				}
				Static.cssText = await response.text();
				document.dispatchEvent(new Event(cssTextReady));
			}
			else if (Static.cssText != null) {
				document.dispatchEvent(new Event(cssTextReady));
			}
		});
	}
	
	//^ Identify this component's children
	identifyChildren() {
		this.mainTitle = this.shadowRoot.getElementById('main-title');
		this.sideTitle = this.shadowRoot.getElementById('side-title');
		this.slogan = this.shadowRoot.getElementById('slogan');
		this.imageBlock = this.shadowRoot.getElementById('image-block');
		this.imageText = this.shadowRoot.getElementById('image-text');
		this.image = this.shadowRoot.getElementById('image');
	}
	
	registerEventListeners() {
		// component events
		this.imageBlock.addEventListener('mouseover', this.onMouseoverImage.bind(this));
		this.imageBlock.addEventListener('mouseout', this.onMouseoutImage.bind(this));
	}
	
	//^ Inform the document's custom element that it is ready for programmatic use 
	sendComponentLoaded() {
		this.isComponentLoaded = true;
		this.dispatchEvent(new Event('component-loaded', {bubbles: true}));
	}

	//^ A Promise that resolves when the component is loaded
	waitOnLoading() {
		return new Promise((resolve) => {
			if (this.isComponentLoaded == true)
				resolve();
			else
				this.addEventListener('component-loaded', resolve);
		});
	}
	
	//-------------------------------------------------------------------------
	// component events
	//-------------------------------------------------------------------------

	onMouseoverImage(event) {
		this.imageText.classList.remove('hide');
		this.imageText.classList.add('show');
	}
	
	onMouseoutImage(event) {
		//this.imageText.classList.remove('show');
		this.imageText.classList.add('hide');
	}
}

window.customElements.define(Static.componentName, RwtKanji);
