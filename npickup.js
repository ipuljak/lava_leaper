// Variable declarations

// pickupDistance is changed based on the vector3 distance between the two objects (Riley and the pickable object)
// this variable is currently hardcoded because there is some kind of problem with scaling.
var pickupDistance = 32.0;
var objectDist = -.1;


// These are the visibility distances of the held object from the player's vision
var heldHeight = -0.5;
var heldDistance = 1.5;

static var itemHeld = 0;
static var heldObject : GameObject;
private var hand : GameObject;
private var distanceObjects;
//private var hit: RaycastHit;


function Start() {
	// Get a reference to Riley
	hand = gameObject.FindWithTag("Player");
}

function Update () {
	
	// Calculate the distance between the two colliders (Riley and the object)
	distanceObjects = Vector3.Distance(renderer.collider.transform.position, hand.collider.transform.position);

	// Grab the item if E is pressed and you are not holding an item
	if (Input.GetKeyDown(KeyCode.E) && itemHeld == 0) {
		if (renderer.isVisible && distanceObjects < pickupDistance) {
			GrabItem();
		}
	}
	
	// Drop the item if E is pressed and you are holding an item
	if (Input.GetKeyDown(KeyCode.E) && itemHeld == 2) {
		DropItem();
	} 
	
	// Set itemHeld to 2 when key is released so that it updates itemHeld immediately after grabbing something
    if (Input.GetKeyUp(KeyCode.E)) {
    	if (itemHeld == 1) {
    		itemHeld = 2;
    	}
    }
}

function GrabItem() {
	Debug.Log("GRAB");
	// Check to see that the player is not already holding something
	if (itemHeld == 0) {
				
		itemHeld = 1; 
		heldObject = gameObject;
		// Make the player the parent of the held object
		heldObject.transform.parent = hand.transform;
		// Stop physics movement on the object while it is being held
		heldObject.GetComponent(Rigidbody).isKinematic = true;
		// Place the object in front of the player's vision
		var handLocation = Vector3(0, heldHeight, heldDistance);
		heldObject.transform.localPosition = handLocation;
	}
}

function DropItem() {
	Debug.Log("DROP");
	itemHeld = 0;
	// Remove the object from the player and enable physics on the object again
	heldObject.transform.parent = null;
    heldObject.GetComponent(Rigidbody).isKinematic = false;
    heldObject = null;
}
