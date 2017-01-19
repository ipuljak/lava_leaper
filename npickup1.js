// Variable declarations

var correctionforce : float = 50.0f;
var pickupDistance = 32.0;

static var itemHeld = 0;
static var heldObject : GameObject;
private var distanceObjects;
private var hand : GameObject;
private var target : GameObject;


function Start() {
	// Get a reference to Riley
	target = GameObject.Find("Holder");
	hand = GameObject.Find("Riley");
}

function Update () {
	
	// Calculate the distance between the two colliders (Riley and the object)
	distanceObjects = Vector3.Distance(renderer.collider.transform.position, hand.collider.transform.position);
	Debug.Log(distanceObjects);

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
    
    if (itemHeld == 2) {
    	var force : Vector3 = Vector3(target.transform.position.x - transform.position.x, 0, target.transform.position.z - transform.position.z);
    	rigidbody.velocity = force.normalized * rigidbody.velocity.magnitude;
		rigidbody.AddForce(force * correctionforce);
		rigidbody.velocity *= Mathf.Min(1.0f, force.magnitude / 2);
	}
    
    
}

function GrabItem() {
	Debug.Log("GRAB");
	// Check to see that the player is not already holding something
	if (itemHeld == 0) {
		itemHeld = 1;
		rigidbody.useGravity = false;
		rigidbody.freezeRotation = true;
	}
}

function DropItem() {
	Debug.Log("DROP");
	itemHeld = 0;
	rigidbody.useGravity = true;
	rigidbody.freezeRotation = false;
}








//#pragma strict
//
//function Start () {
//
//}
//
//var correctionforce : float = 50.0f;
//var grabbed : boolean = true;
//
//function Update () {
//	var target = GameObject.Find("Holder");
//	var force : Vector3 = Vector3(target.transform.position.x - transform.position.x, 0, target.transform.position.z - transform.position.z);
//	
//	
//
//	if(Input.GetKeyDown(KeyCode.E))
//	{
//	grabbed = false;
//	print("released");
//	}
//
//	if(grabbed == true)
//	{
//	print("grabbed");
//	if(rigidbody.freezeRotation == false)
//	{
//	rigidbody.freezeRotation = true;
//	}
//
//	if(rigidbody.isKinematic == true)
//	{
//	    rigidbody.isKinematic = false;
//	    print("it works");
//	}
//	   
//	rigidbody.velocity = force.normalized * rigidbody.velocity.magnitude;
//
//	rigidbody.AddForce(force * correctionforce);
//
//	rigidbody.velocity *= Mathf.Min(1.0f, force.magnitude / 2);
//	}
//
//	if(grabbed == false)
//	{
//	rigidbody.isKinematic = true;
//	}
//
//}







//// Variable declarations
//
//// pickupDistance is changed based on the vector3 distance between the two objects (Riley and the pickable object)
//// this variable is currently hardcoded because there is some kind of problem with scaling.
//var pickupDistance = 32.0;
//var objectDist = -.1;
//
//
//// These are the visibility distances of the held object from the player's vision
//var heldHeight = -0.5;
//var heldDistance = 1.5;
//
//static var itemHeld = 0;
//static var heldObject : GameObject;
//private var hand : GameObject;
//private var distanceObjects;
////private var hit: RaycastHit;
//
//
//function Start() {
//	// Get a reference to Riley
//	hand = gameObject.FindWithTag("Player");
//}
//
//function Update () {
//	
//	// Calculate the distance between the two colliders (Riley and the object)
//	distanceObjects = Vector3.Distance(renderer.collider.transform.position, hand.collider.transform.position);
//
//	// Grab the item if E is pressed and you are not holding an item
//	if (Input.GetKeyDown(KeyCode.E) && itemHeld == 0) {
//		if (renderer.isVisible && distanceObjects < pickupDistance) {
//			GrabItem();
//		}
//	}
//	
//	// Drop the item if E is pressed and you are holding an item
//	if (Input.GetKeyDown(KeyCode.E) && itemHeld == 2) {
//		DropItem();
//	} 
//	
//	// Set itemHeld to 2 when key is released so that it updates itemHeld immediately after grabbing something
//    if (Input.GetKeyUp(KeyCode.E)) {
//    	if (itemHeld == 1) {
//    		itemHeld = 2;
//    	}
//    }
//}
//
//function GrabItem() {
//	Debug.Log("GRAB");
//	// Check to see that the player is not already holding something
//	if (itemHeld == 0) {
//				
//		itemHeld = 1; 
//		heldObject = gameObject;
//		// Make the player the parent of the held object
//		//heldObject.transform.parent = hand.transform;
//		
//		// *** New code ***
//		//heldObject.transform.parent = hand.transform.parent;
//		
//		heldObject.collider.enabled = false;
//		heldObject.layer = 8;
//		heldObject.transform.parent = GameObject.Find("HeldCamera").transform.parent;
//		
//		
//		// Stop physics movement on the object while it is being held
//		heldObject.GetComponent(Rigidbody).isKinematic = true;
//		// Place the object in front of the player's vision
//		var handLocation = Vector3(0, heldHeight, heldDistance);
//		heldObject.transform.localPosition = handLocation;
//	}
//}
//
//function DropItem() {
//	Debug.Log("DROP");
//	itemHeld = 0;
//	// Remove the object from the player and enable physics on the object again
//	heldObject.transform.parent = null;
//    heldObject.GetComponent(Rigidbody).isKinematic = false;
//    heldObject.collider.enabled = true;
//    heldObject.layer = 0;
//    heldObject = null;
//}
