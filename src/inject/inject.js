chrome.extension.sendMessage({}, function (response) {

	var first = true; 

	var readyStateCheckInterval = setInterval(function () {
		console.log("here"); 
		if (document.readyState === "complete") {
			if (window.location.href.indexOf('youtube') > 0) { 
				var elements = document.getElementsByClassName("ytp-ad-skip-button");
				if (elements.length > 0) {
					console.log("attempting to skip youtube ad")
					console.log(elements[0].click());
				}
			}
			clearInterval(readyStateCheckInterval);
			
			var name = chrome.storage.sync.get({
				pollingInt: 1500,
				introInt: 3,
				jumpInt: 22.5,
				hideLogo: true,
				hideTime: true
				//autoFull: false
			}, function (items) {
				pollingInt = items.pollingInt;
				introInt = items.introInt;
				jumpInt = items.jumpInt;
				hideLogo = items.hideLogo; 
				hideTime = items.hideTime; 
				//autoFull = items.autoFull; 
				if (window.location.href.indexOf('youtube') > 0 && document) {
					var elements = document.getElementsByClassName("ytp-ad-skip-button");
					if (elements.length>0) {
						console.log("attempting to skip youtube ad")
						console.log(elements[0].click());
					}
				}
				
				var test = setInterval(function () {

					if (document && document.getElementById("player") == null) return;
					chrome.storage.sync.get({
						pollingInt: 5000,
						introInt: 3,
						jumpInt: 22.5,
						hideLogo: true, 
						hideTime: true
						//autoFull: false 
					}, function (items) {
							pollingInt = items.pollingInt;
							introInt = items.introInt;
							jumpInt = items.jumpInt;
							hideLogo = items.hideLogo;
							hideTime = items.hideTime;
							//autoFull = items.autoFull; 
					});

					if (window.location.href.indexOf('youtube') > 0 && document) {
						var elements = document.getElementsByClassName("ytp-ad-skip-button");
						if (elements.length > 0) {
							console.log("attempting to skip youtube ad")
							console.log(elements[0].click());
						}
						return; 
					}
					curTime = document.getElementById("player").contentWindow.document.getElementById("brightcove-player_html5_api").currentTime / 60;
					if (curTime < introInt) {
						//if (autoFull && first) {
						//	document.getElementById("player").contentWindow.document.getElementById("funimation-control-fullscreen").click();
						//	first = false;
						//}
						maxPress = Math.ceil(introInt * 60 - curTime * 60) / 10.0;
						console.log(maxPress)
						for (var i = 0; i < maxPress; i++) {
							document.getElementById("player").contentWindow.document.getElementById("funimation-control-forward").click();
							console.log("Press");
						}

					}

					//if (autoFull && first) {
					//	document.getElementById("player").contentWindow.document.getElementById("funimation-control-fullscreen").click();
					//	first = false;
					//}

					if (!hideTime) {
						console.log(curTime);
					}

					if (curTime > jumpInt) {
						document.getElementById("player").contentWindow.document.getElementById("funimation-control-next").click();
					}

					if (hideLogo) {
						document.getElementById("player").contentWindow.document.getElementById("funimation-logo").style.display = "None";
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