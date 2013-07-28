#pragma strict

private var dof : DepthOfFieldScatter;
private var pauseScreen : PauseScreen;
private var mainCamera : Camera;
private var secondCamera : Camera;

var paused : boolean;
var timer : float;
var currentCamera : int;

function Start() {
	dof = GameObject.Find("Main Camera").GetComponent(DepthOfFieldScatter);
	dof.maxBlurSize = 10.1;
	
	pauseScreen = GameObject.Find("PauseScreen").GetComponent(PauseScreen);
	pauseScreen.hide(false);
	
	mainCamera = GameObject.Find("Main Camera").GetComponent(Camera);
	mainCamera.enabled = true;
	secondCamera = GameObject.Find("Camera Pivot/Second Camera").GetComponent(Camera);
	secondCamera.enabled = false;
	currentCamera = 0;
	
	paused = true;
	Time.timeScale = 0;
	timer = 0;
	
}

function Update() {
	if(Input.GetKeyUp(KeyCode.Return) && timer <= 0) {
		if(paused) {
			Time.timeScale = 1;
		}
		pauseScreen.hide(paused);
		paused = !paused;
		timer = 0.5;
	}
	if(Input.GetKeyUp(KeyCode.R)) {
		Application.LoadLevel(Application.loadedLevel);
	}
	if(Input.GetKeyUp(KeyCode.Tab)) {
		currentCamera = (currentCamera+1)%2;
		if(currentCamera == 0) {
			mainCamera.enabled = true;
			secondCamera.enabled = false;
		} else if(currentCamera == 1) {
			mainCamera.enabled = false;
			secondCamera.enabled = true;
		}
	}
	
	if(timer > 0) {
		timer = timer - Time.deltaTime;
		if(timer <= 0) {
			timer = 0;
			Time.timeScale = (paused? 0.0: 1.0);
		}
		if(paused) {
			var tmp : float = (1-timer/0.5)*10+0.1;
		} else {
			tmp = (timer/0.5)*10+0.1;
		}
		dof.maxBlurSize = tmp;
	}
}
