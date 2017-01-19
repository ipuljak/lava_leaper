// Variable declarations

var correctionforce : float = 50.0;
var pickupDistance = 32.0;

static var itemHeld = 0;
static var heldObject : GameObject;
private var distanceObjects;
private var hand : GameObject;
private var target : GameObject;
private var itemT : GameObject;
private var objectsT : GameObject[];

function Start() {

	objectsT = GameObject.FindGameObjectsWithTag("Pickable");
	// Get a reference to Riley
	target = GameObject.Find("Holder");
	hand = GameObject.Find("Riley");
}

function Update () {
	
	// Calculate the distance between the two colliders (Riley and the object)
//	distanceObjects = Vector3.Distance(renderer.collider.transform.position, hand.collider.transform.position);
//	Debug.Log(distanceObjects);

	// Grab the item if E is pressed and you are not holding an item
	//if (Input.GetKeyDown(KeyCode.E) && itemHeld == 0) {
	if (Input.GetAxis("Fire1") && itemHeld == 0) {
	
		//var objectsT : GameObject[];
		//objectsT = GameObject.FindGameObjectsWithTag("Pickable");
		var smallestDistance = Mathf.Infinity;
		for (var itemR : GameObject in objectsT) {
			
			Debug.Log(itemR);
			var calcDistance1 = Vector3(itemR.collider.transform.position.x, 0, itemR.collider.transform.position.z);
			var calcDistance2 = Vector3(hand.collider.transform.position.x, 0, hand.collider.transform.position.z);
			distanceObjects = Vector3.Distance(calcDistance1, calcDistance2);
			Debug.Log(distanceObjects);
			if (itemR.renderer.isVisible && distanceObjects < smallestDistance) {
				itemT = itemR;
				smallestDistance = distanceObjects;
			}
			//Debug.Log();
		}
		if (smallestDistance < pickupDistance) {
			Debug.Log("FOUND " + itemT);
			GrabItem();
		}
//		if (renderer.isVisible && distanceObjects < pickupDistance) {
//			GrabItem();
//		}
	}
	
	// Drop the item if E is pressed and you are holding an item
	if (Input.GetAxis("Fire1") && itemHeld == 2) {
		DropItem();
	} 
	
	// Set itemHeld to 2 when key is released so that it updates itemHeld immediately after grabbing something
    if (Input.GetAxis("Fire1")) {
    	if (itemHeld == 1) {
    		itemHeld = 2;
    	}
    }
    
    if (itemHeld == 2) {
    	var force : Vector3 = Vector3(target.transform.position.x - itemT.transform.position.x, target.transform.position.y - itemT.transform.position.y, target.transform.position.z - itemT.transform.position.z);
    	itemT.rigidbody.velocity = force.normalized * itemT.rigidbody.velocity.magnitude;
		itemT.rigidbody.AddForce(force * correctionforce);
		itemT.rigidbody.velocity *= Mathf.Min(0.9f, force.magnitude / 2);
		
		distanceRileyObjects = Vector3.Distance(itemT.collider.transform.position, hand.collider.transform.position);
		if (distanceRileyObjects > pickupDistance  * 2) {
			DropItem();
		}
	}
    
    
}

function GrabItem() {
	Debug.Log("GRAB");
	// Check to see that the player is not already holding something
	if (itemHeld == 0) {
		itemHeld = 1;
		itemT.rigidbody.useGravity = false;
		itemT.rigidbody.freezeRotation = true;
		ObjectiveReached(itemT);
	}
}

function DropItem() {
	Debug.Log("DROP");
	itemHeld = 0;
	itemT.rigidbody.useGravity = true;
	itemT.rigidbody.freezeRotation = false;
	itemT = null;

}

function ObjectiveReached(objectHeld) {
	
	Debug.Log("ObjectiveReached() is being called!");
	// The objective of the game is not complete yet.
	child = objectHeld.transform.Find("audioSource");
	
	if (child == null) 
		return;
	child = child.gameObject;
	Debug.Log("Objective is finished!");
	objectHeld.GetComponent(MeshRenderer).enabled = false;
	// Play the audio clip attached to the objective for
	// 3 seconds, and then call mission finished.
	child.SetActive(true);
	yield WaitForSeconds(4);
	objectHeld.SetActive(false);
	NewLevel();
}

function NewLevel() {
	// This function should be called to go to the next level/objective.
	Debug.Log("NewLevel().");
	door = GameObject.Find("door");
	door.transform.eulerAngles.x = 270;
	door.transform.eulerAngles.y = 90;
	door.transform.eulerAngles.z = 0;
	door.transform.position = Vector3(-74.11636, 19.2856, -128.5188);
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
