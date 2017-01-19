#pragma strict

var menuText : GameObject[];
var controlsText : GameObject[];
var current : int;
var current2 : int;
var selected : GameObject;
var selected2 : GameObject;
var orange : Color;
var showText = false;
var showOptions = false;
var textSection : GameObject;
var explanation : GameObject;
var options : GameObject;

var waittime = 0.2;
private var timestamp = 0.0;

function Start () {

	Screen.lockCursor = true;
	
	// Instantiate menuText objects
	var playgameText : GameObject = GameObject.Find("Play Game");
	var optionsText : GameObject = GameObject.Find("Options");
	var howtoplayText : GameObject = GameObject.Find("HowTo Play");
	var quitgameText : GameObject = GameObject.Find("Quit Game");
	
	menuText = [playgameText, howtoplayText, optionsText, quitgameText];
	
	var invertYOption : GameObject = GameObject.Find("InvertY");
	var sensitivity : GameObject = GameObject.Find("Sensitivity");
	
	controlsText = [invertYOption, sensitivity];
	
	textSection = GameObject.Find("SelectText");
	explanation = GameObject.Find("Explanation");
	options = GameObject.Find("OptionsText");
	
	
	options.GetComponent(TextMesh).text = "Movement:    Left Joystick\nLook:         Right Joystick\nJump:        A\nPickup/Drop:  B/RB\nThrow:       Y/LB\nReset:       Select";
	
	explanation.GetComponent(TextMesh).text = "Time for school Riley!\nYou need to gather your things,\nhowever your imagination has run wild" 
	+ "\nand the floor has now turned into lava.\nNavigate around collecting your things\nusing A to jump, Y to pick up objects\nand Y to throw them.\n"
	+ "Good luck!";
	
	options.SetActive(false);
	explanation.SetActive(false);
	
	current = 0;
	current2 = 0;
	orange = Color(1, 0.4, 0);
	showText = false;
	showOptions = false;
}

function Update () {

	// Selected menu item
	selected = menuText[current];
	
	selected.GetComponent(TextMesh).fontSize = 110;
	selected.GetComponent(TextMesh).color = orange;
	
	selected2 = controlsText[current2];
	
	selected2.GetComponent(TextMesh).fontSize = 70;
	selected2.GetComponent(TextMesh).color = orange;
	
	// Input
	
	if (timestamp < Time.time) {
	
		// Up movement
		if (Input.GetAxis("Vertical") > 0) {
			timestamp = Time.time + waittime;
			if (!showText && !showOptions) {
				if (current != 0 && current < 4) {
					moveUp(0);
				}
			}
			
			if (showOptions && current2 == 1) {
				moveUp(1);
			}
		}
		
		// Down movement
		if (Input.GetAxis("Vertical") < 0) {
			timestamp = Time.time + waittime;
			if (!showText && !showOptions) {
				if (current > -1 && current != 3) {
					moveDown(0);
				}
			}
			
			if (showOptions && current2 == 0) {
				moveDown(1);
			}
		}
		
//		// Horizontal selector
//		if (Input.GetAxis("Horizontal") > 0) {
//			timestamp = Time.time + waittime;
//			if (showOptions && current2 == 0) {
//				// TODO: can't access the control in input manager here to select the invert option.
//				selected2.GetComponent(TextMesh).text = "Invert Axis: No";
//			}
//		}
//		
//		if (Input.GetAxis("Horizontal") < 0) {
//			timestamp = Time.time + waittime;
//			if (showOptions && current2 == 0) {
//				// TODO: can't access the control in input manager here to select the invert option.
//				selected2.GetComponent(TextMesh).text = "Invert Axis: Yes";
//			}
//		}
		
		// Select option
		if (Input.GetAxis("Jump") || Input.GetKey(KeyCode.Return)) {
		
			// Play game 
			if (current == 0 && !showText && !showOptions) {
				Application.LoadLevel("room");
			}
			
			// How to play
			if (current == 1) {
				// Do stuff
				if (!showText) {
					Application.LoadLevel("Level0");
				}		
			}
			
			// Options
			if (current == 2) {
				if (!showOptions) {
					showOptions = true;
					textSection.SetActive(false);
					options.SetActive(true);
				}
			}
			
			// Quit game
			if (current == 3) {
				Application.Quit();
			}
		}
		
		// Cancel selection
		if (Input.GetAxis("Cancel")) {
			
		// How to play cancel
			if (showText) {
				//Debug.Log("CANCEL");
				showText = false;
				explanation.SetActive(false);
				textSection.SetActive(true);
			}
			
			if (showOptions) {
				showOptions = false;
				options.SetActive(false);
				textSection.SetActive(true);
			}
		}
	}
}

function moveUp(typeMove) {

	if (typeMove == 0) {
		current = current - 1;
		selected.GetComponent(TextMesh).fontSize = 80;
		selected.GetComponent(TextMesh).color = Color.black;
		
		selected = menuText[current];
		
		selected.GetComponent(TextMesh).fontSize = 110;
		selected.GetComponent(TextMesh).color = orange;
//	} else {
//		current2 = current2 - 1;
//		selected2.GetComponent(TextMesh).fontSize = 50;
//		selected2.GetComponent(TextMesh).color = Color.black;
//		
//		selected2 = controlsText[current];
		
//		selected2.GetComponent(TextMesh).fontSize = 70;
//		selected2.GetComponent(TextMesh).color = orange;
	}
}


function moveDown(typeMove) {
	
	if (typeMove == 0) {
		current = current + 1;
		selected.GetComponent(TextMesh).fontSize = 80;
		selected.GetComponent(TextMesh).color = Color.black;
		
		selected = menuText[current];
		
		selected.GetComponent(TextMesh).fontSize = 110;
		selected.GetComponent(TextMesh).color = orange;
//	} else {
//		current2 = current2 + 1;
//		selected2.GetComponent(TextMesh).fontSize = 50;
//		selected2.GetComponent(TextMesh).color = Color.black;
//		
//		selected2 = controlsText[current];
//		
//		selected2.GetComponent(TextMesh).fontSize = 70;
//		selected2.GetComponent(TextMesh).color = orange;
	}
}
