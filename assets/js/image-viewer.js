!function(){"use strict";{const t=document.createElement("template");t.innerHTML=`
    <style>
      .container-slider {
        position: relative;
        width: 100%;
      }

      .preview-image {
        width: 100%;
        height: 100%;
        cursor: pointer;
        box-sizing: border-box;
      }

      .container-resized-image {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 99;
        top: 0;
        left: 0;
        padding: 20px;
        box-sizing: border-box;
      }

      .container-image, .resized-image-container {
        position: relative;
        max-height: 100%;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
        box-sizing: border-box;
      }

      .resized-image {
        position: relative;
        max-height: 100%;
        max-width: 100%;
        display: block;
        margin: auto;
        top: 50%; 
        transform: translateY(-50%);
        cursor: zoom-in;
        box-sizing: border-box;
      }

      .pre-btn, .next-btn {
        position: relative;
        cursor: pointer;
        top: 50%; 
        transform: translateY(-50%);
        padding: 0;
        border:none;
        background-color: transparent;
        z-index: 99;
      }

      .pre-btn {
        margin-right: 8px;
      } 
      
      .next-btn {
        margin-left: 8px;
      }

      .pre-svg, .next-svg {
        height: 3rem;
        fill: rgb(241, 241, 241);
        position: relative;
      }

      .close-btn {
        position: absolute;
        background-color: transparent;
        height: 2.8rem;
        width: 2.8rem;
        right: 10px;
        top: 10px;
        cursor: pointer;
        border: 1px solid rgb(179, 179, 179);
        border-radius: 4px;
      }

      .close-svg {
        height: 2.6rem;
        fill: rgb(241, 241, 241);
      }
    </style>

    <div class="container-image">
      <img class="preview-image" src="" alt="">
      <div class="container-resized-image" style="display: none">
        <div class="pre">
          <button class="pre-btn" title="previous image">
            <svg xmlns="http://www.w3.org/2000/svg" class="pre-svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>
          </button>
        </div>
        <div class="resized-image-container">
          <img class="resized-image" src="" alt="">
        </div>
        <div class="next">
          <button class="next-btn" title="next image">
            <svg xmlns="http://www.w3.org/2000/svg" class="next-svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
          </button>
        </div>
        <button class="close-btn" title="close">
          <svg xmlns="http://www.w3.org/2000/svg" class="close-svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
      </div>
    </div>
  `;class e extends HTMLElement{#state={thumbnails:[]};#containerImage=null;#previewImage=null;#containerResizedImage=null;#resizedImageContainer=null;#resizedImage=null;#preBtn=null;#nextBtn=null;#closeBtn=null;#isImageResized=!1;mousedown=!1;#clonedResizeImage=null;#isMoveded=!1;#oldX=0;#oldY=0;constructor(){super();const e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),this.#containerImage=e.querySelector(".container-image"),this.#previewImage=e.querySelector(".preview-image"),this.#containerResizedImage=e.querySelector(".container-resized-image"),this.#resizedImageContainer=e.querySelector(".resized-image-container"),this.#resizedImage=e.querySelector(".resized-image"),this.#preBtn=e.querySelector("button.pre-btn"),this.#nextBtn=e.querySelector("button.next-btn"),this.#closeBtn=e.querySelector("button.close-btn")}set thumbnails(e){this.#state.thumbnails=e,this.#previewImage.src=e[0].imagePath,this.#previewImage.alt=e[0].imageAlt,this.#previewImage.dataset.index="0"}set preImage(e){this.#previewImage.src=e.imagePath,this.#previewImage.alt=e.imageAlt,this.#previewImage.dataset.index=e.imageIndex}static get observedAttributes(){return["margin-image","radius-image","image-border"]}attributeChangedCallback(e,t,i){"margin-image"===e?this.#containerImage.style.marginBottom=i:"radius-image"===e?this.#previewImage.style.borderRadius=i:"image-border"===e&&(this.#previewImage.style.border=i)}connectedCallback(){this.#resizePreImage(),this.#closeResizedPreImage(),this.#handlePreBtn(),this.#handleNextBtn(),this.#onClickImage()}#resizePreImage(){this.#previewImage.addEventListener("click",e=>{this.#containerResizedImage.style.display="flex",this.#resizedImage.src=this.#previewImage.src,this.#resizedImage.alt=this.#previewImage.alt,this.#resizedImage.dataset.index=this.#previewImage.dataset.index,this.#isImageResized=!1,this.#setResizeImageToDefault()})}#closeResizedPreImage(){this.#closeBtn.addEventListener("click",e=>{this.#containerResizedImage.style.display="none"})}#onClickImage(){this.#resizedImage.addEventListener("click",e=>{!1===this.#isImageResized&&(this.#clonedResizeImage=this.#resizedImage.cloneNode(!0)),!1===this.#isMoveded&&(this.#isImageResized=!this.#isImageResized),!1===this.#isImageResized?this.#resetImage():(this.#moveImage(),this.#setResizeImageToNatrual())})}#setResizeImageToDefault(){this.#resizedImage.style.maxWidth="100%",this.#resizedImage.style.maxHeight="100%",this.#resizedImage.style.cursor="zoom-in",this.#resizedImage.style.top="",this.#resizedImage.style.left=""}#setResizeImageToNatrual(){this.#resizedImage.style.maxWidth=this.#resizedImage.naturalWidth+"px",this.#resizedImage.style.maxHeight=this.#resizedImage.naturalHeight+"px",this.#resizedImage.style.cursor="grab"}#resetImage(){this.#resizedImage.replaceWith(this.#clonedResizeImage),this.#resizedImage=this.shadowRoot.querySelector(".resized-image"),this.#onClickImage()}#moveImage(){this.#onMouseDown(),this.#onMouseUp(),this.#onMouseMove()}#onMouseDown(){this.#resizedImage.addEventListener("mousedown",e=>{this.#down(e)},!1)}#onMouseUp(){this.#resizedImage.addEventListener("mouseup",e=>{this.#up()},!1)}#onMouseMove(){this.#containerResizedImage.addEventListener("mousemove",e=>{this.mousedown&&this.#move(e)},!1)}#down(e){this.#resizedImage.style.cursor="grabbing",this.mousedown=!0,this.#isMoveded=!1;var t=e.clientX,i=e.clientY;this.#oldX=t-this.#resizedImage.offsetLeft,this.#oldY=i-this.#resizedImage.offsetTop,e.preventDefault()}#up(){this.mousedown=!1,this.#resizedImage.style.cursor="grab"}#move(e){this.#isMoveded=!0;var t=e.clientX,e=e.clientY,t=t-this.#oldX,e=e-this.#oldY,t=(t<=0&&t>=this.#resizedImageContainer.offsetWidth-this.#resizedImage.offsetWidth&&(this.#resizedImage.style.left=t+"px"),this.#resizedImage.offsetHeight/2);e<=t&&e>=this.#resizedImageContainer.offsetHeight-t&&(this.#resizedImage.style.top=e+"px")}#handlePreBtn(){this.#preBtn.addEventListener("click",e=>{let t=this.#state.thumbnails.length-1;0!==Number(this.#resizedImage.dataset.index)&&(t=Number(this.#resizedImage.dataset.index)-1),this.#setResizedImage(t)})}#handleNextBtn(){this.#nextBtn.addEventListener("click",e=>{let t=0;Number(this.#resizedImage.dataset.index)<this.#state.thumbnails.length-1&&(t=Number(this.#resizedImage.dataset.index)+1),this.#setResizedImage(t)})}#setResizedImage(e){this.#resizedImage.src=this.#state.thumbnails[e].imagePath,this.#resizedImage.alt=this.#state.thumbnails[e].imageAlt,this.#resizedImage.dataset.index=e,this.#isImageResized=!1,this.#setResizeImageToDefault()}}customElements.define("preview-image",e)}{const i=document.createElement("template");i.innerHTML=`
    <style>
      .container-slider {
        position: relative;
        display: inline-flex;
        width: 100%;
        box-sizing: border-box;
        padding: 4px 0;
      }

      .container-thumbnails {
        position: relative;
        display:inline-flex;
        overflow:hidden;
        width:100%;
      }

      .thumbnails {
        position: relative;
        display: inline-flex;
        left: 0;
        transition: all 1s ease 0s;
        width:100%;
      }

      .thumbnail-image {
        height: 100%;
        width: auto;
        cursor: pointer;
        border: 1px solid rgb(179, 179, 179);
        box-sizing: border-box;
      }

      .pre, .next {
        position: relative;
        padding: 0;
      }

      .pre-btn, .next-btn {
        position: relative;
        cursor: pointer;
        top: 50%; 
        transform: translateY(-50%);
        padding: 0;
        border:none;
        background-color: transparent;
      }

      button:disabled,
      button[disabled]{
        cursor: default;
      }

      .pre-svg, .next-svg {
        height: 2.5rem;
        position: relative;
      }

      .pre-svg {
        margin-left: 2px;
      }

      .next-svg {
        margin-right: 2px;
      }
    </style>

    <div class="container-slider">
      <div class="pre">
        <button class="pre-btn" title="previous images">
          <svg xmlns="http://www.w3.org/2000/svg" class="pre-svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>
        </button>
      </div>
      <div class="container-thumbnails">
        <div class="thumbnails"></div>
      </div>
      <div class="next">
        <button class="next-btn" title="next images">
          <svg xmlns="http://www.w3.org/2000/svg" class="next-svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
        </button>
      </div>
    </div>
  `;class s extends HTMLElement{#state={thumbnails:[]};#containerSlider=null;#thumbnails=null;#preBtn=null;#nextBtn=null;#preSvg=null;#nextSvg=null;#defaultSlideLength=0;#currentSlideLength=0;#countOfThumbnails=0;#marginRight=4;#completeThumbsLength=0;#colorIcon="#a3201a";#sliderHeight="60px";constructor(){super();const e=this.attachShadow({mode:"closed"});e.appendChild(i.content.cloneNode(!0)),this.#containerSlider=e.querySelector(".container-slider"),this.#thumbnails=e.querySelector(".thumbnails"),this.#preBtn=e.querySelector("button.pre-btn"),this.#nextBtn=e.querySelector("button.next-btn"),this.#preSvg=e.querySelector(".pre-svg"),this.#nextSvg=e.querySelector(".next-svg")}set thumbnails(e){this.#state.thumbnails=e,this.#showThumbNails(this.#state.thumbnails),setTimeout(()=>{this.#calculateSlider()},1e3)}get thumbnails(){return this.#state.thumbnails}static get observedAttributes(){return["thumbnail-height","color-bg","color-icon","radius-slider","slider-border"]}attributeChangedCallback(e,t,i){"thumbnail-height"===e?this.#containerSlider.style.height=i:"color-bg"===e?this.#containerSlider.style.background=i:"color-icon"===e?(this.#preSvg.style.fill=i,this.#nextSvg.style.fill=i):"radius-slider"===e?this.#containerSlider.style.borderRadius=i:"slider-border"===e&&(this.#containerSlider.style.border=i)}connectedCallback(){this.#settings()}#settings(){this.hasAttribute("thumbnail-height")||(this.#containerSlider.style.height=this.#sliderHeight),this.hasAttribute("color-icon")||(this.#preSvg.style.fill=this.#colorIcon,this.#nextSvg.style.fill=this.#colorIcon),this.#disableBtn(this.#preBtn,this.#preSvg),this.#handlePreThumbnail(),this.#handleNextThumbnail(),window.addEventListener("resize",e=>this.#onResizeWindow(),!0)}#onResizeWindow(){this.#currentSlideLength=0,this.#thumbnails.style.left=this.#currentSlideLength+"px",this.#disableBtn(this.#preBtn,this.#preSvg),this.#enableBtn(this.#nextBtn,this.#nextSvg),this.#calculateSlider()}#showThumbNails(e){e.forEach((e,t)=>{const i=document.createElement("img"),s=(i.src=e.imagePath,i.alt=e.imageAlt,i.classList="thumbnail-image",i.style.marginRight=this.#marginRight+"px",i.dataset.index=t,{imagePath:e.imagePath,imageAlt:e.imageAlt,imageIndex:t});i.addEventListener("click",e=>this.dispatchEvent(new CustomEvent("event-image",{detail:s}))),this.#thumbnails.appendChild(i)})}#handlePreThumbnail(){this.#preSvg.addEventListener("click",e=>{0!==this.#currentSlideLength&&-1*this.#currentSlideLength>this.#defaultSlideLength?this.#currentSlideLength+=this.#defaultSlideLength:(this.#currentSlideLength=0,this.#disableBtn(this.#preBtn,this.#preSvg)),this.#enableBtn(this.#nextBtn,this.#nextSvg),this.#thumbnails.style.left=this.#currentSlideLength+"px"})}#handleNextThumbnail(){this.#nextSvg.addEventListener("click",e=>{-1*this.#currentSlideLength+this.#defaultSlideLength<this.#completeThumbsLength?this.#currentSlideLength-=this.#defaultSlideLength:(this.#disableBtn(this.#nextBtn,this.#nextSvg),this.#currentSlideLength=-this.#completeThumbsLength),this.#enableBtn(this.#preBtn,this.#preSvg),this.#thumbnails.style.left=this.#currentSlideLength+"px"})}#disableBtn(e,t){e.disabled=!0,t.style.opacity="0.6"}#enableBtn(e,t){e.disabled=!1,t.style.opacity="1"}#calculateSlider(){var e=this.#thumbnails.querySelectorAll(".thumbnail-image")[0].offsetWidth+this.#marginRight;this.#countOfThumbnails=Math.floor(this.#thumbnails.offsetWidth/e),this.#defaultSlideLength=e*this.#countOfThumbnails,this.#completeThumbsLength=this.#thumbnails.scrollWidth-this.#thumbnails.offsetWidth}}customElements.define("thumbnail-slider",s)}{const n=document.createElement("template");n.innerHTML=`
    <div class="container-image-viewer">
      <preview-image></preview-image>
      <thumbnail-slider></thumbnail-slider>
    </div>
  `;class a extends HTMLElement{#previewImage=null;#thumbnailSlider=null;constructor(){super();const e=this.attachShadow({mode:"closed"});e.appendChild(n.content.cloneNode(!0)),this.#previewImage=e.querySelector("preview-image"),this.#thumbnailSlider=e.querySelector("thumbnail-slider")}set thumbnails(e){this.#thumbnailSlider.thumbnails=e,this.#previewImage.thumbnails=e}static get observedAttributes(){return["thumbnail-height","color-bg","color-icon","margin-image","radius-image","radius-slider","image-border","slider-border"]}attributeChangedCallback(e,t,i){"thumbnail-height"===e?this.#thumbnailSlider.setAttribute("thumbnail-height",i):"color-bg"===e?this.#thumbnailSlider.setAttribute("color-bg",i):"color-icon"===e?this.#thumbnailSlider.setAttribute("color-icon",i):"margin-image"===e?this.#previewImage.setAttribute("margin-image",i):"radius-image"===e?this.#previewImage.setAttribute("radius-image",i):"radius-slider"===e?this.#thumbnailSlider.setAttribute("radius-slider",i):"image-border"===e?this.#previewImage.setAttribute("image-border",i):"slider-border"===e&&this.#thumbnailSlider.setAttribute("slider-border",i)}connectedCallback(){this.#handleThumbnailClick()}#handleThumbnailClick(){this.#thumbnailSlider.addEventListener("event-image",e=>{this.#previewImage.preImage=e.detail})}}customElements.define("image-viewer",a)}}();