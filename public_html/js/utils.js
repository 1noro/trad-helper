
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
        output_cont = document.getElementById('output');
    actual_key_cont.innerText = keys[iterator];
    actual_text_cont.innerText = phrases[keys[iterator]];
    output_cont.value = JSON.stringify(result, null, 4);
}

function begin_btn() {
    var json = document.getElementById('input').value;

    if (JSON.parse(json)) {
        phrases = JSON.parse(json)['english'];
        keys = Object.keys(phrases);
        set_phrase();
        switch_visible();
    } else {
        console.log('[FAIL] Thre is no json text in the input.');
    }
}

function return_btn() {
    switch_visible();
}

function next_btn() {
    var new_text_cont = document.getElementById('new_text');
    result[keys[iterator]] = new_text_cont.value;
    new_text_cont.value = "";
    new_text_cont.focus();

    //cambiar next por end antes del último paso, y luego que desaparezca.

    iterator++;

    if (iterator < keys.length) {
        set_phrase();
    } else if (iterator == keys.length) {
        var output_cont = document.getElementById('output');
        console.log('[INFO] Fin');
        output_cont.value = JSON.stringify(result, null, 4);
    }
}

function copy_btn() {
    console.log('copy...');
}
