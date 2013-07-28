#pragma strict

function Start() {
	GameObject.Find("PauseScreen/Description").GetComponent(GUIText).text = "A platform game exercise\nusing Unity3D and its physical engine";
	GameObject.Find("PauseScreen/Key Hint").GetComponent(GUIText).text = "Left/Right arrow keys = Move around\n'X' = Jump\n'Enter' = Start\n'R' = Restart\n'Tab' = Switch camera";
}

function hide(input : boolean) {
	if(input) {
		transform.position.x = 2;
	} else {
		transform.position.x = 0.5;
	}
}