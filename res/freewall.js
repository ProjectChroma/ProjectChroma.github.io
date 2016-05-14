var wall = new Freewall('#image-grid');
wall.fitWidth();

var grid, bkg, img;
$(function(){
	grid = $('#image-grid');
	bkg = $('#modal-bkg');
	img = $('#modal-img');
})
$('body').on('mousedown', hideModal);
$('#image-grid > img').on('mousedown', function(event){
	showModal($(this).index(), $(this).attr('src'));
	return false;//Prevent bubble up to body
});
$(window).on('keydown', function(event){
	if(event.keyCode == 37){//Left
		var ind = Number(img.attr('data-index'));
		var newInd = ind == 0 ? grid.children().length - 1 : ind - 1;
		img.attr('data-index', newInd);
		img.attr('src', grid.children().eq(newInd).attr('src'));
	}else if(event.keyCode == 39){//Right
		var ind = Number(img.attr('data-index'));
		var newInd = (ind + 1) % grid.children().length;
		img.attr('data-index', newInd);
		img.attr('src', grid.children().eq(newInd).attr('src'));
	}else if(event.keyCode == 27) hideModal();//Escape
});

function showModal(index, src){
	img.attr('src', src).attr('data-index', index);
	bkg.css('z-index', 1).animate({
		'opacity': 1
	}, 1000);
	img.css('margin-top', (window.innerHeight - img.height()) / 2 + 'px');
}
function hideModal(){
	bkg.animate({
		'opacity': 0
	}, 1000, 'swing', function(){
		bkg.css('z-index', -1);
	});
}
