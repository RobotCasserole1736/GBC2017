/*
 * GreenBean_JS_2015.JS
 *
 */

/******************************************************************************
 *
 * Object Definitions
 *
 ******************************************************************************/
function Ball_Score(period, status, type){
	
	};


window.onload=function(){Update_Stuff(); Hide_Tabs();};


/* global variables */

/* Penalty Variables */
    var penalty = 0;
    var technical = 0;

    var penalty_stack = new Array();

/* autonomous */
    var auto_sets = new autostacks(0,0,0,0,0,0);  	// auto-sets - robot sets, tote sets, stacked sets, bin sets

    var auto_Cross_baseline = 0;					// true if this robot crossed the baseline by end of autonomous
    var auto_start_positions = 0; 					// shows what position the  robot starts in in autonomous
    var auto_fuel_high = 0; 						// counts how much fuel was scored in the high goal in autonomous
    var auto_fuel_low = 0;							// counts how much fuel was scored in the low goal in autonomous
	var auto_gear = 0;								// counts how many gears were delivered to the aircraft in autonomous
	var suto_penalties = 0;							// counts how many penalties were given during autonomous
	var auto_hopper = 0;							// true if a hopper is pushed
/* teleoperated */
    
//:)
    var tele_high_ goal_fuel_points = 0;			// counts how much was scored in the high goal during teleop
    var tele_low_goal_fuel_points = 0;				// counts how much was scored in the low goal during teleop
    var tele_fuel_acerracy = 0;    					// measures acurracy of shooter
	var tele_gear = 0;								// counts how many gears were delivered in teleop
	var tele_penalties = 0;							// count how many penalties were given to this robot in teleop
	var tele_top_loading_fuel = 0;					// true if robot can load fuel into the top
	var tele_ground_pickup_fuel = 0;				// true if robot can pickup fuel from the ground
	var tele_top_loading_gear = 0;					// true if robot can load gear into the top
	var tele_ground_pickup_gear = 0;				// true if robot can pickup gear from the ground
	var climb_attempted = 0;						// true if climb was attempted by the robot
	var climb_succesful = 0;						// true if climb was succesful by the robot
    var tele_driving = 0;							// slider for driving ability
    var tele_robot_climb_time = 0;					// time this bot spent climbing the rope
	var defence = 0;								// slider for how good their defence was
/* post_match*/	

//:)	
	var post_HP = 0;								// determines if team has a human player
	var post_hp_skill = 0;							//determines how good the human player is
	var post_Pilot = 0;								// determines if team has a pilot
	var post_pilot_skill = 0;						//determines how good the pilot is
	var post_overallrating = 0;						// slider for general rating for this bot
	
	
/******************************************************************************
 * Internal Functions
 *      These functions are to be handled internally in this .js file. Do not
 *      call these externally.
 ******************************************************************************/

/* constructor for stack objects
 *
 *   stacks function calculates points for stacks on scoring platforms
 *   totes - number of totes  [# of scored totes in a stack (0-6)]
 *   bins  - is there a bin on this stack? 0 or 1
 *   litter - is there litter in the bin?  0 or 1
 *   knockedover - did they build it up only for it to get knocked over? 0 or 1
 *   points (output?) - calculated points for this stack
 *
 * */
function stack(totes, bins, litter, knockedover)
{
	// constructor for stacks objects
	this.fuel_high = fuel_high;											// stacks start with totes.
    this.fuel_low = fuel_low;											// bins on tote stacks
    this.fuel = fuel													// litter in a stacked bin
    this.knockedover = knockedover; 
  																// sadly no points if this is true...
  	this.stackpoints = function()
  	{
    	var points = 0;

    	// calculate points for stacks during telop
		balls = this.fuel;
    	points = this.fuel;  					// 2 points for each tote in this stack on scoring platform
	    if (this.fuel > 0)
	    {  
	    	if (this.fuel_high)
	    	{
	    		// 4 points per level for bins on scored tote stacks 
	    		balls = balls +  1; 
	    	}
	    	
	        if (this.fuel_high * 3)
	    	{ 
	    		// points for litter in a scored bin
	    		points = points + 1; 
	    	}
	    	
	    	if (this.fuel_low)
	    	{ 
	    		balls = balls + 1; 
	    	}						
			
			if (this.fuel_low * 9)
	    	{ 
	    		points = points + 1; 
	    	}						
	
			return points;
		}
	}
}
/* constr																	
  									
}

function stackpoints(totes, bins, litter, knockedover)
{
    var points = 0;

    // calculate points for stacks during telop
    points = totes * 2;  					// 2 points for each tote in this stack on scoring platform
    if (totes > 0)
    {  if (bins)
    	{ points = points + (totes * 4); } 	// 4 points per level for bins on scored tote stacks
       if (litter && bins)
    	{ points = points + 6; }
    }		// points for litter in a scored bin
    if (knockedover)
    	{ points = 0; }						// all that work for NOTHING!


    return points;
}

/* constructor for autostack objects
 *
 *   stacks function calculates points for stacks on scoring platforms
 * 	 bots - bool - true if all robots in auto zone at end of autonomous
 *   totes - number of totes in auto zone at end of autonomous
 *   stackedtotes - bool - true if all totes are in a stack at end of autonomous
 *   bins  - number of bins in auto zone at end of autonomous
 *
 *   points (output?) - calculated points for this stack
 * 		if all robots in autozone = 4 pts
 * 		if all 3 yellow totes in autozone = 6 pts
 * 		if all 3 yellow totes stacked in autozone = 20 pts
 * 		if all 3 bins in autozone = 8 pts
 *
 * */
