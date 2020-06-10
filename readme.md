







<figure>
	<img src='/img/components/kanji/rwt-kanji-embossed.png' width='100%' />
	<figcaption></figcaption>
</figure>

# “Kanji” Designer Card

## Discover and reveal text over image


<address>
<img src='/img/rwtools.png' width=80 /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2020-04-24>Apr 24, 2020</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td>The <span class=product>rwt-kanji</span> web component displays a designer card which has a horizontal title, a vertically transformed subtitle, text that is formatted as a blockquote, and an image with a mouse-over explanation.</td></tr>
</table>

### Motivation

The <span>rwt-kanji</span> web component is intended for use on web pages
where the reader's attention is only lightly engaged.

Sometimes a reader is in <q>scan</q> mode, rather than comprehension mode.
They are sniffing for the scent of things. When that's the case, this component
can be used to present a complex idea as a simple visualization.

When a user's interest is piqued, more information can be revealed to the reader
by hovering the mouse over the card's prominently displayed image. The extra
information fades in, revealing itself on top of the image.

This component takes its name from its original use case: describing the
inspiration behind the logos used in the desktop apps of Read Write Tools.

#### Prerequisites

The <span>rwt-kanji</span> web component works in any browser that supports
modern W3C standards. Templates are written using <span>BLUE</span><span>
PHRASE</span> notation, which can be compiled into HTML using the free <a href='https://hub.readwritetools.com/desktop/rwview.blue'>Read Write View</a>
desktop app. It has no other prerequisites. Distribution and installation are
done with either NPM or via Github.

#### Installation using NPM

If you are familiar with Node.js and the `package.json` file, you'll be
comfortable installing the component just using this command:

```bash
npm install rwt-kanji
```

If you are a front-end Web developer with no prior experience with NPM, follow
these general steps:

   * Install <a href='https://nodejs.org'>Node.js/NPM</a>
on your development computer.
   * Create a `package.json` file in the root of your web project using the command:
```bash
npm init
```

   * Download and install the web component using the command:
```bash
npm install rwt-kanji
```


Important note: This web component uses Node.js and NPM and `package.json` as a
convenient *distribution and installation* mechanism. The web component itself
does not need them.

#### Installation using Github

If you are more comfortable using Github for installation, follow these steps:

   * Create a directory `node_modules` in the root of your web project.
   * Clone the <span>rwt-kanji</span> web component into it using the command:
```bash
git clone https://github.com/readwritetools/rwt-kanji.git
```


### Using the web component

After installation, you need to add two things to your HTML page to make use of
it.

   * Add a `script` tag to load the component's `rwt-kanji.js` file:
```html
<script src='/node_modules/rwt-kanji/rwt-kanji.js' type=module></script>             
```

   * Add the component tag somewhere on the page, supplying five pieces of slotted
      text:

      1. `span slot=main-title` The main title will be display horizontally across the top
         of the card in a sans-serif font. Maximum length is approximately 25 characters.
      2. `span slot=side-title` The side title will be rotated and displayed vertically
         along the left-hand edge of the card in a sans-serif font. Maximum length is
         approximately 25 characters.
      3. `span slot=slogan` A sentence that will be placed in the top half of the card. It
         will be captioned with quotation marks. Use <br> to break the sentence into
         multiple lines if desired.
      4. `span slot=image-text` A sentence that will be hidden from the user until the
         mouse is hovered over the image.
      5. `img slot=image src=URL` An image that should be square, ideally about 200 by 200
         pixels.

Here's an example:

```html
<rwt-kanji role=contentinfo>
    <span slot=main-title>READ WRITE VIEW</span>
    <span slot=side-title>PLAIN TEXT</span>
    <span slot=slogan>Plain text reader.<br />Hypertext Markup writer.</span>
    <span slot=image-text>The Japanese kanji 見 (mi) is used in words meaning seeing, looking at, and viewing. RWVIEW has adopted 見 as its logo.</span>
    <img slot=image src='https://readwritetools.com/img/embossed/rwview-embossed.png' />
</rwt-kanji>
```

### Customization

#### Designer card size

The designer card is square by default. Its size may be overridden using CSS by
defining new values for `--width` and `--height`.

Adjust the `--font-basis` to shrink or grow the entire card.

```css
rwt-kanji {
    --font-basis: 1.0;
    --width: calc(22rem * var(--font-basis));
    --height: calc(22rem * var(--font-basis));
    --sidebar-width: calc(2rem * var(--font-basis));
    --title-height: calc(2rem * var(--font-basis));
}
```

#### Dialog color scheme

The default color palette for the dialog uses a dark mode theme. You can use CSS
to override the variables' defaults:

```css
rwt-kanji {
    --color: var(--white);
    --accent-color1: var(--pure-white);
    --background: var(--black);
    --accent-background1: var(--pure-black);
    --accent-background2: var(--nav-black);
    --accent-background3: var(--medium-black);
    --accent-background4: var(--gray);
}
```

### License

The <span>rwt-kanji</span> web component is licensed under the MIT License.

<img src='/img/blue-seal-mit.png' width=80 align=right />

<details>
	<summary>MIT License</summary>
	<p>Copyright © 2020 Read Write Tools.</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</details>

### Availability


<table>
	<tr><td>Source code</td> 			<td><a href='https://github.com/readwritetools/rwt-kanji'>github</a></td></tr>
	<tr><td>Package installation</td> <td><a href='https://www.npmjs.com/package/rwt-kanji'>NPM</a></td></tr>
	<tr><td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/components/kanji.blue'>Read Write Hub</a></td></tr>
</table>

