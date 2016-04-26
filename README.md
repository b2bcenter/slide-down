# Slide Down #
Each jQuery plugin to display blocks can do it differently. It’s essential for sliding blocks, which are obviously "sliding" and shifting content.

## [Demo](http://b2bcenter.github.io/slide-down/#Demo) ##

## Installation ##
Use [Bower](http://bower.io):


```
$ bower install slide-down
```

Or [npm](https://www.npmjs.com/package/slide-down)

```
$ npm install slide-down
```

If the above methods do not work, [download from GitHub](https://github.com/b2bcenter/slide-down/zipball/master)

## Setup ##

```html
<!--  Css -->
<link href="/jquery.slidedown.css" rel="stylesheet" type="text/css">
<!-- jQuery -->
<script src="/jquery.min.js"></script>
<!-- SlideDown -->
<script src="/jquery.slidedown.js"></script>
```



## Markup ##

```html

<!-- The trigger can exist anywhere. -->

<!-- Block name (that can be open/close) is specified
     in the attribute [data-slidedown-trigger]   -->

<span data-slidedown-trigger="txt">Text</span>

<!-- Sliding block can also exist anywhere,
     Regardless of the trigger -->
     
<!-- Block name the trigger refers to is specified
     in the attribute [data-slidedown-target] it   -->

<div class="slide_down" data-slidedown-target="txt">
	<div class="slide_down-content">
		<!-- Content -->
	</div>
</div>
```



## Options ##

### Open block ###
If an open block is required on default,  you should add the .slide_down--active class to the block with the [data-slidedown-target] attribute

### Animation ###
The basic animation can be modified. Do this requires adding [data-animation] , that will indicate the type and speed of the animation, a data-slidedown-target block:

* ease — Regular animation, default
* ease-fast — Regular animation, fast speed 
* ease-slow — Regular animation, slow speed 
* bounce — "Bounce" animation, normal speed 
* bounce-fast — "Bounce" animation, fast speed
* bounce-slow — "Bounce" animation, slow speed 


```html
<!-- Sliding block -->
<div class="slide_down" data-slidedown-target="txt"  data-animation="ease-slow">
	<div class="slide_down-content">
		<!-- Content -->
	</div>
</div>
```


### Synchronicity ###
If you want the blocks to be interdependent (only one block can always be opened), it’s necessary to add a [data-sync] attribute to each dependent block with the [data-slidedown-target] attribute


```html
<!-- One sliding block -->
<div class="slide_down" data-slidedown-target="txt" data-sync>
	<div class="slide_down-content">
		<!-- Content -->
	</div>
</div>

<!-- The 2nd sliding block -->
<div class="slide_down" data-slidedown-target="txt" data-sync>
	<div class="slide_down-content">
		<!-- Content -->
	</div>
</div>
```


## Methods ##


```javascript
// This will open an assigned block
$.slideDown.open("id or $('element')");
// This will close an assigned block
$.slideDown.close("id or $('element')");
// This will close all or all assigned blocks
$.slideDown.closeAll("empty or $('elements')"); 
```

## Browsers ##
CSS3 animation is used. If the browser does not support animation, the blocks will be shown as hide / show

* IE 9+
* Chrome 8+
* Firefox 10+
* Safari 3+
* Opera 10.6+

## License ##

[MIT](https://github.com/b2bcenter/slide-down/blob/master/LICENSE)
