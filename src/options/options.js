// Saves options to chrome.storage
function save_options() {
    var youtubeSkip = document.getElementById('youtubeSkip').checked;
    var funimationSkip = document.getElementById('funimationSkip').checked;
    var youtubePoll = document.getElementById('youtubePollingInt').value;
    var funimationPoll = document.getElementById('funimationPollingInt').value;
    var intro = document.getElementById('introInt').value;
    var jump = document.getElementById('jumpInt').value;
    var hide = document.getElementById('hideLogo').checked;
    var time = document.getElementById('hideTime').checked;
    var full = document.getElementById('autoFull').checked;
    chrome.storage.sync.set({
        youtubeSkip: youtubeSkip,
        funimationSkip: funimationSkip,
        youtubePollingInt: youtubePoll,
        funimationPollingInt: funimationPoll,
        introInt: intro,
        jumpInt: jump, 
        hideLogo: hide,
        hideTime: time,
        autoFull: full
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
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
            document.getElementById('youtubeSkip').checked = items.youtubeSkip;
            document.getElementById('funimationSkip').checked = items.funimationSkip;
            document.getElementById('youtubePollingInt').value = items.youtubePollingInt;
            document.getElementById('funimationPollingInt').value = items.funimationPollingInt;
            document.getElementById('introInt').value = items.introInt;
            document.getElementById('jumpInt').value = items.jumpInt;
            document.getElementById('hideLogo').checked = items.hideLogo;
            document.getElementById('hideTime').checked = items.hideTime;
            document.getElementById('autoFull').checked = items.autoFull;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);