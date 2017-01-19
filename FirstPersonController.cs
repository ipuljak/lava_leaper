using UnityEngine;
using System.Collections;

// ***************************************************************************************************************
// A large part of the code was learned using this tutorial by quill18: http://www.youtube.com/watch?v=mbm9lPB5GPw
// ***************************************************************************************************************

[RequireComponent (typeof(CharacterController))]

public class FirstPersonController : MonoBehaviour {

	// Values for pause menu
	public GUISkin myskin;
	private Rect windowRect;
	public bool paused = false;
	private float time;

	public AudioClip gameOver;


	// Values for speed boost (not needed)
	public bool speedup = false;
	public bool speedupOn = false;
	public float speedupSpeed = 10.0f;
	public float timer = 0;

	// Base movement and jumping speeds
	public float forwardMovementSpeed = 7.0f;
	public float sideMovementSpeed = 7.0f;
	public float jumpSpeed = 5.0f;

	// Mouse and analog sensitivity
	public float mouseSensitivity = 2.0f;
	public float upDownRange = 60.0f;
	
	float verticalRotation = 0;
	float verticalVelocity = 0;
	bool isPaused = false;
	bool lostGame = false;
	private string dying_animation = "Dying";
	
	CharacterController characterController;

	// Use this for initialization
	void Start () {

		// Lock the mouse cursor to the screen so that it's not visible
		Screen.lockCursor = true;
		characterController = GetComponent<CharacterController>();
		//this.renderer.c = 0.5;
		// pause menu GUI box
		windowRect = new Rect(Screen.width / 2 - 100, Screen.height / 2 - 50, 200, 100);

	}

	void Update() {
		//Debug.Log ("Update");
		if (lostGame && !animation.IsPlaying(dying_animation)){
			Application.LoadLevel(Application.loadedLevelName);
		}
	}
	
	// Update is called once per frame
	void FixedUpdate () {

		// If the escape key is pressed, pause game, show pause menu

		// ********* Commented out temporarily while working on game *********

//		if (Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown (KeyCode.P)) {
//			if(paused){
//				paused = false;
//				Screen.lockCursor = true;
//				
//			}else{
//				paused = true;
//				Screen.lockCursor = false;
//			}
//
//		}

		if (Input.GetAxis("QuitGame") > 0) {
			Application.LoadLevel("newMenu");
		}


	if (!paused) {

		Screen.lockCursor = true;
		// Mouse rotation for left and right.
		float rotLeftRight = Input.GetAxis ("Mouse X") * mouseSensitivity;
		transform.Rotate (0, rotLeftRight, 0);

		// Mouse rotation for up and down. Simulate neck in the sense that you can't look directly up but only at a degree.
		verticalRotation -= Input.GetAxis ("Mouse Y") * mouseSensitivity;
		verticalRotation = Mathf.Clamp (verticalRotation, -upDownRange, upDownRange);
		Camera.main.transform.localRotation = Quaternion.Euler (verticalRotation, 0, 0);

		// Forward and side movement.
		float forwardSpeed = 0;

		forwardSpeed = (forwardSpeed + forwardMovementSpeed) * Input.GetAxis ("Vertical");
		float sideSpeed = Input.GetAxis ("Horizontal") * sideMovementSpeed;

		if (characterController.isGrounded && (forwardSpeed != 0 || sideSpeed != 0)) {
				StartCoroutine(PlayAnimation("Walkcycle"));
		}


		// Gravity for falling when jumping.
			verticalVelocity += Physics.gravity.y * Time.deltaTime * 1.8f;

		// Jump ability. Limit speed when in the air.
		if (characterController.isGrounded && Input.GetButton ("Jump")) {
				//StartCoroutine(PlayAnimation("Jump"));
				verticalVelocity = jumpSpeed;
				forwardSpeed = 1.0f;
		}

		// Combined vector for speed.
		Vector3 speed = new Vector3 (sideSpeed, verticalVelocity, forwardSpeed);
		speed = transform.rotation * speed;

		// Move the character controller.
		characterController.Move (speed * Time.deltaTime);
}
	}

	// pause menu GUI
	private void OnGUI()
	{
		//if (paused)
			//windowRect = GUI.Window(0, windowRect, windowFunc, "Pause Menu");
	}
	
	private void windowFunc(int id)
	{
		if (GUILayout.Button("Resume"))
		{
			paused = false;
			Screen.lockCursor = true;
			
		}
		if (GUILayout.Button("Options"))
		{
			
		}
		if (GUILayout.Button("Main Menu"))
		{
			Application.LoadLevel("menu");
		}
	}


	// Detect collision.
	void OnControllerColliderHit(ControllerColliderHit playerCollider){

		/*
		 *  This stuff was from my last assignment so not necessary
		 */

		//if(playerCollider.transform.name == "Floor") {
		// use the bottom line of code if you want to collide with the lava rather than the floor.
		if(playerCollider.transform.name == "NewFloor") {

			if ((Application.loadedLevelName == "room") || (Application.loadedLevelName == "room2")) {
				Camera.current.transform.localPosition = new Vector3(0.0f, 1.0f, 1.75f);
				Camera.current.transform.localEulerAngles = new Vector3(0, 180);
				paused = true;
				lostGame = true;
				audio.PlayOneShot(gameOver);
				StartCoroutine(PlayAnimation(dying_animation));
			}
		}
	}

	IEnumerator PlayAnimation(string toBePlayed) {
		//Debug.Log("Animation should be played here!");
		animation.Play (toBePlayed);
		yield return new WaitForSeconds (2.3f);//(float) (animation.clip.length - 0.5);
		//Debug.Log ("Stopping the animation");
		animation.Stop (toBePlayed);
	}
}
