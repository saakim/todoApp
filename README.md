# TODO APP

This app adds TODOs and tracks the number of total
TODOs as well as the number of unchecked TODOs.
You can customize the color of the header by clicking on the black button in the top right corner. 

## Instructions
Download all of the files and open [index.html](/index.html) file on Chrome browser to run the project.
Make sure that [script.js](/script.js) and [styles.css](/styles.css)
are in the same local directory. 

You may also add your google calendar to the app. 
To do so, follow these instructions:
1. On a computer, open Google Calendar.
2. In the top right, click the Settings button and then Settings.
3. On the left side of the screen, click the name of the calendar you want to add, which is located under "Settings for my calendars."
4. In the "Integrate calendar" section, copy the iframe code displayed. It should start with "<iframe src...>"
5. You can choose to customize the calendar by clicking Customize and then copy the HTML code displayed.
6. Then go to line 133 in [script.js](/script.js), and set the variable "iframe" equal to the code copied from step 5.
   Make sure the copied code is between two single quotes (it should look like this: iframe = '<iframe src="..">'
7. Save and refresh the index.html file.
  
Starter Code from CS50's Mobile App Development with React Native Online Course
