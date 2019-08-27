
var switch_visible_status = true;

function switch_visible() {
    var
        objs_visible = document.getElementsByClassName("start_visible"),
        objs_hidden = document.getElementsByClassName("start_hidden");

    if (switch_visible_status == true) {
        var i = 0;
        while (i < objs_visible.length) {
            console.log('hola1');
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
            console.log('hola2');
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

function begin_btn() {
    switch_visible();
}

function return_btn() {
    switch_visible();
}
