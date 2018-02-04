test_mode = false;
test_inisec = 0


var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();



var waitBeforeRepeatEvent = (function () {
  var time_func = {};

  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
	var d = new Date();
	var t = d.getTime();
	var new_t = d.getTime() + ms;
    if ( ( time_func[uniqueId] && time_func[uniqueId] < t ) || !time_func[uniqueId]) {
		time_func[uniqueId] = new_t;
		callback();
    }
    
  };
})();


readyBeforeDefinitions = [];
jQuery(document).ready(function(){
	Modernizr.on('videoautoplay', function(result) {
	  if (result) {
		// supported
	  } else {
		// not-supported
		jQuery(".video_fallback").each(function(){
			jQuery(this).css("background-image", "url('"+jQuery(this).attr("data_video-fallback")+"')")			
		})
	  }
	});
})
jQuery(document).ready(function(){

	for(i = 0; i<readyBeforeDefinitions.length;i++){
		(readyBeforeDefinitions[i])();
	}
	



	setUpPreloaderAnimation()
	
	if(test_mode){
		stopPreloader()
		setStartAppear()
	}
})

jQuery(window).on('load', function () {
	 setTimeout(function(){stopPreloaderFirst()}, 200)
});
pageHasLoad = false;
function stopPreloaderFirst(){
	pageHasLoad = true;
	jQuery("body").addClass("first_loaded_completed")

}
function stopPreloader(){
	jQuery("body").removeClass("ajax_loading")
	TweenMax.to("#site_preloader", .5, {autoAlpha:0})
}
function startPreloader(){
	jQuery("body").addClass("ajax_loading")
	TweenMax.to("#site_preloader", .5, {autoAlpha:1})
}














var tl_intro = new TimelineMax()
function setUpPreloaderAnimation(){
	var logo_preloader = jQuery(".captivate_preloader_icon svg")
	var logo_v = logo_preloader.find(".capt_icon_v")
	var logo_lines = logo_preloader.find(".capt_icon_bar")
	
		tl_intro = new TimelineMax({
			onComplete:function(){
				if(pageHasLoad){
					checkPreloadEnds()
				}else{
					this.play("loop");
				}
				
			}	
		
		});
			
		tl_intro.set(logo_preloader,{visibility:"visible"})
				/*.set(logo_lines,{attr:{width:0}})
				.set(logo_v,{scale:0, transformOrigin:"50% 50%"})
				.to(logo_v,1,{scale:1, ease:Back.easeOut})
				.addLabel("loop")
				.staggerTo(logo_lines,.6,{attr:{width:39}, ease:Power3.easeInOut}, .3)
				.addCallback(checkPreloadEnds)
				.staggerTo(logo_lines,.6,{attr:{x:39, width:0}, ease:Power3.easeInOut}, .3)
				.staggerTo(logo_lines,.6,{attr:{x:0, width:39}, ease:Power3.easeInOut}, .3)
				.addCallback(checkPreloadEnds)
				.staggerTo(logo_lines,.6,{attr:{x:0, width:0}, ease:Power3.easeInOut}, .3)*/
				
	
	tl_intro.play(0);
	
	

}

function checkPreloadEnds(){
		if(pageHasLoad){
			tl_intro.stop();
			stopPreloader()
			setUpLogoAnimation()
			
			waitForFinalEvent(function(){
				tl_logo_home.play(0);
			}, 750, "tl_logo_home");
		}
}




var tl_logo_home = new TimelineMax()
function setUpLogoAnimation(){
	var logo_home = jQuery(".logo_svg_animated")
	var horse_lines = jQuery(".horse_lines_0")
	var logo_label = jQuery("#logo_label")
	//var logo_label_bg = jQuery("#logo_label .label_bg")
	var logo_label_bg_a = jQuery("#logo_label .label_bg_rect_a")
	var logo_label_bg_b = jQuery("#logo_label .label_bg_rect_b")
	var logo_label_characters = jQuery(".label_character")
	width_logo_label_bg_a = parseFloat(logo_label_bg_a.attr("data-width"))
	x_logo_label_bg_a = parseFloat(logo_label_bg_a.attr("data-x"))
	width_logo_label_bg_b = parseFloat(logo_label_bg_b.attr("data-width"))
	x_logo_label_bg_b = parseFloat(logo_label_bg_b.attr("data-x"))
	TweenMax.set(logo_label_characters,{ transformOrigin:"center center"})
	TweenMax.set(logo_label_bg_a,{ transformOrigin:"center right"})
	TweenMax.set(logo_label_bg_b,{ transformOrigin:"center left"})
	

		tl_logo_home = new TimelineMax({
			onComplete:function(){
				setUpLogoAnimation()
				tl_logo_home.play(0)
			}	
		
		});
			
		tl_logo_home.set(logo_label_bg_a,{attr:{width:0, x:(x_logo_label_bg_a+width_logo_label_bg_a)}})
				.set(logo_label_bg_b,{attr:{width:0,x:x_logo_label_bg_b}})
				.set(logo_label_characters,{autoAlpha:0,scale:.8})
		
				.staggerFromTo(horse_lines,1,{drawSVG:"0%"}, {drawSVG:"100%", ease:Power1.easeInOut}, .1)
				
				.to(logo_label_bg_a, .7,{attr:{width:width_logo_label_bg_a, x:x_logo_label_bg_a}, ease:Power3.easeOut}, "-=.5")
				.to(logo_label_bg_b, 1,{attr:{width:width_logo_label_bg_b}, ease:Power3.easeOut}, "-=.5")
				.staggerTo(logo_label_characters, .5,{autoAlpha:1,scale:1, ease:Power3.easeOut},.1, "-=1")
				
				
				
				.staggerTo(horse_lines,1,{delay:3, drawSVG:"0%", ease:Power1.easeInOut}, .05)
				
				.staggerTo(logo_label_characters, .5,{autoAlpha:0,scale:.8, ease:Back.easeOut},.07, "-=.3")
				.to(logo_label_bg_a, .4,{attr:{width:0}, ease:Power3.easeOut}, "-=1")
				.to(logo_label_bg_b, .5,{attr:{width:0, x:(x_logo_label_bg_b+width_logo_label_bg_b)}, ease:Power3.easeOut}, "-=.6")
				
			
		tl_logo_home.stop();

	

}











