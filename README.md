# tab-tamper
Google SpreadsheetApp for editing tabular data from Wikimedia Commons

To install:

* Under "Tools" > "Script editor" add the javascript
* run debug, follow instructions for allowing external data to be loaded
* create 3 sheets: "interface", "edit" and "load" 
* on "load" set A1 to <code>=init(interface!A1)</code>
* on "interface" create three buttons insert > drawings 
* right click on the button and assign the script "resetButton", "mergeButton" and "submitButton"
* Under "File" > "Publish to the web" publish "interface" as a CSV file. Copy the identifiers found in this URL to the script.
* use the resetButton once before first use
