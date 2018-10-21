# LightFullscreenGallery

LightFullScreenGallery provide a convenient way to display pictures in fullscreen.

## How to use it ?

### 1. Copy the files along your webpage
Put these three files in the same directory than your webpage:

* lightFullscreenGallery.js
* lightFullscreenGallery.css
* lfg_close.png

### 2. Include the scripts
Include the script and the stylesheet in your html page:

```html
<head>
...
<script src="./lightFullscreenGallery.js"></script>
<link href="./lightFullscreenGallery.css" rel="stylesheet" type="text/css">
...
</head>
```

### 3. Adapt your page structure
All your page content will be hidden and redisplayed by the script. It need to be in a block with the id "lfg_hidable".
The function lfg_init should be call when the page is loaded. The easiest way to do that is to use this template:

```html
<body onload="lfg_init();">
  <div id="lfg_hidable">
	<!--- Place your content here -->
  </div>
</body>
```

### 4. Declare that your images are part of a gallery
All your images that should be open by the gallery should have a "data-lfg" attribute with the name of the gallery in the &lt;a&gt; tag.
This will allow you to have several gallery on the same page. Usually, you create a link arround a thumbview.

```html
<a href="high_resolution_image.jpg" data-lfg="my_gallery">
    <img src="low_resolution_image.jpg" alt="image description">
</a>
```

## Demo
You can download the demo folder and try the demo.html file in it.
[You can also try the online demo](http://poivron-robotique.fr/Demo_LFG)

