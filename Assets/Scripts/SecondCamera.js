#pragma strict

private var target : Transform;

function Start() {
	target = GameObject.Find("Main Character").transform;
}

function Update() {
	transform.position = target.position;
}
