// utils.js
// (c) inoro 2019 GPL v3
// debería ordenar el código

var
    switch_visible_status = true,
    iterator = 0,
    keys = [],
    phrases = [],
    result = {};

function switch_visible() {
    var
        objs_visible = document.getElementsByClassName("start_visible"),
        objs_hidden = document.getElementsByClassName("start_hidden");

    if (switch_visible_status == true) {
        var i = 0;
        while (i < objs_visible.length) {
            objs_visible[i].style.display = "none";
            i++;
        }

        i = 0;
        while (i < objs_hidden.length) {
            objs_hidden[i].style.display = "block";
            i++;
        }
        switch_visible_status = false;
    } else {
        var i = 0;
        while (i < objs_visible.length) {
            objs_visible[i].style.display = "block";
            i++;
        }

        i = 0;
        while (i < objs_hidden.length) {
            objs_hidden[i].style.display = "none";
            i++;
        }
        switch_visible_status = true;
    }
}

function set_phrase() {
    var
        actual_key_cont = document.getElementById('actual_key'),
        actual_text_cont = document.getElementById('actual_text'),
        actual_text_cp_cont = document.getElementById('actual_text_cp'),
        output_cont = document.getElementById('output');
    actual_key_cont.innerText = keys[iterator];
    actual_text_cont.innerText = phrases[keys[iterator]];
    actual_text_cp_cont.value = phrases[keys[iterator]];
    output_cont.value = JSON.stringify(result, null, 4);
    output_cont.scrollTop = output_cont.scrollHeight;
}

function check_intro(e) {
    if (e.keyCode == 13) {
        if (!e.shiftKey) {
            next_btn();
        }
    }
}

function begin_btn() {
    var json = document.getElementById('input').value;

    if (JSON.parse(json)) {
        phrases = JSON.parse(json)['english'];
        keys = Object.keys(phrases);
        set_phrase();
        switch_visible();
        document.getElementById('begin_bt').style.display = "none";
        document.getElementById('next_bt').style.display = "block";
        document.getElementById('input').readOnly = true;
    } else {
        console.log('[FAIL] Thre is no json text in the input.');
    }
}

function return_btn() {
    switch_visible();
    document.getElementById('continue_bt').style.display = "block";
    document.getElementById('next_bt').style.display = "none";
}

function next_btn() {
    var
        new_text_cont = document.getElementById('new_text'),
        next_bt = document.getElementById('next_bt');
    result[keys[iterator]] = new_text_cont.value.replace(/\n$/, "");
    new_text_cont.value = "";
    new_text_cont.focus();

    iterator++;

    if (iterator < keys.length) {
        set_phrase();
        if ((iterator+1) == keys.length) {
            next_bt.innerText = "END";
        }
    } else if (iterator == keys.length) {
        var output_cont = document.getElementById('output');
        console.log('[INFO] Fin');
        next_bt.innerText = "ENDED!!"; //este cambio es inutil porquees invisible
        next_bt.style.cursor = "default"; //este cambio es inutil porquees invisible
        next_bt.style.display = "none";
        output_cont.value = JSON.stringify(result, null, 4);
    }
}

function copy_btn() {
    /* Get the text field from an input obj*/
    var copyText = document.getElementById("actual_text_cp");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    console.log("Copied the text: '" + copyText.value + "'");
    document.getElementById('new_text').focus();
}

function continue_btn() {
    switch_visible();
    document.getElementById('continue_bt').style.display = "none";
    (iterator < keys.length)?document.getElementById('next_bt').style.display = "block":0;
}
