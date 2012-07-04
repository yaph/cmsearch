var urls, lis = null;
// Loop through options list and call callback with list object.
function cycleOptions(callback) {
    if (!urls) urls = document.getElementById('urls')
    if (!lis) lis = urls.getElementsByTagName('li');
    for (i in lis) {
        var li = lis[i];
        if ('object' != typeof li)
            continue;
        callback(li);
    }
}
// Saves options to localStorage.
function saveOptions() {
    var selected = [];

    cycleOptions(function(li) {
        var chk = li.getElementsByTagName('input')[0];
        if (chk.checked)
            selected.push(chk.value);
    });

    localStorage[cache_id] = selected;
    Sitesearch.reloadContextMenu();

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.innerHTML = 'Options Saved.';
    setTimeout(function(){status.innerHTML = '';}, 750);
}

function createOption(url) {
    var checked = '';
    if (!Sitesearch.selected.length || -1 != Sitesearch.selected.indexOf(url.id)) {
        checked = 'checked="checked"';
    }
    return '<li><input ' + checked + ' type="checkbox" name="url" value="' + url.id + '">' + url.name + '</li>';
}

// Restores checkboxes states to saved value from localStorage.
function showOptions() {
    Sitesearch.init();
    var options = Sitesearch.cycle(createOption);
    document.getElementById('urls').innerHTML = '<form><ul>' + options.join('') + '</ul></form>';
    document.title = title;
    document.getElementById('title').innerHTML = title;
    document.getElementById('heading').innerHTML = heading;
}
function selectAll() {
    document.getElementById('nav_all').checked = 'checked';
    document.getElementById('nav_none').checked = null;
    cycleOptions(function(li) {
        li.getElementsByTagName('input')[0].checked = 'checked';
    });
}
function selectNone() {
    document.getElementById('nav_all').checked = null;
    document.getElementById('nav_none').checked = 'checked';
    cycleOptions(function(li) {
        li.getElementsByTagName('input')[0].checked = null;
    });
}

window.onload = function() {
    document.getElementById('nav_all').addEventListener('click', selectAll);
    document.getElementById('nav_none').addEventListener('click', selectNone);
    document.getElementById('save_options').addEventListener('click', saveOptions);
    showOptions();
}
