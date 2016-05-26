#pragma strict

private var gameManager : GameManager;

enum characterState {stand, walking, walking2, walking3, falling};
var state : characterState = characterState.falling;
var frame : int = 0;
var timer : float = -1;
var currentDirection : Vector3 = Vector3.zero;
var jumped : boolean = false;
var onGround : int = 0;

function Start() {
	gameManager = GameObject.Find("GameManager").GetComponent(GameManager);
}

function Update() {
	if(gameManager.paused) {
		return;
	}

	// Handling inputs
	if(Input.GetButtonDown("Jump") && onGround != 0) {
		jumped = true;
	}
	if(!Input.GetKey(KeyCode.LeftArrow) && !Input.GetKey(KeyCode.RightArrow)) {
		changeState(characterState.stand);
	}
	if(Input.GetKeyDown(KeyCode.LeftArrow)) {
		changeState(characterState.walking);
		transform.localScale.x = -1.3;
		currentDirection = Vector3.left;
	}
	if(Input.GetKeyDown(KeyCode.RightArrow)) {
		changeState(characterState.walking);
		transform.localScale.x = 1.3;
		currentDirection = Vector3.right;
	}
	if(onGround == 0) {
		changeState(characterState.falling);
	}
	
	// Animations
	if(state == characterState.walking) {
		timer -= Time.deltaTime;
		if(timer <= 0.0) {
			frame = (frame + 1) % 3;
			timer = 0.1;
		}
	}
	var offset : float = (parseInt(state)+frame)*0.2;
	GetComponent.<Renderer>().material.SetTextureOffset("_MainTex", Vector2(offset, 0));
}

function FixedUpdate() {
	if(gameManager.paused) {
		return;
	}
	
	if(jumped) {
		GetComponent.<Rigidbody>().velocity.y = 9;
		jumped = false;
	}
	GetComponent.<Rigidbody>().MovePosition(GetComponent.<Rigidbody>().position + currentDirection*Time.deltaTime*5);
	GetComponent.<Rigidbody>().velocity.x = 0;
}

function changeState(input : characterState) {
	if(input == state) {
		return;
	}

	switch(input) {
	case characterState.stand:
		frame = 0;
		timer = -1;
		currentDirection = Vector3.zero;
		break;
		
	case characterState.walking:
		frame = 0;
		timer = 0.1;
		break;
	
	case characterState.falling:
		frame = 0;
		timer = -1;
		break;
	}
	state = input;
}

function OnTriggerEnter(other : Collider) {
	if(onGround == 0) {
		if(currentDirection == Vector3.zero) {
			changeState(characterState.stand);
		} else {
			changeState(characterState.walking);
		}
	}
	onGround++;
}

function OnTriggerExit(other : Collider) {
	onGround--;
}
