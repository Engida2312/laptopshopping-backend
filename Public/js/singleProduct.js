document.getElementById('singel_page_zoomedimage').addEventListener('mouseover', function () {
    imageZoom('zoomdimg')

})
function imageZoom(imgID) {
    // let cont = document.getElementsByClassName('singel_page_productimage');
    let img = document.getElementById(imgID);
    let lens = document.getElementById('lens');
    lens.style.backgroundImage = `url(${img.src})`
    // console.log("width", cont.width);
    // console.log("height", cont.height);
    let ratio = 1
    lens.style.backgroundSize = "1000px";
    const siz = (img.width * ratio) + (img.height * ratio);
    console.log("size", siz)

    img.addEventListener("mousemove", moveLens)
    lens.addEventListener("mousemove", moveLens)
    img.addEventListener("touchmove", moveLens)
    function moveLens() {
        /*
        Function sets sets position of lens over image and background image of lens
        1 - Get cursor position
        2 - Set top and left position using cursor position - lens width & height / 2
        3 - Set lens top/left positions based on cursor results
        4 - Set lens background position & invert
        5 - Set lens bounds
    
        */

        //1
        let pos = getCursor()
        console.log('pos:', pos)

        //2
        let positionLeft = pos.x - (lens.offsetWidth / 2)
        let positionTop = pos.y - (lens.offsetHeight / 2)

        //5
        // if (positionLeft < 0) {
        //     positionLeft = 0

        // }

        // if (positionTop < 0) {
        //     positionTop = 0
        // }

        // if (positionLeft > img.width - lens.offsetWidth / 3) {
        //     positionLeft = img.width - lens.offsetWidth
        // }

        // if (positionTop > img.height - lens.offsetHeight / 3) {
        //     positionTop = img.height - lens.offsetHeight
        // }
        //
        if (positionLeft < 0 || positionTop < 0 || positionLeft > img.width - lens.offsetWidth / 3 || positionTop > img.height - lens.offsetHeight / 3) {
            lens.style.display = "none";
        }
        else {
            lens.style.display = "block";
        }

        //3
        lens.style.left = positionLeft + 'px';
        lens.style.top = positionTop + 'px';

        //4
        lens.style.backgroundPosition = "-" + (pos.x * ratio) + 'px -' + (pos.y * ratio) + 'px'
    }

    function getCursor() {
        /* Function gets position of mouse in dom and bounds
         of image to know where mouse is over image when moved
        
        1 - set "e" to window events
        2 - Get bounds of image
        3 - set x to position of mouse on image using pageX/pageY - bounds.left/bounds.top
        4- Return x and y coordinates for mouse position on image
        
         */

        let e = window.event
        let bounds = img.getBoundingClientRect()

        //console.log('e:', e)
        //console.log('bounds:', bounds)
        let x = e.pageX - bounds.left
        let y = e.pageY - bounds.top
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return { 'x': x, 'y': y }
    }


}

imageZoom('zoomdimg');
