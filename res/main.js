$(window).on('keydown', function(event){
	if(event.keyCode == 32){//Space
		$(document.body).toggleClass('dark');
	}
})
