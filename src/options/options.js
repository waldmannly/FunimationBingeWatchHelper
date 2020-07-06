// Saves options to chrome.storage
function save_options() {
    var poll = document.getElementById('pollingInt').value;
    var intro = document.getElementById('introInt').value;
    var jump = document.getElementById('jumpInt').value;
    var hide = document.getElementById('hideLogo').checked;
    var time = document.getElementById('hideTime').checked;
    chrome.storage.sync.set({
        pollingInt: poll,
        introInt: intro,
        jumpInt: jump, 
        hideLogo: hide,
        hideTime: time 
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
        pollingInt: 5000,
        introInt: 3,
        jumpInt: 22.5, 
        hideLogo: true, 
        hideTime: true
    }, function (items) {
            document.getElementById('pollingInt').value = items.pollingInt;
            document.getElementById('introInt').value = items.introInt;
            document.getElementById('jumpInt').value = items.jumpInt;
            document.getElementById('hideLogo').checked = items.hideLogo;
            document.getElementById('hideTime').checked = items.hideTime;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);