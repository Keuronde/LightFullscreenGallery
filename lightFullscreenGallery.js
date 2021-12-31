imageshow_tpl=`
<img src="{{url}}" id="lfg_image">
<div id="lfg_toPrevImage" onclick="lfg_goNext()"></div>
<div id="lfg_toNextImage" onclick="lfg_goPrevious()"></div>
<img src="lfg_close.png" id="lfg_closeButton" onclick="lfg_close()">
<div id="lfg_dl_info">
  <img src="lfg_info.png" id="lfg_infoButton" onclick="lfg_toggleInfo()">
  <a href="{{url}}" download><img src="lfg_download.png" id="lfg_dlButton"></a>
</div>
<p id="lfg_desc">{{desc}}</p>
`

function lfg_init(){
    var links = [].slice.call(document.querySelectorAll("[data-lfg]"));
	display_description = true;
    links.forEach(
    function(element){
        element.addEventListener("click", lfg_start, false);
    })
}

function lfg_start(event){

    event.preventDefault();
    event.stopPropagation();
    
    // Backup scroll
    scrollPosition = window.pageYOffset;
    
    // find all images in the gallery
    var galleryName = this.getAttribute("data-lfg");
    galleryNode = [].slice.call(document.querySelectorAll("[data-lfg^="+galleryName+"]"));
    gallery=[];
    imagePositionInGallery=0;
    imageHref = this.getAttribute('href');
    
    // Build gallery array and find current position
    galleryNode.forEach(
    function(element){
        gallery.push({
            url: element.getAttribute('href'),
            desc: element.getAttribute('data-lfg-desc')
        })
        if(element.getAttribute('href') === imageHref){
            imagePositionInGallery = gallery.length - 1;
        }
    }
    )
    // display the image
    lfg_render({"image":gallery[imagePositionInGallery]});
    // Hide everything else
    document.getElementById('lfg_hidable').style["display"]="none";

    // Manage Keyboard
    window.addEventListener("keydown", lfg_keyboardNav , true);
    // Manage Swipe
    var touchstartX = 0;
    var touchstartY = 0;
    var touchendX = 0;
    var touchendY = 0;
    const gestureZone = document.getElementById('lfg_imageContainer');

    gestureZone.addEventListener('touchstart', function(event) {
          touchstartX = event.changedTouches[0].screenX;
          touchstartY = event.changedTouches[0].screenY;
          console.log('swipe start');
    }, false);

    gestureZone.addEventListener('touchend', function(event) {
          touchendX = event.changedTouches[0].screenX;
          touchendY = event.changedTouches[0].screenY;
          console.log('swipe end');
          handleGesture();
    }, false); 


    return false;
}

function lfg_render(data){
    // display the image
	imageshow_tpl.replace("{{url}}",data.image.url)
    //Render the data into the template
    var rendered = imageshow_tpl.replace(/{{url}}/g,data.image.url)
                                .replace("{{desc}}",data.image.desc)
	var elemDiv = document.getElementById('lfg_imageContainer');
	if(elemDiv == null){
        elemDiv = document.createElement('div');
		elemDiv.id = 'lfg_imageContainer';
	}


	elemDiv.innerHTML = rendered;
	document.body.appendChild(elemDiv);
    
    // Do not display description if there is none
    if (data.image.desc == null){
        document.getElementById('lfg_desc').style["display"]="none";
    }else{
		lfg_manageDisplayInfo();
	}

    // Preload "previous" and "next" image
    if(imagePositionInGallery < (gallery.length - 1)){
        data = {"image":gallery[imagePositionInGallery+1]}
        preloadImage(data.image.url);
    }

    if(imagePositionInGallery > 0){
        data = {"image":gallery[imagePositionInGallery-1]}
        preloadImage(data.image.url);
    }
}

function lfg_toggleInfo(){
	display_description =! display_description;
	lfg_manageDisplayInfo();
}

function lfg_manageDisplayInfo(){
	var elem = document.getElementById('lfg_desc');
	if(display_description){
		elem.style.display = "inline-block";
	}else{
		elem.style.display = "none";
	}
}

function lfg_goNext(){
    if(imagePositionInGallery < (gallery.length - 1)){
        //data = {"image":{"url":gallery[++imagePositionInGallery].href, "desc":gallery[imagePositionInGallery].desc }}
        data = {"image":gallery[++imagePositionInGallery]}
	    lfg_render(data);
    }

}

function lfg_goPrevious(){
    if(imagePositionInGallery > 0){
        data = {"image":gallery[--imagePositionInGallery]}
        //data = {"image":{"url":gallery[--imagePositionInGallery].href, "desc":gallery[imagePositionInGallery].desc}}
	    lfg_render(data);
    }

}

function lfg_close(){
    window.removeEventListener("keydown", lfg_keyboardNav , true);
    document.body.removeChild(document.getElementById('lfg_imageContainer'))
    document.getElementById('lfg_hidable').style["display"]="block";
    window.scrollTo(0,scrollPosition);
}


// Keyboard management
function lfg_keyboardNav(event) {
    if (event.defaultPrevented) {
        //return; // Should do nothing if the key event was already consumed.
    }

    switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "Enter":
        case "Spacebar":
        case " ":
          lfg_goNext();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          lfg_goPrevious();
          break;
        case "Escape":
        case "Esc":
          lfg_close();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
    }

    // Consume the event for suppressing "double action".
    event.preventDefault();
}


// Swipe management





function handleGesture() {
    if (touchendX <= touchstartX) {
        console.log('Swiped left');
    }
    
    if (touchendX >= touchstartX) {
        console.log('Swiped right');
    }
    
    if (touchendY <= touchstartY) {
        console.log('Swiped up');
    }
    
    if (touchendY >= touchstartY) {
        console.log('Swiped down');
    }
    
    if (touchendY === touchstartY) {
        console.log('Tap');
    }
    lfg_close()
}

/* see https://stackoverflow.com/questions/3646036/preloading-images-with-javascript */
function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}
