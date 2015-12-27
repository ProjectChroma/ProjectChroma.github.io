var slideshows = [];
$(function(){
	$(".slideshow").wrap("<div class='slideshow-wrapper'></div>").each(function(index){
		slideshows[$(this)] = new Slideshow($(this));
	});
});
function Slideshow(el){
	this.element = el;
	el.children("img").css("height", el.css("height"));
	el.children("img").on("mousedown", function(event){
		slideshows[$(this).parent()].select($(this).index());
	});
	this.select(0);
}
Slideshow.prototype.select = function(index){
	this.index = index;
	this.element.children(".selected").removeClass("selected");
	this.element.children("img:nth-child(" + (index+1) + ")").addClass("selected");
};
