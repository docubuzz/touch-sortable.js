touch-sortable.js
=================
Yet another sortable list plugin for jQuery, touch-sortable.js is a small purpose driven library that helps create animated sortable lists in a jiffy. Supports both mouse and touch events.

## Installation

Include the touch.sortable script after the jQuery library

    <script src="/path/to/touch-sortable.js"></script>

## Example
Currently, touch-sortable.js provides support for unordered lists. Define your list as shown, and include the sortable class.

	<ul class="sortable">
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
		<li>Item 4</li>
	</ul>
	
	<script src="jquery.sortable.js"></script>
	<script>
	    $('.sortable').sortable();
	</script>

## Usage

Create a sortable list.

    $(".sortable").sortable();

To change the animation of the moving element, use `li.inMotion` in your css like so.

	li.inMotion {
	     position:relative;
	     z-index : 1;
	}
	
## Development

Any feedback to make this plugin better is welcomed! 

If you have any pull requests/bug reports, raise them up in the [Pull Requests](https://github.com/docubuzz/touch-sortable.js/pulls), or [Issues](https://github.com/docubuzz/touch-sortable.js/issues).

## Authors

[Jeremy Huang](https://github.com/jieyanhuang)

## Contributors

[Ashish Puliyel](https://github.com/ashishpuliyel)
