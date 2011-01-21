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
I created an example for a provisionary coding task.
The example submits the form with ajax, which is then handled
with php, saving data to a Amazon SimpleDB instance.

[View Example](http://simpledb.phpfog.com/)