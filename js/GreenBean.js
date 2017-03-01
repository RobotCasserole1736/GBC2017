/*
 * GreenBean.js
 *
 */


window.onload=function(){updateData()};

var fuel_Stack = new Array();
fuel_Stack['auto'] = new Array();
fuel_Stack['teleop'] = new Array();
/*fuel_Stack['auto']['low'] = 0;
fuel_Stack['auto']['high'] = 0;
fuel_Stack['teleop']['low'] = 0;
fuel_Stack['teleop']['high'] = 0;*/
var gear_Stack = new Array();
gear_Stack['auto'] = new Array();
gear_Stack['teleop'] = new Array();
/*gear_Stack['auto']['low'] = 0;
gear_Stack['auto']['high'] = 0;
gear_Stack['teleop']['low'] = 0;
gear_Stack['teleop']['high'] = 0;*/

/* Penalty Variables */

var penalty_stack = new Array();


/* autonomous */

/* teleoperated */

/* post match */

var teleDrivingText = ["Little or No Movement", "Poor Driving", "Good Driving", "Exceptional Driving"]
var defenseText = ["Awful/none", "It's not very effective...", "Average", "It's super effective!"]
var overallRatingText = ["Do Not Pick", "Below Average", "Average", "Top Team"]



function ballScore(period, type, count){
	fuel_Stack[period].push([type,count]);
	updateData();
};

function undoBallScore(period){
	fuel_Stack[period].pop();
	updateData();
};

function gearScore(period, location){
	gear_Stack[period].push(location);
	updateData();
};

function undoGearScore(period){
	gear_Stack[period].pop();
	updateData();
};

function penalty(period, type){
    penalty_stack.push([type,period]);
	updateData();
};

function undoPenalty(){
	penalty_stack.pop();
    
    updateData();
};


/*
 * Update Data from input elements
 */
function updateData()
{
	var autoLowCount = 0;
	var autoHighCount = 0;
	var teleopLowCount = 0;
	var teleopHighCount = 0;
	for(var i = 0; i< fuel_Stack['auto'].length; i++){
		if(fuel_Stack['auto'][i][0] == 'low')
			autoLowCount += fuel_Stack['auto'][i][1];
		else
			autoHighCount += fuel_Stack['auto'][i][1];
	}
	for(var i = 0; i< fuel_Stack['teleop'].length; i++){
		if(fuel_Stack['teleop'][i][0] == 'low')
			teleopLowCount += fuel_Stack['teleop'][i][1];
		else
			teleopHighCount += fuel_Stack['teleop'][i][1];
	}
	var autoGearCount = gear_Stack['auto'].length;
	var teleopGearCount = gear_Stack['teleop'].length;
	
	var penaltyCount = 0;
	var technicalCount = 0;
	for(var i=0; i< penalty_stack.length; i++){
		if(penalty_stack[i][0] == 'penalty')
			penaltyCount++;
		else
			technicalCount++;
	}		
	// autonomous data
	document.getElementById('lowBallsScoredAutoDisplay').innerHTML = autoLowCount;
	document.getElementById('highBallsScoredAutoDisplay').innerHTML = autoHighCount;
	document.getElementById('gearsDisplayAuto').innerHTML = autoGearCount;
	document.getElementById('penaltyDisplayAuto').innerHTML = penaltyCount;
	document.getElementById('technicalDisplayAuto').innerHTML = technicalCount;
	// teleop data
	document.getElementById('highBallsScoredTeleDisplay').innerHTML = teleopHighCount;
	document.getElementById('lowBallsScoredTeleDisplay').innerHTML = teleopLowCount;
	document.getElementById('gearsDisplayTele').innerHTML = teleopGearCount;
	document.getElementById('penaltyDisplayTele').innerHTML = penaltyCount;
	document.getElementById('technicalDisplayTele').innerHTML = technicalCount;
	document.getElementById('drivingDisplay').innerHTML = teleDrivingText[parseInt(document.getElementById('drivingAbility').value)];
	document.getElementById('defenseDisplay').innerHTML = defenseText[parseInt(document.getElementById('defenseAbility').value)];
	document.getElementById('accuracyDisplay').innerHTML = document.getElementById('shootingAccuracy').value + '%';
	document.getElementById('climbTime').innerHTML = document.getElementById('climbSpeedSlider').value + ' seconds';
	// Post match data
	document.getElementById('overallRatingDisplay').innerHTML = overallRatingText[parseInt(document.getElementById('overallRating').value)];
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