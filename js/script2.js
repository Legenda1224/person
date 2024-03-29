!function(){if("function"==typeof window.CustomEvent)return!1;window.CustomEvent=function(t,i){i=i||{bubbles:!1,cancelable:!1,detail:null};var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,i.bubbles,i.cancelable,i.detail),e}}();var WRAPPER_SELECTOR=".slider__wrapper",ITEMS_SELECTOR=".slider__items",ITEM_SELECTOR=".slider__item",CONTROL_CLASS="slider__control",SELECTOR_PREV='.slider__control[data-slide="prev"]',SELECTOR_NEXT='.slider__control[data-slide="next"]',SELECTOR_INDICATOR=".slider__indicators>li",SLIDER_TRANSITION_OFF="slider_disable-transition",CLASS_CONTROL_HIDE="slider__control_hide",CLASS_ITEM_ACTIVE="slider__item_active",CLASS_INDICATOR_ACTIVE="active";function ChiefSlider(t,i){var e="string"==typeof t?document.querySelector(t):t;for(var s in this._$root=e,this._$wrapper=e.querySelector(WRAPPER_SELECTOR),this._$items=e.querySelector(ITEMS_SELECTOR),this._$itemList=e.querySelectorAll(ITEM_SELECTOR),this._$controlPrev=e.querySelector(SELECTOR_PREV),this._$controlNext=e.querySelector(SELECTOR_NEXT),this._$indicatorList=e.querySelectorAll(SELECTOR_INDICATOR),this._minOrder=0,this._maxOrder=0,this._$itemWithMinOrder=null,this._$itemWithMaxOrder=null,this._minTranslate=0,this._maxTranslate=0,this._direction="next",this._balancingItemsFlag=!1,this._activeItems=[],this._transform=0,this._hasSwipeState=!1,this.__swipeStartPos=0,this._transform=0,this._intervalId=null,this._config={loop:!0,autoplay:!1,interval:5e3,refresh:!0,swipe:!0},i)this._config.hasOwnProperty(s)&&(this._config[s]=i[s]);var r=this._$itemList,a=r[0].offsetWidth,n=this._$wrapper.offsetWidth,o=Math.round(n/a);this._widthItem=a,this._widthWrapper=n,this._itemsInVisibleArea=o,this._transformStep=100/o;for(var h=0,_=r.length;h<_;h++)r[h].dataset.index=h,r[h].dataset.order=h,r[h].dataset.translate=0,h<o&&this._activeItems.push(h);if(this._config.loop){var l=r.length-1,d=100*-r.length;r[l].dataset.order=-1,r[l].dataset.translate=100*-r.length,r[l].style.transform="translateX("+d+"%)",this.__refreshExtremeValues()}else this._$controlPrev&&this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);this._setActiveClass(),this._addEventListener(),this._updateIndicators(),this._autoplay()}ChiefSlider.prototype._addEventListener=function(){var t=this._$root,i=this._$items,e=this._config;function s(t){this._autoplay("stop");var i=0===t.type.search("touch")?t.touches[0]:t;this._swipeStartPos=i.clientX,this._hasSwipeState=!0}function r(t){if(this._hasSwipeState){var i=0===t.type.search("touch")?t.changedTouches[0]:t,e=this._swipeStartPos-i.clientX;e>50?(this._direction="next",this._move()):e<-50&&(this._direction="prev",this._move()),this._hasSwipeState=!1,this._config.loop&&this._autoplay()}}t.addEventListener("click",function(t){var i=t.target;if(this._autoplay("stop"),i.classList.contains(CONTROL_CLASS))t.preventDefault(),this._direction=i.dataset.slide,this._move();else if(i.dataset.slideTo){var e=parseInt(i.dataset.slideTo);this._moveTo(e)}this._config.loop&&this._autoplay()}.bind(this)),t.addEventListener("mouseenter",function(t){this._autoplay("stop")}.bind(this)),t.addEventListener("mouseleave",function(t){this._autoplay()}.bind(this)),e.refresh&&window.addEventListener("resize",function(){window.requestAnimationFrame(this._refresh.bind(this))}.bind(this)),e.loop&&(i.addEventListener("transition-start",function(){this._balancingItemsFlag||(this._balancingItemsFlag=!0,window.requestAnimationFrame(this._balancingItems.bind(this)))}.bind(this)),i.addEventListener("transitionend",function(){this._balancingItemsFlag=!1}.bind(this))),e.swipe&&(t.addEventListener("touchstart",s.bind(this)),t.addEventListener("mousedown",s.bind(this)),document.addEventListener("touchend",r.bind(this)),document.addEventListener("mouseup",r.bind(this))),t.addEventListener("dragstart",function(t){t.preventDefault()}.bind(this)),document.addEventListener("visibilitychange",function(){"hidden"===document.visibilityState?this._autoplay("stop"):"visible"===document.visibilityState&&this._config.loop&&this._autoplay()}.bind(this))},ChiefSlider.prototype.__refreshExtremeValues=function(){var t=this._$itemList;this._minOrder=+t[0].dataset.order,this._maxOrder=this._minOrder,this._$itemByMinOrder=t[0],this._$itemByMaxOrder=t[0],this._minTranslate=+t[0].dataset.translate,this._maxTranslate=this._minTranslate;for(var i=0,e=t.length;i<e;i++){var s=t[i],r=+s.dataset.order;r<this._minOrder?(this._minOrder=r,this._$itemByMinOrder=s,this._minTranslate=+s.dataset.translate):r>this._maxOrder&&(this._maxOrder=r,this._$itemByMaxOrder=s,this._minTranslate=+s.dataset.translate)}},ChiefSlider.prototype._balancingItems=function(){if(this._balancingItemsFlag){var t,i=this._$wrapper.getBoundingClientRect(),e=i.width/this._itemsInVisibleArea/2,s=this._$itemList.length;if("next"===this._direction){var r=i.left,a=this._$itemByMinOrder;t=this._minTranslate,a.getBoundingClientRect().right<r-e&&(a.dataset.order=this._minOrder+s,t+=100*s,a.dataset.translate=t,a.style.transform="translateX(".concat(t,"%)"),this.__refreshExtremeValues())}else{var n=i.right,o=this._$itemByMaxOrder;t=this._maxTranslate,o.getBoundingClientRect().left>n+e&&(o.dataset.order=this._maxOrder-s,t-=100*s,o.dataset.translate=t,o.style.transform="translateX(".concat(t,"%)"),this.__refreshExtremeValues())}requestAnimationFrame(this._balancingItems.bind(this))}},ChiefSlider.prototype._setActiveClass=function(){for(var t=this._activeItems,i=this._$itemList,e=0,s=i.length;e<s;e++){var r=i[e],a=+r.dataset.index;t.indexOf(a)>-1?r.classList.add(CLASS_ITEM_ACTIVE):r.classList.remove(CLASS_ITEM_ACTIVE)}},ChiefSlider.prototype._updateIndicators=function(){var t=this._$indicatorList,i=this._$itemList;if(t.length)for(var e=0,s=i.length;e<s;e++){i[e].classList.contains(CLASS_ITEM_ACTIVE)?t[e].classList.add(CLASS_INDICATOR_ACTIVE):t[e].classList.remove(CLASS_INDICATOR_ACTIVE)}},ChiefSlider.prototype._move=function(){var t="next"===this._direction?-this._transformStep:this._transformStep,i=this._transform+t;if(!this._config.loop){var e=this._transformStep*(this._$itemList.length-this._itemsInVisibleArea);if((i=Math.round(10*i)/10)<-e||i>0)return;this._$controlPrev.classList.remove(CLASS_CONTROL_HIDE),this._$controlNext.classList.remove(CLASS_CONTROL_HIDE),i===-e?this._$controlNext.classList.add(CLASS_CONTROL_HIDE):0===i&&this._$controlPrev.classList.add(CLASS_CONTROL_HIDE)}var s,r,a,n=[],o=0;if("next"===this._direction)for(o=0,s=this._activeItems.length;o<s;o++)r=this._activeItems[o],(a=++r)>this._$itemList.length-1&&(a-=this._$itemList.length),n.push(a);else for(o=0,s=this._activeItems.length;o<s;o++)r=this._activeItems[o],(a=--r)<0&&(a+=this._$itemList.length),n.push(a);this._activeItems=n,this._setActiveClass(),this._updateIndicators(),this._transform=i,this._$items.style.transform="translateX("+i+"%)",this._$items.dispatchEvent(new CustomEvent("transition-start",{bubbles:!0}))},ChiefSlider.prototype._moveToNext=function(){this._direction="next",this._move()},ChiefSlider.prototype._moveToPrev=function(){this._direction="prev",this._move()},ChiefSlider.prototype._moveTo=function(t){var i,e,s=this._$indicatorList,r=null,a=null;for(i=0,e=s.length;i<e;i++){var n=s[i];if(n.classList.contains(CLASS_INDICATOR_ACTIVE)){var o=+n.dataset.slideTo;null===a?(r=o,a=Math.abs(t-r)):Math.abs(t-o)<a&&(r=o,a=Math.abs(t-r))}}if(0!==(a=t-r))for(this._direction=a>0?"next":"prev",i=1;i<=Math.abs(a);i++)this._move()},ChiefSlider.prototype._autoplay=function(t){if(this._config.autoplay)return"stop"===t?(clearInterval(this._intervalId),void(this._intervalId=null)):void(null===this._intervalId&&(this._intervalId=setInterval(function(){this._direction="next",this._move()}.bind(this),this._config.interval)))},ChiefSlider.prototype._refresh=function(){var t=this._$itemList,i=t[0].offsetWidth,e=this._$wrapper.offsetWidth,s=Math.round(e/i);if(s!==this._itemsInVisibleArea){this._autoplay("stop"),this._$items.classList.add(SLIDER_TRANSITION_OFF),this._$items.style.transform="translateX(0)",this._widthItem=i,this._widthWrapper=e,this._itemsInVisibleArea=s,this._transform=0,this._transformStep=100/s,this._balancingItemsFlag=!1,this._activeItems=[];for(var r=0,a=t.length;r<a;r++){var n=t[r],o=r;n.dataset.index=o,n.dataset.order=o,n.dataset.translate=0,n.style.transform="translateX(0)",o<s&&this._activeItems.push(o)}if(this._setActiveClass(),window.requestAnimationFrame(function(){this._$items.classList.remove(SLIDER_TRANSITION_OFF)}.bind(this)),this._config.loop){var h=t.length-1,_=100*-t.length;t[h].dataset.order=-1,t[h].dataset.translate=100*-t.length,t[h].style.transform="translateX(".concat(_,"%)"),this.__refreshExtremeValues(),this._updateIndicators(),this._autoplay()}else this._$controlPrev&&this._$controlPrev.classList.add(CLASS_CONTROL_HIDE)}},ChiefSlider.prototype.next=function(){this._moveToNext()},ChiefSlider.prototype.prev=function(){this._moveToPrev()},ChiefSlider.prototype.moveTo=function(t){this._moveTo(t)},ChiefSlider.prototype.refresh=function(){this._refresh()};
document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.slider', {
      loop: true,
      autoplay: true,
      interval: 7000,
    });
  });

  function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger-menu_button', '.burger-menu_lines');
    let links = menu.find('.burger-menu_link');
    let overlay = menu.find('.burger-menu_overlay');
    
    button.on('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });
    
    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());
    
    function toggleMenu(){
      menu.toggleClass('burger-menu_active');
      
      if (menu.hasClass('burger-menu_active')) {
        $('body').css('overlow', 'hidden');
      } else {
        $('body').css('overlow', 'visible');
      }
    }
  }
  
