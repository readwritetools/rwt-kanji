//=============================================================================
//
// File:         /node_modules/rwt-kanji/rwt-kanji.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2020
// License:      MIT
// Initial date: Apr 23, 2020
// Contents:     Designer card with horizontal title, vertically transformed subtitle, blockquoted text, and image with mouse-over explanation
//
//=============================================================================

export default class RwtKanji extends HTMLElement {
	
	static elementInstance = 1;		// The elementInstance is used to distinguish between multiple instances of this custom element
	static htmlTemplate = null;		// retreived from the server once, and used by all instances
	static cssText = null;			// retreived from the server once, and used by all instances
	
	constructor() {
		super();
				
		// child elements
		this.mainTitle = null;
		this.sideTitle = null;
		this.slogan = null;
		this.imageBlock = null;
		this.imageText = null;
		this.image = null;
		
		// properties
		this.instance = RwtKanji.elementInstance++;

		Object.seal(this);
	}

	//-------------------------------------------------------------------------
	// customElement life cycle callbacks
	//-------------------------------------------------------------------------
	async connectedCallback() {		
		// guard against possible call after this has been disconnected
		if (!this.isConnected)
			return;

		var htmlTemplate = await this.getTemplate();
		var htmlFragment = this.convertTemplateToFragment(htmlTemplate);
		
		var cssText = await this.getCssText();
		var styleElement = this.convertCssTextToElement(cssText);

		// append the HTML and CSS to the custom element's shadow root
		this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(htmlFragment); 
		this.shadowRoot.appendChild(styleElement); 
		
		this.identifyChildren();
		this.registerEventListeners();
	}

	//-------------------------------------------------------------------------
	// initialization
	//-------------------------------------------------------------------------

	//< returns a promise to the htmlTemplate 
	getTemplate() {
		return new Promise((resolve, reject) => {
			// setup the completion event listener
			document.addEventListener('html-template-ready', function(e) {
				resolve(RwtKanji.htmlTemplate);
			});
			
			// perform the work that will eventually trigger the completion event
			this.fetchTemplate();
		});
	}
	
	//^ Fetch the HTML template from the server, but only on the first instance.
	//  All subsequent instances await the 'html-template-ready' event
	//< returns an HTML text fragment
	//< returns without getting the template if server does not respond with 200 or 304
	async fetchTemplate() {
		if (this.instance == 1) {
			var response = await fetch('/node_modules/rwt-kanji/rwt-kanji.blue', {cache: "no-cache", referrerPolicy: 'no-referrer'});
			if (response.status != 200 && response.status != 304)
				return null;
			RwtKanji.htmlTemplate = await response.text();
			document.dispatchEvent(new Event('html-template-ready'));
		}
		else if (RwtKanji.htmlTemplate == null) {
			 // Nothing to do. Caller must wait for 'html-template-ready' event to be received
		}
		else { // (RwtKanji.htmlTemplate != null)
			document.dispatchEvent(new Event('html-template-ready'));
		}
	}
	
	// create a template and turn its content into a document fragment
	convertTemplateToFragment(htmlTemplate) {
		var template = document.createElement('template');
		template.innerHTML = htmlTemplate;
		return template.content;
	}	
	
	//< returns a promise to the CSS Text 
	getCssText() {
		return new Promise((resolve, reject) => {
			// setup the completion event listener
			document.addEventListener('css-text-ready', function(e) {
				resolve(RwtKanji.cssText);
			});
			
			// perform the work that will eventually trigger the completion event
			this.fetchCSS();
		});
	}
		
	//^ Fetch the CSS text from the server, but only on the first instance.
	//  All subsequent instances await the 'css-text-ready' event
	//< returns CSS declarations
	//< returns null if server does not respond with 200 or 304
	async fetchCSS() {
		if (this.instance == 1) {
			var response = await fetch('/node_modules/rwt-kanji/rwt-kanji.css', {cache: "no-cache", referrerPolicy: 'no-referrer'});
			if (response.status != 200 && response.status != 304)
				return null;
			RwtKanji.cssText = await response.text();
			document.dispatchEvent(new Event('css-text-ready'));
		}
		else if (RwtKanji.cssText == null) {
			 // Nothing to do. Caller must wait for 'css-text-ready' event to be received
		}
		else { // (RwtKanji.cssText != null)
			document.dispatchEvent(new Event('css-text-ready'));
		}
	}	
	
	// create a <style> element from CSS text 
	convertCssTextToElement(cssText) {
		var styleElement = document.createElement('style');
		styleElement.innerHTML = cssText;
		return styleElement;
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

window.customElements.define('rwt-kanji', RwtKanji);
