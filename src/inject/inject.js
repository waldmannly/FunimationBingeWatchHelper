chrome.extension.sendMessage({}, function (response) {

	var readyStateCheckInterval = setInterval(function (){
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			chrome.storage.sync.get({
				pollingInt: 5000,
				introInt: 3,
				jumpInt: 22.5,
				hideLogo: true,
				hideTime: true
			}, function (items) {
				pollingInt = items.pollingInt;
				introInt = items.introInt;
				jumpInt = items.jumpInt;
				hideLogo = items.hideLogo; 
				hideTime = items.hideTime; 
		
				var test = setInterval(function (){
					chrome.storage.sync.get({
						pollingInt: 5000,
						introInt: 3,
						jumpInt: 22.5,
						hideLogo: true, 
						hideTime: true
					}, function (items) {
							pollingInt = items.pollingInt;
							introInt = items.introInt;
							jumpInt = items.jumpInt;
							hideTime = items.hideTime;
					});

					if (document.getElementById("player") == null) return;
					curTime = document.getElementById("player").contentWindow.document.getElementById("brightcove-player_html5_api").currentTime / 60
					if (curTime < introInt) {
						maxPress = Math.ceil(introInt * 60 - curTime * 60) / 10.0
						console.log(maxPress)
						for (var i = 0; i < maxPress; i++) {
							document.getElementById("player").contentWindow.document.getElementById("funimation-control-forward").click()
							console.log("Press")
						}
					}

					if (!hideTime) {
						console.log(curTime)
					}

					if (curTime > jumpInt) {
						document.getElementById("player").contentWindow.document.getElementById("funimation-control-next").click()
					}

					if (hideLogo) {
						document.getElementById("player").contentWindow.document.getElementById("funimation-logo").style.display = "None"
					}

				}, pollingInt);
			});
			console.log("skipper loaded from scripts/inject.js");
		}
	}, 10);
});


























/*console.log(vid[39].childNodes[1].contentWindow.document.childNodes[1].childNodes[2].childNodes[1].childNodes[0])*/
			//console.log(vid[39].childNodes[1].contentWindow.document.getElementById("brightcove-player_html5_api"))
			//console.log(vid[39].childNodes[1].contentWindow.document.getElementById("brightcove-player"))

			//console.log(document.getElementById("player").contentWindow.document.getElementsByClassName("funimation-control"))
			//document.getElementById("player").contentWindow.document.getElementsByClassName("vjs-big-play-button")[0].click()

			//console.log(document.getElementById("player").contentWindow.document.getElementsByTagName("button"))



		// ----------------------------------------------------------
		//var test = setInterval(function () {

		//	color = null
		//	chrome.storage.sync.get("favoriteColor", function (items) {
		//		if (typeof items.favoriteColor !== "undefined") color = items.favoriteColor;
		//		console.log(color)
		//	})

		//	if (document.getElementById("player") == null) return;
		//	curTime = document.getElementById("player").contentWindow.document.getElementById("brightcove-player_html5_api").currentTime / 60
		//	if (curTime < 3) {
		//		maxPress = Math.ceil(3 * 60 - curTime * 60) / 10.0
		//		console.log(maxPress)
		//		for (var i = 0; i < maxPress; i++) {
		//			document.getElementById("player").contentWindow.document.getElementById("funimation-control-forward").click()
		//			console.log("Press")
		//		}
		//	}

		//	console.log(curTime)


		//	/*console.log(vid[39].childNodes[1].contentWindow.document.childNodes[1].childNodes[2].childNodes[1].childNodes[0])*/
		//	//console.log(vid[39].childNodes[1].contentWindow.document.getElementById("brightcove-player_html5_api"))
		//	//console.log(vid[39].childNodes[1].contentWindow.document.getElementById("brightcove-player"))

		//	//console.log(document.getElementById("player").contentWindow.document.getElementsByClassName("funimation-control"))
		//	//document.getElementById("player").contentWindow.document.getElementsByClassName("vjs-big-play-button")[0].click()

		//	//console.log(document.getElementById("player").contentWindow.document.getElementsByTagName("button"))

		//	if (curTime > 22.5) {
		//		document.getElementById("player").contentWindow.document.getElementById("funimation-control-next").click()
		//	}

		//	document.getElementById("player").contentWindow.document.getElementById("funimation-logo").style.display = "None"

		//}, 5000); 