var pcIniDate = new Date();
var offset = pcIniDate.getTimezoneOffset()*60*1000;
//var NYCtimeoffset = -400*60*1000;



var new_NYCtimeoffset = -(5*60)*60*1000; //(5 hours); 
//NYCtimeoffset is defined on the HTML to give an easy way to overwrite the countdown offset.
if(typeof(NYCtimeoffset) != "undefined" && NYCtimeoffset != ""){
	new_NYCtimeoffset = NYCtimeoffset;
}
//Coordinated with GMT Universal, which is 4 hours ahead NYC, so 15h GMT is 11am NYC
//this will be de fallback countdown date in case is not defined on the HTML:
new_countDownDate = "January 30, 2018 15:00:00"; 
//countDownDate is defined on the HTML to give an easy way to overwrite the countdown date.
if(typeof(countDownDate) != "undefined" && countDownDate != ""){
	new_countDownDate = countDownDate;
}
var countdownEndDate = new Date(new_countDownDate);
countdownEndDate.setTime(countdownEndDate.getTime() - offset - new_NYCtimeoffset);
var countdownEndDate_time = countdownEndDate.getTime();

//console.log(countdownEndDate_time)
var countdown_internval;

jQuery(document).ready(function(){
	// Update the count down every 1 second
	printDateCountdown()
	countdown_internval = setInterval(printDateCountdown, 1000);
})
function printDateCountdown(){

		
	  // Get todays date and time
	  var now = new Date();
	  now = now.getTime();

	  // Find the distance between now an the count down date
	  var distance = countdownEndDate_time - now;
	
	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  // Display the result in the element with id="demo"
	  
		if (distance >= 1000) {
			printDateValue(jQuery("#top_value_days"), days)
			printDateValue(jQuery("#top_value_hours"), hours)
			printDateValue(jQuery("#top_value_mins"), minutes)
			printDateValue(jQuery("#top_value_secs"), seconds)
		}

		if(days == 0){
			jQuery(".top_countdown").addClass("less_than_a_day");
		}else{
			jQuery(".top_countdown").removeClass("less_than_a_day");
		}
	  // If the count down is finished, write some text
	  if (distance < 1000) {
		//clearInterval(countdown_internval);
		jQuery(".top_countdown").addClass("less_than_a_day");
		jQuery("#top_value_days").html("00");
		jQuery("#top_value_hours").html("00");
		jQuery("#top_value_mins").html("00");
		jQuery("#top_value_secs").html("00");
		jQuery(".top_countdown").addClass("finished");
		jQuery(".banner_holder_block").addClass("timeout_finished");
		/*
		waitBeforeRepeatEvent(function(){
			setBonusValue()
		}, 5000, "setBonusValue");
		*/
	  }else{
		  jQuery(".top_countdown").removeClass("finished");
		  jQuery(".banner_holder_block").removeClass("timeout_finished");
	  }
	
}

function printDateValue(_target, _value){
	current_value = _target.attr("current_val");
	if(current_value != _value && typeof _value == 'number' && _value > -1){
		_target.attr("current_val", _value);
		if(parseInt(_value) < 10) _value = "0"+_value
		_target.html(_value)
		TweenMax.killTweensOf(_target);
		TweenMax.set(_target,{scale:.7 });
		TweenMax.to(_target,.5,{scale:1,  ease:Power3.easeOut});
	}else if(typeof _value != 'number' && _value < 0){
		_target.html("0")
	}
}







