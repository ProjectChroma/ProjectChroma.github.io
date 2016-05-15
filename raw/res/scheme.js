var scheme;
$(function(){
	setScheme(disassembleQuery(location.search).scheme || 'light');
});
$(window).on('keydown', function(event){
	if(event.keyCode == 32){//Space
		toggleScheme();
		return false;
	}
});
function setScheme(newScheme){
	console.log(scheme, 'to', newScheme);
	scheme = newScheme;
	$(document.body).toggleClass('dark', scheme == 'dark');
	$('a:not(.external)').each(function(i){
		var queryObj = disassembleQuery(this.search || '?scheme=null');//Minimum parseable input
		queryObj.scheme = scheme;
		this.search = assembleQuery(queryObj);
	});
}
function toggleScheme(){
	setScheme(scheme == 'light' ? 'dark' : 'light');
}
function disassembleQuery(query){
	var queryObj = {};
	var parts = query.slice(1).split('&');
	for(var i=parts.length; i>0; --i){
		var part = parts[i-1], ind = part.indexOf('=');
		queryObj[part.slice(0, ind)] = part.slice(ind+1);
	}
	return queryObj;
}
function assembleQuery(queryObj){
	var query = '';
	for(var key in queryObj)
		query += '&' + key + '=' + queryObj[key];
	return '?' + query.slice(1);
}
