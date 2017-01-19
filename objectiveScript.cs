using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[AddComponentMenu("Objective Script")]
public class objectiveScript : MonoBehaviour
{
	public string pickupButton = "Fire1"; //The name of the Pick Up button you are going to use.
	public float maxDistanceGrab = 50f; //The maximum distance an object can be grabbed.
	public GameObject playerCam; //Camera of player
	private Rect windowRect;
	private Ray playerAim; //Vector3 of main camera's direction //PRIVATE
	private bool objectCan; // Can the object the player is looking at be held? //PRIVATE
	private int bookCount;
	private GameObject[] pickableObjs; //Objects that PlayerGun can pick up
	private GameObject booksText; // reference to inventory count for books
	private bool gameEnd = false;
	
	public crosshairSystem crosshairsSystem = new crosshairSystem(); //Bring the Crosshair System into the Inspector
	public audioSoundsSub audioSystem = new audioSoundsSub(); //Brings the audio menu into the Inspector

	void Start()
	{
		//Set bools, objects, and floats to proper defaults.
		Screen.showCursor = false;
		Screen.lockCursor = true;
		pickableObjs = GameObject.FindGameObjectsWithTag("Book");
		bookCount = -1;

		// count of how many books are enabled
		foreach (GameObject book in pickableObjs) {
			if (book.activeSelf) {
				bookCount += 1;
			}
		}

		booksText = GameObject.Find("BooksLeft");
		booksText.GetComponent<TextMesh>().text = "boOKS LeFT " + bookCount.ToString ();
	}

	void Update() {

		if (gameEnd) {
			Camera.current.transform.position = new Vector3(96.91103f, 26.49176f, -37.60777f);
			Camera.current.transform.eulerAngles = new Vector3(0, 270);
			StartCoroutine (PlayAnimation ("Jump"));
		}

		//Finds all the objects with the tag "Book", and adds them to the GameObject list, 'pickableObjs'
		pickableObjs = GameObject.FindGameObjectsWithTag("Book");

		//Crosshair Raycasting
		//Ray playerAim = playerCam.camera.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0.5f));
		Ray playerAim = playerCam.camera.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0));
		RaycastHit hit;
		//Debug.DrawRay(playerAim.origin, playerAim.direction, Color.red);
		Physics.Raycast(playerAim, out hit);//Outputs the Raycast
		
		foreach (GameObject pickable in pickableObjs)
			//For each 'Book', it will allow the object to be held depending on the collision of the object.
		{
			//Debug.Log (hit.collider.gameObject);
			if (pickable == hit.collider.gameObject && Vector3.Distance(hit.collider.gameObject.transform.position, playerCam.transform.position) < maxDistanceGrab)
			{
				objectCan = true;

				if (pickable == GameObject.Find("backpack")) {
					if (bookCount != 0) {
						continue;
					} 
				}

				if (Input.GetButtonDown(pickupButton)) {

					if (pickable == GameObject.Find("backpack")) {
						if (bookCount != 0) {
							continue;
						} else {
							if (audioSystem.enabled)
							{
								audio.PlayOneShot(audioSystem.throwAudio);
							}
							pickable.SetActive(false);
							booksText.GetComponent<TextMesh>().text = "     You win!";
							objectCan = false;
							gameEnd = true;
							// ***** Load next scene here *****
						}
					} else {
						if (audioSystem.enabled)
						{
							audio.PlayOneShot(audioSystem.throwAudio);
						}
						pickable.SetActive(false);
						bookCount -= 1;

						if (bookCount == 0) {
							booksText.GetComponent<TextMesh>().text = "nOw gEt yOUr bAG";
						} else {
							booksText.GetComponent<TextMesh>().text = "boOKS LeFt " + bookCount.ToString ();
						}
					}
				}

				break;
			}
			else
			{
				objectCan = false;
			}
		}
	}

	void OnGUI()
	{
		if (crosshairsSystem.enabled)
		{
			if (objectCan) //Object Can Be Held Crosshair
			{
				GUI.DrawTexture(new Rect(Screen.width / 2 - (crosshairsSystem.crosshairTextures[1].width / 2), Screen.height / 2 - (crosshairsSystem.crosshairTextures[1].height / 2),
				                         crosshairsSystem.crosshairTextures[1].width,
				                         crosshairsSystem.crosshairTextures[1].height),
				                crosshairsSystem.crosshairTextures[1]);
			}
			else //Default Crosshair
			{
				if (crosshairsSystem.crosshairTextures[0] == null)
				{
					
				}
				else
				{
					GUI.DrawTexture(new Rect(Screen.width / 2 - (crosshairsSystem.crosshairTextures[0].width / 2), Screen.height / 2 - (crosshairsSystem.crosshairTextures[0].height / 2),
					                         crosshairsSystem.crosshairTextures[0].width,
					                         crosshairsSystem.crosshairTextures[0].height),
					                crosshairsSystem.crosshairTextures[0]);
				}
			}
		}
	}

	IEnumerator PlayAnimation(string toBePlayed) {
		Debug.Log("Animation should be played here!");
		animation.Play (toBePlayed);
		yield return new WaitForSeconds (animation[toBePlayed].clip.length);//(float) (animation.clip.length - 0.5);
		//Debug.Log ("Stopping the animation");
		animation.Stop (toBePlayed);
		Application.LoadLevel ("newMenu");
	}
}

[System.Serializable]
public class crosshairSystem //Crosshair System - You are no longer required to just remove the code, just disable it from the inspector!
{
	public bool enabled = true;
	
	public Texture2D[] crosshairTextures; //Array of textures to use for the crosshair
	//0 = default | 1 = Object can be held | 2 = Object is being held currently
}

[System.Serializable]
public class audioSoundsSub
{
	public bool enabled = true;
	
	public AudioClip pickedUpAudio;
	//public AudioClip objectHeldAudio;
	public AudioClip throwAudio;
	
	
	[System.NonSerialized]
	public bool letGoFired = false;
}