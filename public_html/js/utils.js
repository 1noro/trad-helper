// utils.js
// (c) inoro 2019 GPL v3
// debería ordenar el código

var
    switch_visible_status = true,
    iterator = 0,
    keys = [],
    phrases = [],
    result = {};

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

/*############################################################################*/
function begin_btn_gchanges() {
    document.getElementById('input_cont').style.display = "none";
    document.getElementById('begin_bt').style.display = "none";
    document.getElementById('continue_bt').style.display = "none";
    document.getElementById('return_bt').style.display = "block";
    document.getElementById('control_table_div').style.display = "block";
    document.getElementById('new_text_cont').style.display = "block";
    document.getElementById('next_bt').style.display = "block";
    document.getElementById('output_cont').style.display = "block";
}

function return_btn_gchanges() {
    document.getElementById('input_cont').style.display = "block";
    document.getElementById('begin_bt').style.display = "none";
    document.getElementById('continue_bt').style.display = "block";
    document.getElementById('return_bt').style.display = "none";
    document.getElementById('control_table_div').style.display = "none";
    document.getElementById('new_text_cont').style.display = "none";
    document.getElementById('next_bt').style.display = "none";
    document.getElementById('output_cont').style.display = "none";
}

function end_btn_gchanges() {
    document.getElementById('input_cont').style.display = "none";
    document.getElementById('begin_bt').style.display = "none";
    document.getElementById('continue_bt').style.display = "none";
    document.getElementById('return_bt').style.display = "block";
    document.getElementById('control_table_div').style.display = "none";
    document.getElementById('new_text_cont').style.display = "none";
    document.getElementById('next_bt').style.display = "none";
    document.getElementById('output_cont').style.display = "block";
}

function continue_btn_gchanges() {
    if (iterator < keys.length) {
        begin_btn_gchanges();
    } else {
        end_btn_gchanges();
        var output_cont = document.getElementById('output');
        output_cont.scrollTop = output_cont.scrollHeight;
    }
}

/*############################################################################*/
function begin_btn() {
    var json = document.getElementById('input').value;

    if (JSON.parse(json)) {
        phrases = JSON.parse(json)['english'];
        keys = Object.keys(phrases);
        result["espanol"] = {};
        set_phrase();
        begin_btn_gchanges();
        document.getElementById('input').readOnly = true;
    } else {
        console.log('[FAIL] Thre is no json text in the input.');
    }
}

/*############################################################################*/
function continue_btn() {
    continue_btn_gchanges();
}

/*############################################################################*/
function return_btn() {
    return_btn_gchanges();
}

/*############################################################################*/
function next_btn() {
    var
        new_text_cont = document.getElementById('new_text'),
        next_bt = document.getElementById('next_bt');
    result["espanol"][keys[iterator]] = new_text_cont.value.replace(/\n$/, "");
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
        end_btn_gchanges();
        output_cont.value = JSON.stringify(result, null, 4);
    }
}

/*############################################################################*/
function copy_btn() {
    var copyText = document.getElementById("actual_text_cp");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    console.log("Copied the text: '" + copyText.value + "'");
    document.getElementById('new_text').focus();
}
