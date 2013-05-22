touch-sortable.js
=================
Yet another sortable list plugin for jQuery. touch-sortable.js is a tiny ( ~600 bytes minfied and gziped) purpose driven library that helps create animated sortable lists in a jiffy. Supports both mouse and touch events.

## Installation and usage

Include the touch-sortable script after the jQuery library

    <script src="/path/to/touch-sortable.js"></script>

Execute it against a ul element

    $(".sortable").sortable();


## Example

Currently, touch-sortable.js provides support for unordered lists. Define your list as shown.

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

## Styling

An element being dragged around has the class "inMotion" - which can be used to style it in css.

    li {
    	display:block; padding:10px; margin:5px 0; background:#eee;
    }
	li.inMotion {
		box-shadow:0 1px 3px rgba(0,0,0,.3);
	}
	
## Development

Any feedback to make this plugin better is welcomed! 

If you have any pull requests/bug reports, raise them up in the [Pull Requests](https://github.com/docubuzz/touch-sortable.js/pulls), or [Issues](https://github.com/docubuzz/touch-sortable.js/issues).

## Authors
[Jeremy Huang](https://github.com/jieyanhuang)

## Contributors
[Ashish Puliyel](https://github.com/ashishpuliyel)


## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).