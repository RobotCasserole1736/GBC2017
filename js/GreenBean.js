/*
 * GreenBean.js
 *
 */


window.onload=function(){updateData()};


/* Penalty Variables */
var penalty = 0;
var technical = 0;

var penalty_stack = new Array();

/* autonomous */

/* teleoperated */

/* post match */

var teleDrivingText = ["Little or No Movement", "Poor Driving", "Good Driving", "Exceptional Driving"]
var defenseText = ["Awful/none", "It's not very affective...", "Average", "It's super affective!"]
var overallRatingText = ["Do Not Pick", "Below Average", "Average", "Top Team"]



function ballScore(period, type, count){

};

function undoBallScore(period){

};

function gearScore(period, location){

};

function undoGearScore(period){

};

function penalty(period, type){

};

function undoPenalty(){

};


/*
 * Update Data from input elements
 */
function updateData()
{
	// autonomous data

	// teleop data

	// Post match data

	/* update display */
	displayUpdate();
}

/*
 * Calculate any points based on what data was input.
 * called from update_data().
 */
function displayUpdate()
{
	/* autonomous */

	/* teleop */

	// defense = document.getElementById("defenseAbility")
	// defenseRating = defenseText[defense]

	// overallrating = document.getElementById("Overall_Rating").value;
	// document.getElementById("post_overallrating") = overall_rating_text[overallrating]
}



function saveData()
{
	var matchData = document.getElementById("scoutName").value + ",";
	matchData += document.getElementById("teamNumber").value + ",";
	matchData += document.getElementById("matchNumber").value + ",";
	matchData += document.getElementById("matchType").value + ",";
	// autonomous tab fields

	// teleop tab fields

	// post match fields

	var comments = document.getElementById("comments").value;
	comments = comments.replace(",","_"); //Get rid of commas so we don't mess up CSV
	comments = comments.replace(/(\r\n|\n|\r)/gm,"  ");  // get rid of any newline characters
	matchData += comments + "\n";  // add a single newline at the end of the data
	var existingData = localStorage.getItem("MatchData");
	if(existingData == null)
		localStorage.setItem("MatchData",matchData);
	else
		localStorage.setItem("MatchData",existingData + matchData);
	document.getElementById("HistoryCSV").value = localStorage.getItem("MatchData");
}

//Clears all data in the form.
//Do not call this unless it is ok to actually clear all data.
//This only resets stuff Nick felt should be reset
function resetForm()
{
	// match data reset
	document.getElementById("teamNumber").value = "";
	document.getElementById("matchNumber").value = parseInt(document.getElementById("matchNumber").value) + 1;

	// autonomous data reset


	// teleop data reset

	// update all data displays(counts, text, etc)
	updateData();
}


function submitReport()
{
	saveData();
	resetForm();
}

function clearHistory()
{
	if(document.getElementById("history_password").value == "Beans")
	{
		localStorage.clear();
		document.getElementById("HistoryCSV").value = "";
		$("#HistoryPass").hide(100,null);
	}
	else
	{
		document.getElementById("history_password").value = "Incorrect Password";
	}
}