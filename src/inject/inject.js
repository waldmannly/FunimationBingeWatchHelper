chrome.extension.sendMessage({}, function (response) {

	var readyStateCheckInterval = setInterval(function () {
		console.log("funimation binge watch helper loaded."); 
		if (document.readyState === "complete") {
			// if (window.location.href.indexOf('youtube') > 0 && youtubeSkip === false) { 
			// 	var elements = document.getElementsByClassName("ytp-ad-skip-button");
			// 	if (elements.length > 0) {
			// 		console.log("attempting to skip youtube ad")
			// 		console.log(elements[0].click());
			// 	}
			// }
			clearInterval(readyStateCheckInterval);
			
			var name = chrome.storage.sync.get({
				youtubeSkip: true, 
				funimationSkip: true,
				youtubePollingInt: 1500,
				funimationPollingInt: 5000,
				introInt: 3,
				jumpInt: 22.5,
				hideLogo: true,
				hideTime: true,
				autoFull: false
			}, function (items) {
				youtubeSkip = items.youtubeSkip;
				funimationSkip = items.funimationSkip;
				youtubePollingInt= items.youtubePollingInt;
				funimationPollingInt= items.funimationPollingInt;
				introInt = items.introInt;
				jumpInt = items.jumpInt;
				hideLogo = items.hideLogo; 
				hideTime = items.hideTime; 
				autoFull = items.autoFull; 
				if (window.location.href.indexOf('youtube') > 0 && document && youtubeSkip) {
					var elements = document.getElementsByClassName("ytp-ad-skip-button");
					if (elements.length>0) {
						console.log("attempting to skip youtube ad")
						console.log(elements[0].click());
					}
				}
				
				if (window.location.href.indexOf('youtube') > 0){
					var youtubePoller = setInterval(function () {
						if (!hideTime) {
							console.log("in utube poller"); 
						}
						if ((document && document.getElementById("player") == null )) return;
						// chrome.storage.sync.get({
						// 	youtubeSkip: true, 
						// 	youtubePollingInt: 1500,
						// 	hideTime: true
						// }, function (items) {
						// 	youtubeSkip = items.youtubeSkip;
						// 	youtubePollingInt= items.youtubePollingInt;
						// 	hideTime = items.hideTime;
						// });

						if (window.location.href.indexOf('youtube') > 0 && document && youtubeSkip) {
							var elements = document.getElementsByClassName("ytp-ad-skip-button");
							if (elements.length > 0) {
								console.log("attempting to skip youtube ad")
								console.log(elements[0].click());
							}
							return; 
						}
						if (youtubeSkip === false){
							console.log("clear youtube poller")
							clearInterval(youtubePoller);
						}
					}, youtubePollingInt);
				}

				if (window.location.href.indexOf('funimation') > 0){
					var funimationPoller = setInterval(function () {
						if (!hideTime) {
							console.log("in fun poller"); 
						}
						if ((document && document.getElementById("player") == null )) return;
						// chrome.storage.sync.get({
						// 	funimationSkip: true,
						// 	funimationPollingInt: 5000,
						// 	introInt: 3,
						// 	jumpInt: 22.5,
						// 	hideLogo: true,
						// 	hideTime: true
						// 	//autoFull: false
						// }, function (items) {
						// 	funimationSkip = items.funimationSkip;
						// 	funimationPollingInt= items.funimationPollingInt;
						// 	introInt = items.introInt;
						// 	jumpInt = items.jumpInt;
						// 	hideLogo = items.hideLogo; 
						// 	hideTime = items.hideTime; 
						// 	//autoFull = items.autoFull; 
						// });
						if (funimationSkip === false){
							console.log("clear fun poller")
							clearInterval(funimationPoller);
						}
						if (funimationSkip)
						{
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

							if (autoFull && !(document.fullscreenElement) ) {
								// document.getElementById("player").contentWindow.document.getElementById("funimation-control-fullscreen").click();
								// first = false;
								document.getElementById("player").webkitRequestFullscreen();
							}

							
							if (!hideTime) {
								console.log(curTime);
							}

							if (curTime > jumpInt) {
								document.getElementById("player").contentWindow.document.getElementById("funimation-control-next").click();
								clearInterval(funimationPoller);
								console.log("skipped and cleared interval")
							}

							if (hideLogo) {
								document.getElementById("player").contentWindow.document.getElementById("funimation-logo").style.display = "None";
							}
						}
					}, funimationPollingInt);
				}
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