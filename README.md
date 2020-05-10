# tab-tamper
Google SpreadsheetApp for editing tabular data from Wikimedia Commons

To install:

* Under tools > script editor add the javascript
* run debug, follow instructions for allowing external data to be loaded
* create 3 sheets: "interface", "edit" and "load" 
* on "load" set A1 to <code>=init(interface!A1)</code>
* on "interface" create two buttons insert > drawings 
* right click on the button and assign the script "resetButton" and "mergeButton" 
* run reset before first use
