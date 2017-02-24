/*
 * GreenBean.js
 *
 */

/******************************************************************************
 *
 * Object Definitions
 *
 ******************************************************************************/
 function Ball_Score(period, status, type){

 };


 window.onload=function(){update_data()};


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

/*
 * Update Data from input elements
 */
 function update_data()
 {
 	// autonomous data

 	// teleop data

 	// Post match data

	/* update display */
	disp_update();
}

/*
 * Calculate any points based on what data was input.
 * called from update_data().
 */
 function disp_update()
 {
 	/* autonomous */

 	/* teleop */

	// defense = document.getElementById("defenseAbility")
	// defenseRating = defenseText[defense]

	// overallrating = document.getElementById("Overall_Rating").value;
	// document.getElementById("post_overallrating") = overall_rating_text[overallrating]
}



function save_data()
{
	var matchData = document.getElementById("scout_name_in").value + ",";
	matchData += document.getElementById("team_number_in").value + ",";
	matchData += document.getElementById("match_number_in").value + ",";
	matchData += document.getElementById("match_type").value + ",";
  // autonomous tab fields

  // teleop tab fields

  // post match fields

	var comments = document.getElementById("Comments").value;
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
function reset_form()
{
	// match data reset
	document.getElementById("team_number_in").value = "";
	document.getElementById("match_number_in").value = parseInt(document.getElementById("match_number_in").value) + 1;

	// autonomous data reset


	// teleop data reset

	// update all data displays(counts, text, etc)
	update_data();
}


function Submit_Report()
{
	save_data();

	reset_form();
}

function Clear_History()
{
	if(document.getElementById("history_password").value == "Beans")
	{
		localStorage.clear();
		document.getElementById("HistoryCSV").value = "";
		document.getElementById("PitHistoryCSV").value = "";
		document.getElementById("SharedDataCSV").value = "";
		$("#HistoryPass").hide(100,null);
	}
	else
	{
		document.getElementById("history_password").value = "Incorrect Password";
	}
}