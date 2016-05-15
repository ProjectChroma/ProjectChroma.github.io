var converter = new showdown.Converter();
$.getJSON('https://api.github.com/repos/ProjectChroma/Chroma/milestones', {state: 'open', sort: 'completeness', direction: 'desc'}, function(milestones){
	var container = $('<ul></ul>').attr('id', 'roadmap');
	for(var m=0; m<milestones.length; m++){
		var milestone = milestones[m];
		var numClosed = milestone.closed_issues, numIssues = milestone.open_issues + milestone.closed_issues;
		var completion = numIssues == 0 ? 0 : Math.floor(numClosed / numIssues * 100);
		var eMilestone = $('<li></li>').addClass('milestone').appendTo(container);
		eMilestone.append('<h2>' + milestone.title + ': ' + numClosed + ' of ' + numIssues + ' (' + completion + '%)</h2>');
		var progress = $('<span></span>').addClass('progress-bar').appendTo(eMilestone);
		$('<span></span>').addClass('progress').css('width', completion + '%').appendTo(progress);
		var issueList = $('<ul></ul>').appendTo(eMilestone);
		$.getJSON('https://api.github.com/repos/ProjectChroma/Chroma/issues', {milestone: milestone.number, state: 'all'}, function(issues){
			for(var i=issues.length; i>0; --i){
				var issue = issues[i-1];
				var eIssue = $('<li></li>').addClass('issue').toggleClass('complete', issue.state == 'closed').appendTo(issueList);
				eIssue.append('<h3>' + issue.title + '</h3>');
				$('<div></div>').html(converter.makeHtml(issue.body)).appendTo(eIssue);
			}
		}).fail(onError);
	}
	$('#replaceme').after(container).remove();//Add the container immediately after the placeholder, then remove the placeholder
}).fail(onError);
function onError(){
	$('#replaceme').text('An error occured. Please reload the page to try again.').css('color', 'red');
}
