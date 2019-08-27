

function switch_visible() {
    var
        objs_visible = document.getElementsByClassName("start_visible"),
        objs_hidden = document.getElementsByClassName("start_hidden");

    var i = 0;
    while (i < objs_visible.length) {
        console.log('hola');
        objs_visible[i].style.display = "none";
        i++;
    }

    i = 0;
    while (i < objs_hidden.length) {
        objs_hidden[i].style.display = "block";
        i++;
    }
}

function begin() {
    switch_visible();
}
