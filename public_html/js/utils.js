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

function is_json_string(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
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
    var
        input_cont = document.getElementById('input'),
        json = input_cont.value;

    if (is_json_string(json)) {
        phrases = JSON.parse(json)['english'];
        keys = Object.keys(phrases);
        result["espanol"] = {};
        set_phrase();

        input_cont.style.color = "#3c3c3c";
        input_cont.parentNode.style.background = "none";
        begin_btn_gchanges();
        document.getElementById('input').readOnly = true;
        document.getElementById('new_text').focus();
    } else {
        console.log('[FAIL] Thre is no JSON text in the input.');
        input_cont.style.color = "#ffffff";
        input_cont.parentNode.style.backgroundColor = "#d13f3f";
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
        next_bt = document.getElementById('next_bt'),
        new_text = new_text_cont.value.replace(/\n$/, ""),
        output_cont = document.getElementById('output');

    if (is_json_string(output_cont.value)) {
        result = JSON.parse(output_cont.value);
        result["espanol"][keys[iterator]] = new_text;

        output_cont.style.color = "#3c3c3c";
        output_cont.parentNode.style.background = "none";
        new_text_cont.value = "";
        new_text_cont.focus();
        console.log("[ ++ ] "+keys[iterator]+": "+new_text);

        iterator++;

        if (iterator < keys.length) {
            set_phrase();
            if ((iterator+1) == keys.length) {
                next_bt.innerText = "END";
            }
        } else if (iterator == keys.length) {
            console.log('[INFO] End.');
            end_btn_gchanges();
            output_cont.value = JSON.stringify(result, null, 4);
        }
    } else {
        console.log('[FAIL] Thre is no JSON text in the output.');
        output_cont.style.color = "#ffffff";
        output_cont.parentNode.style.backgroundColor = "#d13f3f";
    }
}

/*############################################################################*/
function copy_btn() {
    var copyText = document.getElementById("actual_text_cp");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    console.log("[COPY] Text: '" + copyText.value + "'");
    document.getElementById('new_text').focus();
}

/*############################################################################*/
function copy_down_btn() {
    var new_text_cont = document.getElementById('new_text');
    // new_text_cont.value += phrases[keys[iterator]];
    new_text_cont.value = phrases[keys[iterator]];
    console.log("[CPDW] Text: '" + phrases[keys[iterator]] + "'");
    new_text_cont.focus();
}

/*############################################################################*/
function check_intro(e) {
    if (e.keyCode == 13) {
        if (e.ctrlKey) {
            console.log('hola');
            copy_down_btn();
            next_btn();
        } else if (!e.shiftKey) {
            next_btn();
        } 
    }
}

function check_copy_click(e) {
    if (e.button == 0) {
        copy_btn();
    } else if (e.button == 1 || e.button == 2) {
        copy_down_btn();
    }
}
