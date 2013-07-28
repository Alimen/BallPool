#pragma strict

private var target : Transform;
private var mainLight : Transform;
private var bondary : float = 1.5;

function Start() {
	target = GameObject.Find("Main Character").transform;
	mainLight = GameObject.Find("Main Light").transform;
}

function Update() {
	if((target.position.x-transform.position.x) > bondary) {
		transform.position.x = target.position.x - bondary;
	} else if((target.position.x-transform.position.x) < -1*bondary) {
		transform.position.x = target.position.x + bondary;
	}
	if(target.position.y - transform.position.y > bondary) {
		transform.position.y = target.position.y - bondary;
	} else if(target.position.y - transform.position.y < -1*bondary) {
		transform.position.y = target.position.y + bondary;
	}
	mainLight.position = transform.position;
}