burgerMenu('.burger-menu');


var search = document.getElementById('search');
var button = document.getElementById('button');
var input = document.getElementById('input');

function loading() {
	search.classList.add('loading');
	
	setTimeout(function() {
		search.classList.remove('loading');
	}, 1500);
}

button.addEventListener('click', loading);

input.addEventListener('keydown', function() {
	if(event.keyCode == 13) loading();
});



function onEntry(entry) {
    entry.forEach(change => {
    if (change.isIntersecting) {
    change.target.classList.add('element-show');
    }
    });
  }

  let options2 = {
    threshold: [0.1] };
  let observer2 = new IntersectionObserver(onEntry, options2);
  let elements2 = document.querySelectorAll('.scroll2');
  
  for (let elm of elements2) {
    observer2.observe(elm);
  }

  let options3 = {
    threshold: [0.2] };
  let observer3 = new IntersectionObserver(onEntry, options3);
  let elements3 = document.querySelectorAll('.scroll3');
  
  for (let elm of elements3) {
    observer3.observe(elm);
  }

  let options4 = {
    threshold: [0.2] };
  let observer4 = new IntersectionObserver(onEntry, options4);
  let elements4 = document.querySelectorAll('.scroll4');
  
  for (let elm of elements4) {
    observer4.observe(elm);
  
  }

  let options5 = {
    threshold: [0.2] };
  let observer5 = new IntersectionObserver(onEntry, options5);
  let elements5 = document.querySelectorAll('.scroll5');
  
  for (let elm of elements5) {
    observer5.observe(elm);
  
  }


