using UnityEngine;
using System.Collections;

public class introduction : MonoBehaviour {


	public bool showIntro;
	private GameObject introText;
	private GameObject booksText;
	private int stage;

	public FirstPersonController fpc;
	
	// Use this for initialization
	void Start () {

		fpc = GetComponent<FirstPersonController>();
		fpc.enabled = false;

		stage = 1;
		showIntro = true;
		introText = GameObject.Find("Introduction");

		introText.GetComponent<TextMesh>().text = 
			@"Welcome to Riley's Odyssey!

			You are Riley, a 10 year old girl with an ambitious imagination.
			Unfortunately, that imagination has gotten to the best of her,
			and now the whole floor of her room has turned into lava!
			It's now up to you to collect her books and make sure that
			she gets to school on time!

			This is a small tutorial level to have you learn the game. 
			You can pick up objects, but it's not needed to get all the books.

			       Press any button to continue...";
	}
	
	// Update is called once per frame
	void Update () {

		if (!showIntro) {
			introText.SetActive(false);
		}

		if (Input.anyKeyDown) {
			if (stage == 1) {
				introText.GetComponent<TextMesh>().text = 
					@"Here is the control scheme:

					Movement: Left analog stick
					Look    : Right analog stick
					Jump    : A
					Pick up : B
					Drop    : B
					Throw   : Y

							Press any button to start!";
				stage = 2;

			} else {
				showIntro = false;
				fpc.enabled = true;
			}
		}
	}
}
