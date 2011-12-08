# jQuery MultilineText

Replaces a textarea with multiple text inputs, automatically 
appending a new input when the last is filled with content.
On submit, the plugin recombines all of the individual text
inputs into one textarea for server side processing.

## Usage
    // Replace a single textarea with multiple text inputs,
    // each representing a new line.
    $('textarea.multiline').multilineText();
If you are handling form submission with ajax, you need
to call `.multilineText()` on `success`.

## Examples
Check out the blog post here: http://staydecent.ca/bits/jquery-multiline-text-input
Or view the JSFiddle here: http://jsfiddle.net/dQSNP/5/