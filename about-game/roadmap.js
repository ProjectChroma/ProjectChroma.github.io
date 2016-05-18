var converter = new showdown.Converter();
$.getJSON('https://api.github.com/repos/ProjectChroma/Chroma/milestones', {state: 'open', sort: 'completeness', direction: 'desc'}, function(milestones){
	var container = $('<ul></ul>').attr('id', 'roadmap');
	for(var m=0; m<milestones.length; m++){
		var milestone = milestones[m];
		var numClosed = milestone.closed_issues, numIssues = milestone.open_issues + milestone.closed_issues;
		var completion = numIssues == 0 ? 0 : Math.round(numClosed / numIssues * 1000) / 10;//Round to tenths place
		var eMilestone = $('<li></li>').addClass('milestone').appendTo(container);
		eMilestone.append('<h2>' + milestone.title + ': ' + numClosed + ' of ' + numIssues + ' (' + completion + '%)</h2>');
		var progress = $('<span></span>').addClass('progress-bar').appendTo(eMilestone);
		$('<span></span>').addClass('progress').css('width', completion + '%').appendTo(progress);
		eMilestone.append('<ul></ul>');//Issue list
	}
	$('#replaceme').before(container).remove();
}).fail(onError);
$.getJSON('https://api.github.com/repos/ProjectChroma/Chroma/issues', {milestone: '*', state: 'all'}, function(issues){//Retrieve all issues attached to any milestone
	for(var i=0; i<issues.length; ++i){
		if(issues[i].state == 'open') processIssue(issues[i]);
	}
	for(var i=0; i<issues.length; ++i){
		if(issues[i].state == 'closed') processIssue(issues[i]);
	}
});
function processIssue(issue){
	var eIssue = $('<li></li>').addClass('issue');
	var btnExpand = $('<button>+</button>').addClass('expand').on('mousedown', function(){
		$(this).parent().siblings().css('display', 'block');
	});
	var btnCollapse = $('<button>-</button>').addClass('collapse').on('mousedown', function(){
		$(this).parent().siblings().css('display', 'none');
	});
	$('<h3>' + issue.title + '</h3>').append(btnExpand).append(btnCollapse).appendTo(eIssue);
	if(issue.state == 'closed') eIssue.addClass('complete');
	else if(issue.assignee != null){
		eIssue.addClass('active');
		$('<h5>Assigned to: </h5>').addClass('assignee')
		.append($('<img/>').attr('src', issue.assignee.avatar_url).addClass('assignee-avatar'))
		.append($('<a>' + issue.assignee.login + '</a>').attr('href', issue.assignee.html_url).attr('target', '_blank'))
		.appendTo(eIssue);
	}
	$('<div></div>').html(converter.makeHtml(issue.body)).appendTo(eIssue);
	var eMilestone = $('#roadmap').children().eq(issue.milestone.number-1);//Find the element from the issue's milestone number
	eMilestone.children('ul').append(eIssue);//Add issue to milestone's issue list
}
function onError(){
	$('#replaceme, #roadmap').text('An error occured. Please reload the page to try again.').css('color', 'red');
}
