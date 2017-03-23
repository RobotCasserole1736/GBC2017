GreenBeanCasserole is Robot Casserole's web based match scouting system
We normally run this on a Raspberry Pi as a web server and have all laptops wired directly to it through an ethernet switch

##MATCH INFO:
The match info section of this app has the things we need to know befor a match

First, type the team number at the top of the page(note: if you forget it will always be at the top of the page so you can type it in later)
Second, type in who you are in the scout name bar
Then, type in the match number
Finally choose what type of match they are playing in (qualification, practice, elimination)

##AUTO:
This section of the app tells us what this team did in autonomous

The fuel section counts how much fuel they scored in the boiler
There are three buttons for both the high and the low goal - 1, 5, and 10
Once you push one button you can push other buttons to keep count of the fuel scored
If you make a mistake the undo button is always there to help you out
(note: it is almost impossible to be 100% accurate in counting the fuel so don't worry about being perfectly accurate)

The gear section counts how many gears are delivered to the airship
There are three buttons in this section tell which lift the gear was delivered to
The left lift, the center lift, and the right lift.
The undo is here too, if you make a mistake just push the button and all of your problems will fly away

The third section contains other info that we want to know
Press one of the radio buttons to indicate what starting position the team is in
The two check boxes indicate if a hopper was pushed or if the team crossed the baseline in auto
Finally there is the penalty section. If a penalty is given to the team push the penalty button
If a technical foul is given to them push the technical foul button, the undo button is once again the to fix your mistakes

##TELEOP:
This section records what the team did in teleop

Counting fuel is exactly the same as in  auto so look at it in the auto section
Under that is an accuracy slider showing how accurate their shooting is
The two checkmarks tell us if they can load fuel from the top and if they have an intake

Gear counting is exactely the same, again look above for how to count gears
Below are two checkboxes to tell us if they can load gears from the top and if they can pick them up from the ground

Once again penalties work the the same way - look above for the instructions
The how's my driving slider tells how good their driving is 
The defense slider tells us how good there defense was or if they did defense at all
The climbing checkboxes indicate if they climbed and if the climb was succesful
The climb time slider tells how much time is taken to climb

##POST MATCH:
Post match section tells us about the human players and gives an overall rating

The first bars are for the human players/pilot, the first bar indicates if the team has a human player/pilot(note: if you don't know if they have one there is a not sure option)
The second bar tells us how good the the human player/pilot
The overall rating slider gives an overall rating on the team

The comment section is for when you notice something that there is not an option for it in the app
Once you've done all of this you must submit your report

##MATCH HISTORY:
Match history is a backup to the data you've entered in the app

To clear your match history you must have a password. It's meant to prevent accidental clearing of data, which is stored in browser LocalStorage
The password can be found in the javascript if needed for some reason

##ABOUT:
This section is just tells about who updated the previous version from last year
