# tab-tamper
Google SpreadsheetApp for editing tabular data from Wikimedia Commons

[Workinig Demo](https://docs.google.com/spreadsheets/d/1M5d5hHoXSeT0UhBJ0SsL-uURAV0vtJDp3zz_oZ-k3g8/edit?usp=sharing)

To install:

* Under "Tools" > "Script editor" add the javascript
* create 3 sheets: "interface", "edit" and "load" 
* on "load" set A1 to <code>=init(interface!A1)</code>
* on "interface" create three buttons insert > drawings 
* right click on the button and assign the script "resetButton", "mergeButton" and "submitButton"
* use the resetButton once before first use
