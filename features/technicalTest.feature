Feature: Automate the Lloyds Bank home page and verify the details

Scenario: Find all the details appeaing on the lloyds bank home page

Given I have Lloyds bank home url "https://www.lloydsbank.com/"
Then I verify title of the page is "Lloyds Bank - Personal Banking, Personal Finances & Bank Accounts"
When I click on the Branch finder
Then I land on "Find a Branch" page
When I Enter "Halifax" and search in the search box
Then Select the last result from the list and verify Name of the branch, Address and the Days Branch is closed



