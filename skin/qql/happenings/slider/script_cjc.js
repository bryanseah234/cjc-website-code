$(function(){
 slider.init();
});

var slider={
 num:-1,
 current:0,
 //cr:[]
 autoLoop:null,
 sliderWidth:1200,
 thumbWidth:190,//imgwidth+border+marginright
 animSpeed:0.8*1000,
 pauseTime:6*1000,
 autoRepeat:true,
 navType:'thumb', //thumb, nothumb
 navEach:5,
 navCurrent:1,
 
 //init function
 init:function(){
  if(!$('#slide-runner').children())
   return false;

  //var d=slider.data;
  //alert(slider.num);
  slider.num=$('#slide-runner').children().length;

  //disable nav next button
  if(slider.num<=slider.navEach){
	//$('#slide-nav-next').addClass("off");
  }
  //set navigation bar width
  var navWidth = slider.thumbWidth*slider.navEach-5;
  var navCount = Math.ceil(slider.num/slider.navEach);
  if(slider.navType=="thumb"){
		$('#slide-nav').width(navWidth);
  }
  
  var pos=Math.floor(Math.random()*1);//slider.num);
  for(var i=0;i<slider.num;i++){
   //slider image
   $('#slide-runner img#slide-img-'+(i+1)).css({left:((i-pos)*slider.sliderWidth)});
   var title = $("#title_"+i).html();
    breakpoint = title.search(":");
	
	firstLine = title.slice(0,breakpoint);
    secondLine = title.slice(breakpoint+1);
   
   //slider nav thumbnail
   if(title.search(":")!='-1'){
		$('#slide-nav').append('<a id="slide-link-'+i+'" href="#" onclick="slider.slide('+i+');return false;" onfocus="this.blur();">' + firstLine +"<br>"+secondLine + '</a>');
	}
	else{
		$('#slide-nav').append('<a id="slide-link-'+i+'" href="#" onclick="slider.slide('+i+');return false;" onfocus="this.blur();">'+ title + '</a>');
	}
   if(slider.navType=="thumb"){
		$('#slide-thumb-'+i).css({left:((i-pos)*180)});
	}
  }
  
  //nav prev and next button
  //$('#slide-nav-prev').live("click",function(){slider.navPrev(navWidth,navCount);});
  //$('#slide-nav-next').live("click",function(){slider.navNext(navWidth,navCount);});
  $('#slide-nav-prev').click(function(){slider.prevNav();});
  $('#slide-nav-next').click(function(){slider.nextNav();});

  $('img,div#slide-controls',$('div#slide-holder')).fadeIn();
 // slider.text(pos);
  slider.on(pos);
  slider.current=pos;
  window.setTimeout('slider.auto();',slider.pauseTime);
 },
 
 //test
 test:function(){
	alert('1');
 },
 //auto loop
 auto:function(){
  if(!slider.autoRepeat)
   return false;

  var next=slider.current+1;
  if(next>=slider.num) next=0;
  slider.slide(next);
 },
 
 //main function
 slide:function(pos){
  if(pos<0 || pos>=slider.num || pos==slider.current)
   return;

  var navWidth = slider.thumbWidth*slider.navEach-5;
  var navCount = Math.ceil(slider.num/slider.navEach);
  
  window.clearTimeout(slider.autoLoop);
  slider.autoLoop=window.setTimeout('slider.auto();',slider.pauseTime);

  //var d=slider.data;
  for(var i=0;i<slider.num;i++)
   //$('#'+d[i].id).stop().animate({left:((i-pos)*slider.sliderWidth)},slider.animSpeed);
   $('#slide-runner img#slide-img-'+(i+1)).stop().animate({left:((i-pos)*slider.sliderWidth)},slider.animSpeed);
   
  //navigation bar auto slide
  if(((pos+1)%slider.navEach)==1 || slider.navEach==1)
	slider.navNext(navWidth,navCount,pos);
	
  if(pos==0)
    slider.navReset(navWidth);
	
  slider.on(pos);
 // slider.text(pos);
  slider.contentSwitch(pos);
  slider.current=pos;
 },
 
 //highlight thumbnail in navigation
 on:function(pos){
  $('#slide-nav a').removeClass('on');
  $('#slide-nav a#slide-link-'+pos).addClass('on');
  if(slider.navType=="thumb"){
  $('#slide-nav img.thumb').removeClass('on');
  $('#slide-nav img#slide-thumb-'+pos).addClass('on');
  }
 },
 
 //choose text
 text:function(pos){
  //slider.cr['a']=di.client;
  //slider.cr['b']=di.desc;
  var title = $('#slide-content-holder #slide-content-'+(pos+1)+' .slide-content-title').text();

  //if title has ":" , break to two lines
  if(title.search(":")!='-1'){
	  breakpoint = title.search(":");
//alert('1');
	  firstLine = title.slice(0,breakpoint+1);
	  secondLine = title.slice(breakpoint+1);

	  //add class to existing span, create second span
	  $('#slide-client').html("<div class='first'></div><div class='second'></div>");

	  slider.ticker('#slide-client div.first',firstLine,0);
	  //slider.ticker('#slide-client div.second',secondLine,0);
	  window.setTimeout('slider.ticker("#slide-client div.second","'+secondLine+'",'+0+');',(breakpoint+5)*30);
  }
  else {
	  $('#slide-client').html("<span></span>");
	  slider.ticker('#slide-client span',title,0);
  }
  //slider.ticker('#slide-desc',di.desc,0,'b');
 },
 
 //ticker effect for title
 ticker:function(el,text,pos,unique){
  //if(slider.cr[unique]!=text)
  // return false;

  ctext=text.substring(0,pos)+(pos%2?'-':'_');
  $(el).html(ctext);

  if(pos==text.length)
   $(el).html(text);
  else
   window.setTimeout('slider.ticker("'+el+'","'+text+'",'+(pos+1)+');',30);
 },
 
 //slide description fade in effect
 contentSwitch:function(pos){
 //alert(pos);
	var $all = $('#slide-content-holder .slide-content');
	var $active = $('#slide-content-holder #slide-content-'+(pos+1));

    //if ( $active.length == 0 ) $active = $('#slide-content-holder .slide-content:last');
	//var $next =  $active.next().length ? $active.next(): $('#slide-content-holder .slide-content:first');
	
	$all.removeClass("active").css({display:"none"});
	
	$active.fadeIn(slider.animSpeed).addClass("active");
 },
 
 //navigation bar reset
 navReset:function(navWidth){
	if(slider.navCurrent==1)
	return false;
	
	for(var i=0;i<slider.num;i++){
		$('#slide-nav img#slide-thumb-'+i).stop().animate({left:i*slider.thumbWidth},slider.animSpeed);
	}
    if(slider.num>slider.navEach)
		//$('#slide-nav-next').removeClass("off");
	
	slider.navCurrent=1;
	//$('#slide-nav-prev').addClass("off");
 },
 
 //navigation bar prev buttion click
 navPrev:function(navWidth){
	if(slider.navCurrent==1)
	return false;
	
	//alert(slider.navCurrent);
	/*for(var i=0;i<slider.num;i++){
		$('#slide-nav img#slide-thumb-'+i).stop().animate({left:-(slider.navCurrent-2)*(navWidth+5)+i*slider.thumbWidth},slider.animSpeed);
	}*/
	if(slider.num>slider.navEach)
		$('#slide-nav-next').removeClass("off");
	
	slider.navCurrent-=1;
	
	if(slider.navCurrent==1)
		$('#slide-nav-prev').addClass("off");
 },
 
 //navigation bar next buttion click
 navNext:function(navWidth,navCount){
	if(slider.navCurrent==navCount)
	return false;
	
	/*for(var i=0;i<slider.num;i++){
		$('#slide-nav img#slide-thumb-'+i).stop().animate({left:-slider.navCurrent*(navWidth+5)+i*slider.thumbWidth},slider.animSpeed);
	}*/
	$('#slide-nav-prev').removeClass("off");
	
	slider.navCurrent+=1;
	
	if(slider.navCurrent==navCount)
		$('#slide-nav-next').addClass("off");
	
 },
 prevNav: function(){
	var d = parseInt($("#slide-nav a.on").attr("id").slice(11,12));
	var prev = (d == 0)? 4: d -1;
	slider.slide(prev);
 },
 nextNav: function(){
	var d = parseInt($("#slide-nav a.on").attr("id").slice(11,12));
	var next = (d == 4)? 0 : d + 1;
	slider.slide(next);
 }
 
 
};
