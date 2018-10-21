# LightFullscreenGallery

LightFullScreenGallery provide a convinient way to display pictures in fullscreen.

## How to use it ?

### 1. Copy the files along your webpage
Put in the same directory than your webpage these three files:

* lightFullscreenGallery.js
* lightFullscreenGallery.css
* lfg_close.png

### 2. Include the scripts
Include the script and the stylesheet to you html page:

```html
<head>
...
<script src="./lightFullscreenGallery.js"></script>
<link href="./lightFullscreenGallery.css" rel="stylesheet" type="text/css">
...
</head>
```

### 3. Adapt your page structure
All your page content will be hidden and redisplayed by the script. It need to bein a block with the id "lfg_hidable".
The function lfg_init should be call when the page is loaded. The easiest way to do that is to use this template

```html
<body onload="lfg_init();">
  <div id="lfg_hidable">
	<!--- Place your content here -->
  </div>
</body>
```

### 4. Declare that your images are part of a gallery
All your image that should be open by the gallery should have a "data-lfg" attribut with the name of the gallery in the <a> tag.
This will alow you to have several gallery on the same page. Usually, you create a link arround a thumbview.

```html
<a href="high_resolution_image.jpg" data-lfg="my_gallery">
    <img src="low_resolution_image.jpg" alt="image description">
</a>
```



