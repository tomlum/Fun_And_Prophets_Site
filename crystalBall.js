// WOOBLE THE TEXT BASED ON SINE * SIZE FACTOR

const startY = 600;
const fadeTime = 50;
const fadeAmount = 1.1;
const maxSize = 2;
const rotAmount = 0.002;
let first = true;
let predI = 0;

// Webfont stuff
window.WebFontConfig = {
	google: {
		families: ["Amatic SC:700"]
	},

	active: function() {
		init();
	}
};

(function() {
	var wf = document.createElement("script");
	wf.src = "./webfont.js"
	wf.type = "text/javascript";
	wf.async = "true";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(wf, s);
})();

function scale(x, scale) {
	x.scale.x = scale;
	x.scale.y = scale;
}

function grow(x, d) {
	x.scale.x += d;
	x.scale.y += d;
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function init() {
	PIXI.settings.RESOLUTION = 3;

	const predictions = shuffle([
		[
			`     There will be a sim city\n
			TV show within 10 years\n
			   -Ernie`,
			"Pre Episode",
			"/episode/prequel"
		],
		[
			`     VR Slim is going to\n
			suck eggs\n
			   -Tom`,
			"Pre Episode",
			"/episode/prequel"
		],
		[
			`     Solaire will be in\n
			Super Smash Bros Ultimate\n
			   -Ernie`,
			"Pre Episode",
			"/episode/prequel"
		],
		[
			`     A Breath of the Wild\n
			Guardian will be in smash\n
			   -Bea`,
			"Pre Episode",
			"/episode/prequel"
		],
		[
			`     The Fighting Game\n
			Community will explode\n
			because of DBFZ and\n
			Super Smash Bros Ultimate\n
			   -Ernie`,
			"Episode 1",
			"https://itunes.apple.com/us/podcast/1-big-mac-battle-royale/id1421609362?i=1000417124705&mt=2"
		],
		[
			`     Mario Tennis Aces will\n
			quickly become a\n
			speedrunning classic\n
			   -Bea`,
			"Episode 1",
			"https://itunes.apple.com/us/podcast/1-big-mac-battle-royale/id1421609362?i=1000417124705&mt=2"
		],
		[
			`     Black Ops 4 Vehicles\n
			will be broken\n
			   -Tom`,
			"Episode 1",
			"https://itunes.apple.com/us/podcast/1-big-mac-battle-royale/id1421609362?i=1000417124705&mt=2"
		],
		[
			`     Death stranding will\n
			be delayed\n
			   -Ernie`,
			"Episode 1",
			"https://itunes.apple.com/us/podcast/1-big-mac-battle-royale/id1421609362?i=1000417124705&mt=2"
		],
		[
			`     This time the Halo\n
			TV Show will happen.\n
			And be bad.\n
			   -Tom`,
			"Episode 2",
			"https://itunes.apple.com/us/podcast/2-wheres-the-big-green-guy/id1421609362?i=1000417124704&mt=2"
		],
		[
			`     Master chief WILL be\n
			in theHalo TV Show\n
			   -Tom`,
			"Episode 2",
			"https://itunes.apple.com/us/podcast/2-wheres-the-big-green-guy/id1421609362?i=1000417124704&mt=2"
		],
		[
			`     EA will make a\n
			Battlefield game for Mobile\n
			   -Bea`,
			"Episode 2",
			"https://itunes.apple.com/us/podcast/2-wheres-the-big-green-guy/id1421609362?i=1000417124704&mt=2"
		]
	]);

	const width = 1000;
	const height = 1000;
	const ratio = width / height;
	const BallApp = new PIXI.Application(width, height, {
		transparent: true
	});
	document.getElementById("crystalBall").appendChild(BallApp.view);

	let animating = false;
	let anim = 0;
	let growState = 0;

	const t_smokeFront = PIXI.Sprite.fromImage("/assets/smokeFront.png");
	t_smokeFront.interactive = true;
	t_smokeFront.cursor = "pointer";
	t_smokeFront.alpha = 0;
	t_smokeFront.anchor.x = 0.5;
	t_smokeFront.anchor.y = 0.5;
	t_smokeFront.x = width / 2 + 10;
	t_smokeFront.y = startY + 30;
	t_smokeFront.on("pointerdown", function() {
		if (!animating) {
			animating = true;
			anim = 1;
		}
		if (growState === 0) {
			growState = 1;
		}
	});
	const t_smokeCover = PIXI.Sprite.fromImage("/assets/smokeCover.png");
	t_smokeCover.anchor.x = 0.5;
	t_smokeCover.anchor.y = 0.5;
	t_smokeCover.x = width / 2 + 16;
	t_smokeCover.y = startY + 31;

	const t_smokeBack = PIXI.Sprite.fromImage("/assets/smokeBack.png");
	t_smokeBack.anchor.x = 0.5;
	t_smokeBack.anchor.y = 0.5;
	t_smokeBack.x = width / 2 + 10;
	t_smokeBack.y = startY + 30;

	const predText = new PIXI.Text("", {
		font: "47px Amatic SC",
		padding: 10
	});
	predText.style.fill = "#37164b";
	predText.anchor.x = 0.5;
	predText.anchor.y = 0.5;
	predText.x = width / 2 + 17;
	predText.y = startY;
	predText.style.lineHeight = 22;

	const linkText = new PIXI.Text("", {
		font: "47px Amatic SC",
		padding: 10
	});
	linkText.style.fill = "#8029b7";
	linkText.anchor.x = 0.5;
	linkText.anchor.y = 0.5;
	linkText.x = width / 2;
	linkText.y = startY + 350;
	linkText.link = null;
	linkText.interactive = true;
	linkText.on("pointerdown", function() {
		if (linkText.href) {
			window.location.href = linkText.href;
		}
	});
	const underline = new PIXI.Graphics();

	BallApp.stage.addChild(t_smokeBack);
	BallApp.stage.addChild(t_smokeFront);
	BallApp.stage.addChild(linkText);
	BallApp.stage.addChild(underline);
	BallApp.stage.addChild(t_smokeCover);
	BallApp.stage.addChild(predText);

	BallApp.ticker.add(function(delta) {
		t_smokeBack.rotation += rotAmount * delta;
		t_smokeFront.rotation -= rotAmount * delta;
		linkText.alpha = 1 - t_smokeFront.alpha;
		underline.alpha = 1 - t_smokeFront.alpha;
		if (growState === 1) {
			if (predText.scale.x >= maxSize) {
				growState = 0;
			} else {
				grow(predText, fadeAmount * 0.65 / fadeTime);
				grow(t_smokeBack, fadeAmount / fadeTime);
				grow(t_smokeFront, fadeAmount / fadeTime);
				grow(linkText, fadeAmount / fadeTime);
			}
		} else if (growState === -1) {
			if (predText.scale.x <= 1) {
				growState = 0;
			} else {
				grow(predText, -fadeAmount / fadeTime);
				grow(t_smokeBack, -fadeAmount / fadeTime);
				grow(t_smokeFront, -fadeAmount / fadeTime);
				grow(linkText, -fadeAmount / fadeTime);
			}
		}
		if (animating) {
			if (anim == 1) {
				predText.alpha -= fadeAmount / fadeTime;
				t_smokeFront.alpha += fadeAmount / fadeTime;
				if (first) {
					t_smokeCover.alpha -= 2 / fadeTime;
					predText.y -= 100 / fadeTime;
					t_smokeBack.y -= 100 / fadeTime;
					t_smokeFront.y -= 100 / fadeTime;
					linkText.y -= 100 / fadeTime;
				}
				if (predText.alpha <= 0) {
					anim = 2;
					predI = (predI + 1) % predictions.length;
					predText.setText(predictions[predI][0]);
					linkText.setText(predictions[predI][1]);
					linkText.href = predictions[predI][2];
					linkText.cursor = "pointer";

					if (first) {
						first = false
						underline.position.set(
							width / 2 - 330 / 2,
							linkText.getBounds().y +
								linkText.getBounds().height -
								20
						);
						underline
							.lineStyle(3, 0x8029b7)
							.moveTo(0, 0)
							.lineTo(330, 0);
					}
				}
			} else if (anim == 2) {
				predText.alpha += fadeAmount / fadeTime;
				t_smokeFront.alpha -= fadeAmount / fadeTime;
				if (predText.alpha >= 1) {
					anim = 0;
					animating = false;
				}
			}
		}
	});
}
