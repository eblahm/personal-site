
$(function(){
	$('.section-name').click(function(){
		document.location = $(this).children('a').attr('href');
	});
});