function autostacks(bots, totes, stackedtotes, bins, points)
{
	// get the information
	this.bots = bots;
	this.totes= totes;
	this.stackedtotes = stackedtotes;
    this.bins = bins;

    // calculate points...
    if (this.bots)								// true if all bots in auto zone
    	{this.points = 4;	}  					// 4 points for robot set
    if (this.totes = 3)							//must have all 3 yellow totes in auto zone
    { if (this.stackedtotes) 					// true if all 3 yellow totes are stacked
    	{this.points = this.points + 20;	} 	// add 20 if stacked tote set!
    	else
    	{this.points = this.points + 6;	}		// otherwise add 6 points for tote set
    }
    if (this.bins = 3)
    {
    	this.points = this.points + 8			// 8 points for bin set
    }
    return this.points


}
/*
 * Update Data from input elements
 */
function update_data()
{
	   /* autonomous data */

        robotinautozone = document.getElementById('in_area').checked;
        yellowTotesToAuto = document.getElementById('AutoTotes').value;

        goodYelStackedTotes = document.getElementById('AutoStacks_succeeded').value;
        badYelStackedTotes = document.getElementById('AutoStacks_failed').value;

        goodBinsToAuto = document.getElementById('AutoBins_succeeded').value;
        badBinsToAuto = document.getElementById('AutoBins_failed').value;

        goodBinsToAuto = document.getElementById('AutoBins_succeeded').value;
        badBinsToAuto = document.getElementById('AutoBins_failed').value;

        StartLocation = document.getElementById('Location').value;



    /* teleop data */

        humanfeedslitter = document.getElementById('human_feedsLitter').checked;
        humanthrowslitter = document.getElementById('human_throwsLitter').checked;

        humanfeedstotes = document.getElementById('human_feedsTotes').value;
        driverability = document.getElementById('driving_ability').value;
        totefeedspeed = document.getElementById('ToteFeedSpeed').value;

		// stacks data

    /* update display */
    disp_update();
}

/*
 * Calculate any points based on what data was input.
 * called from update_data().
 */
function disp_update()
{
	var overallrating = 0;

   /* autonomous */
   document.getElementById("auto_high_display").innerHTML = auto_goals[0].points;   /* points made in high goal in auton */
    document.getElementById("auto_low_display").innerHTML = auto_goals[1].points;  /* points made in low goal in auton */

    /* teleop */

     document.getElementById("tele_high_pts_display").innerHTML = tele_goals[0].high_points;   /* high points made in teleop */
    document.getElementById("tele_low_pts_display").innerHTML = tele_goals[0].low_points;   /* low points made in teleop */
   
    
	
	document.getElementById("TotalPoints").innerHTML = document.getElementById('S1points').value + document.getElementById('S2points').value
		+ document.getElementById('S3points').value + document.getElementById('S4points').value + document.getElementById('S5points').value
		+ document.getElementById('S6points').value + document.getElementById('S7points').value + document.getElementById('S8points').value
		+ document.getElementById('S9points').value + document.getElementById('S10points').value + document.getElementById('S11points').value
		+ document.getElementById('S12points').value + document.getElementById('S13points').value + document.getElementById('S14points').value
		+ document.getElementById('S15points').value + document.getElementById('S16points').value + document.getElementById('S17points').value
		+ document.getElementById('S18points').value + document.getElementById('S19points').value + document.getElementById('S20points').value;


    switch(tele_driving)
    {
        case '0':
            document.getElementById("tele_driving_display").innerHTML = "Little or No Movement";
            break;
        case '1':
            document.getElementById("tele_driving_display").innerHTML = "Poor Driving";
            break;
        case '2':
            document.getElementById("tele_driving_display").innerHTML = "Good Driving";
            break;
        case '3':
            document.getElementById("tele_driving_display").innerHTML = "Exceptional Driving";
            break;
    }

    switch(Defense)
    {
        case '0':
            document.getElementById("Defense").innerHTML = "Awful/none";
            break;
        case '1':
            document.getElementById("Defense").innerHTML = "It's not very affective...";
            break;
        case '2':
            document.getElementById("Defense").innerHTML = "Average";
            break;
        case '3':
            document.getElementById("Defense").innerHTML = "It's super affective!";
            break;
    }


    /* penalty */
   /*
    document.getElementById("penalty_display1").innerHTML = penalty;
    document.getElementById("technical_display1").innerHTML = technical;
    document.getElementById("penalty_display2").innerHTML = penalty;

    tele_driving = document.getElementById('driving_ability').value
	*/

    overallrating = document.getElementById("Overall_Rating").value;
	switch(overallrating)
    {
        case '0':
            document.getElementById("post_overallrating").innerHTML = "Do Not Pick";
            break;
        case '1':
            document.getElementById("post_overallrating").innerHTML = "Below Average";
            break;
        case '2':
            document.getElementById("post_overallrating").innerHTML = "Average";
            break;
        case '3':
            document.getElementById("post_overallrating").innerHTML = "Top Team";
            break;
    }

}



