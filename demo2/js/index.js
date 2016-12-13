$(function() {
	 var Accordion = function(el, multiple) {
	 	this.el = el || {};
	 	this.multiple = multiple || false;
	 	var links = this.el.find('.link');
		links.on('click', {el: this.el, multiple: this.multiple}, dropdown);
	 };

	 function dropdown(e) {
	 	var $el = e.data.el;
	 		$this = $(this);
	 		$next = $this.next();
	 	$next.slideToggle();
	 	$this.parent().toggleClass('open');

	 	if (!e.data.multiple) {
	 		$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
	 	}
	 }

	 var accordion = new Accordion($('#accordion'), false);

});