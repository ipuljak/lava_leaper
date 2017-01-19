var walkSpeed:float;
var walkAnimSpeed:float;
var strafeAnimSpeed:float;
var runSpeed:float;
var runAnimSpeed:float;
var rotationSpeed:float;
var jumpForce:float;
var jumpAnimSpeed:float;
var gravity:float;


private var charController:CharacterController;
private var gravityFall:float;
private var jumping:boolean;
private var walking:boolean;
private var strafing:boolean;
private var preparingJump:boolean;
private var falling:boolean;

function Start(){
	charController = GetComponent(CharacterController);
}


function Update () {
	
	if(Input.GetAxis("Vertical") > 0){
		walking = true;
		if(Input.GetButton("Shift")){
			animation['run'].speed = runAnimSpeed;
			animation.CrossFade("run");
			charController.Move(transform.forward * runSpeed * Time.deltaTime);
		}
		else{
			animation['Walkcycle'].speed = walkAnimSpeed;
			animation.CrossFade("Walkcycle");
			charController.Move(transform.forward * walkSpeed * Time.deltaTime);
		}
	}
	else if(Input.GetAxis("Vertical") < 0){
		walking = true;
		if(Input.GetButton("Shift")){
			animation['run'].speed = -runAnimSpeed;
			animation.CrossFade("run");
			charController.Move(transform.forward * -runSpeed * Time.deltaTime);
		}
		else{
			animation['Walkcycle'].speed = -walkAnimSpeed;
			animation.CrossFade("Walkcycle");
			charController.Move(transform.forward * -walkSpeed * Time.deltaTime);
		}
	}
	else{
		walking = false;
	}
	
	if(Input.GetAxis("Horizontal") > 0){
		strafing = true;
		animation['strafe_R'].speed = strafeAnimSpeed;
		animation.CrossFade("strafe_R");
		charController.Move(transform.right * walkSpeed * Time.deltaTime);
	}
	else if(Input.GetAxis("Horizontal") < 0){
		strafing = true;
		animation['strafe_L'].speed = strafeAnimSpeed;
		animation.CrossFade("strafe_L");
		charController.Move(transform.right * -walkSpeed * Time.deltaTime);
	}
	else{
		strafing = false;
	}
	
	if(Input.GetButtonDown("Jump") && !jumping){
		animation['jump'].speed = jumpAnimSpeed;
		animation.CrossFade("jump");
		
		startJump();
	}
	
	if(preparingJump){
		animation.CrossFade("jump");
	}
	
	if(!charController.isGrounded && !jumping){
		if(!falling){
			gravityFall = 0;
			falling = true;
		}
		
		charController.Move(transform.up * gravityFall * Time.deltaTime);
		gravityFall -= gravity * Time.deltaTime;
	}
	
	if(falling){
		if(charController.isGrounded){
			falling = false;
		}
	}
	
	if(jumping){
		charController.Move(transform.up * gravityFall * Time.deltaTime);
		gravityFall -= gravity * Time.deltaTime;
		
		if(charController.isGrounded){
			jumping = false;
		}
	}
	
	if(!walking && !strafing && !jumping && !preparingJump){
		animation.CrossFade("idle");
	}
	
	
	transform.Rotate(Vector3(0, Input.GetAxis("Mouse X") * rotationSpeed * Time.deltaTime, 0));
	
}

function startJump(){
	preparingJump = true;
	yield WaitForSeconds(.5);
	preparingJump = false;
	gravityFall = jumpForce;
	jumping = true;
}