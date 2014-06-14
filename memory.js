// YOUR CODE GOES HERE
$(document).ready(function () {
	var firstOpen = 0;
	var secondOpen = 0;
	var firstTile = "";
	var clicks = $('#click-count').text();
	var tds = $('body').find('td');
	var matches = tds.length / 2;
	var foundCards = 0;

	function openCard() {
		clicks++;
		$('#click-count').text(clicks);
		var tile = $(this).attr("id");
		var content = $(this).children().attr("id");
		$('#'+tile).css('background','white');
		$('#'+content).show();
		if (firstOpen === 0) {
			firstTile = tile;
			firstOpen = $('#'+content).text();
		}
		else {
			//disable click event
			$('div').unbind('click', openCard);
			secondOpen = $('#'+content).text();
			//not a match, put tiles back on
			if (firstOpen != secondOpen) {
				setTimeout(function() {
					$('#'+firstTile).css('background','green');
					$('#'+firstTile).children().hide();
					$('#'+tile).css('background','green');
					$('#'+tile).children().hide();
					$('div').bind('click', openCard);
				}, 1000);
			}
			//match!
			else {
				foundCards++;
				setTimeout(function() {
					$('#'+firstTile).css('visibility','hidden');
					$('#'+tile).css('visibility','hidden');
					$('div').bind('click', openCard);
				}, 1000);
			}
			firstOpen = 0;
			secondOpen = 0;
			if (foundCards === matches) {
				setTimeout(function() {
					alert('Congratulations!  You matched all of the cards in ' + clicks + ' clicks!');
				}, 1500);
			}
		}
	}
	
	$('.tile').click(openCard);
	
	$('button').click(function() {
		$('.tile').css({
			background: 'green',
			visibility: 'visible'
		});
		$('.content').hide();
		firstOpen = 0;
		secondOpen = 0;
		firstTile = "";
		clicks = 0;
		foundCards = 0;
		$('#click-count').text(clicks);
	});
});

//inspired by http://codepen.io/anon/pen/rICDg?editors=001