function save_data()
{
    var matchData = document.getElementById("scout_name_in").value + ",";
    matchData += document.getElementById("team_number_in").value + ",";
    matchData += document.getElementById("match_number_in").value + ",";
    matchData += document.getElementById("match_type").value + ",";
  // autonomous tab fields

		matchData += robotinautozone + ",";
		matchData += yellowTotesToAuto + ",";
		matchData += goodYelStackedTotes + ",";
		matchData += badYelStackedTotes + ",";
		matchData += goodBinsToAuto  + ",";
		matchData += badBinsToAuto + ",";
		matchData += StartLocation + ",";


  // teleop tab fields

  /*
    matchData += (human_tote_loader) ? "T" : "F") + ",";
    matchData += (human_litter_loader) ? "T" : "F") + ",";
    matchData += (human_litter_thrower) ? "T" : "F") + ",";
    matchData += document.getElementById("driving_ability").value + ",";

        human_tote_loader = document.getElementById('Human_feedsTotes').checked;
        human_litter_loader = document.getElementById('Human_feedsLitter').checked;
        human_litter_thrower = document.getElementById('Human_throwsLitter').checked;

        tele_driving = document.getElementById('driving_ability').value;
*/

		matchData += Stack1.totes + ",";
		matchData += Stack1.bins + ",";
		matchData += Stack1.litter + ",";
		matchData += Stack1.knockedover + ",";

		matchData += Stack2.totes + ",";
		matchData += Stack2.bins + ",";
		matchData += Stack2.litter + ",";
		matchData += Stack2.knockedover + ",";

		matchData += Stack3.totes + ",";
		matchData += Stack3.bins + ",";
		matchData += Stack3.litter + ",";
		matchData += Stack3.knockedover + ",";

		matchData += Stack4.totes + ",";
		matchData += Stack4.bins + ",";
		matchData += Stack4.litter + ",";
		matchData += Stack4.knockedover + ",";

		matchData += Stack5.totes + ",";
		matchData += Stack5.bins + ",";
		matchData += Stack5.litter + ",";
		matchData += Stack5.knockedover + ",";

		matchData += Stack6.totes + ",";
		matchData += Stack6.bins + ",";
		matchData += Stack6.litter + ",";
		matchData += Stack6.knockedover + ",";

		matchData += Stack7.totes + ",";
		matchData += Stack7.bins + ",";
		matchData += Stack7.litter + ",";
		matchData += Stack7.knockedover + ",";

		matchData += Stack8.totes + ",";
		matchData += Stack8.bins + ",";
		matchData += Stack8.litter + ",";
		matchData += Stack8.knockedover + ",";

		matchData += Stack9.totes + ",";
		matchData += Stack9.bins + ",";
		matchData += Stack9.litter + ",";
		matchData += Stack9.knockedover + ",";

		matchData += Stack10.totes + ",";
		matchData += Stack10.bins + ",";
		matchData += Stack10.litter + ",";
		matchData += Stack10.knockedover + ",";

		matchData += Stack11.totes + ",";
		matchData += Stack11.bins + ",";
		matchData += Stack11.litter + ",";
		matchData += Stack11.knockedover + ",";

		matchData += Stack12.totes + ",";
		matchData += Stack12.bins + ",";
		matchData += Stack12.litter + ",";
		matchData += Stack12.knockedover + ",";

		matchData += Stack13.totes + ",";
		matchData += Stack13.bins + ",";
		matchData += Stack13.litter + ",";
		matchData += Stack13.knockedover + ",";

		matchData += Stack14.totes + ",";
		matchData += Stack14.bins + ",";
		matchData += Stack14.litter + ",";
		matchData += Stack14.knockedover + ",";

		matchData += Stack15.totes + ",";
		matchData += Stack15.bins + ",";
		matchData += Stack15.litter + ",";
		matchData += Stack15.knockedover + ",";

		matchData += Stack16.totes + ",";
		matchData += Stack16.bins + ",";
		matchData += Stack16.litter + ",";
		matchData += Stack16.knockedover + ",";

		matchData += Stack17.totes + ",";
		matchData += Stack17.bins + ",";
		matchData += Stack17.litter + ",";
		matchData += Stack17.knockedover + ",";

		matchData += Stack18.totes + ",";
		matchData += Stack18.bins + ",";
		matchData += Stack18.litter + ",";
		matchData += Stack18.knockedover + ",";

		matchData += Stack19.totes + ",";
		matchData += Stack19.bins + ",";
		matchData += Stack19.litter + ",";
		matchData += Stack19.knockedover + ",";

		matchData += Stack20.totes + ",";
		matchData += Stack20.bins + ",";
		matchData += Stack20.litter + ",";
		matchData += Stack20.knockedover + ",";




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
/*
    var existingSharedData = localStorage.getItem("SharedData");
    if(existingSharedData == null)
        localStorage.setItem("SharedData",sharedData);
    else
        localStorage.setItem("SharedData",existingSharedData + sharedData);
    document.getElementById("SharedDataCSV").value = localStorage.getItem("SharedData");
*/


}
//Clears all data in the form.
//Do not call this unless it is ok to actually clear all data.
//This only resets stuff Nick felt should be reset
function reset_form()
{
// match data reset
    document.getElementById("team_number_in").value = "";
    document.getElementById("match_number_in").value = parseInt(document.getElementById("match_number_in").value) + 1;



    document.getElementById("Location").value = "A";

// autonomous data reset


// teleop data reset



// pit data reset
    document.getElementById("drive_type").value = "";
    document.getElementById("drive_speed").value = "";
    document.getElementById("number_wheels").value = "";



	/*

leftovers from last year - kept temporarily for reference...



    document.getElementById("starting_ball").value = 0;
    document.getElementById("floor_pickup").value = 0;

    auto_score_stack = new Array();
    tele_attempt_stack = new Array();

    document.getElementById("starting_ball").checked = false;
    document.getElementById("floor_pickup").checked = false;

    tele_score_stack = new Array();
    document.getElementById("Front_shoot").checked = false;
    tele_goals[0] = new goal_t(0,0,0,0,0);
    tele_goals[1] = new goal_t(0,0,0,0,0);

    penalty_stack = new Array();
    penalty = 0;
    technical = 0;
    document.getElementById("Comments").value="";

    document.getElementById("low_pass").checked = false;
    document.getElementById("high_pass").checked = false;
    document.getElementById("high_goal").checked = false;
    document.getElementById("low_goal").checked = false;
    document.getElementById("low_top").checked = false;
    document.getElementById("truss_throw").value = 0;
    document.getElementById("pass_catch").checked = false;
    document.getElementById("truss_catch").checked = false;
    document.getElementById("defense").value = 0;

    document.getElementById("DriveTrain_Comments").value="";
    document.getElementById("Shooter_Comments").value="";
    document.getElementById("General_Comments").value="";
    */
    update_data();
}


/*
 * functions to be called from outside this .js file
 *
 */

/*
 * Call when inputs change
 */
function Update_Stuff()
{
    update_data();
}



function Submit_Report()
{
    save_data();

	$("#PitDataButton").hide(100,null);
	$("#AutonomousDataButton").show(100,null);
	$("#TeleOpDataButton").show(100,null);
	$("#MatchDataButton").show(100,null);

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

function Hide_Tabs()
{
	if(document.getElementById("match_type").value == "PitScouting")
	{
		$("#PitDataButton").show(100,null);
		$("#AutonomousDataButton").hide(100,null);
		$("#TeleOpDataButton").hide(100,null);
		$("#MatchDataButton").hide(100,null);
	}
	else
	{
		$("#PitDataButton").hide(100,null);
		$("#AutonomousDataButton").show(100,null);
		$("#TeleOpDataButton").show(100,null);
		$("#MatchDataButton").show(100,null);
	}
}