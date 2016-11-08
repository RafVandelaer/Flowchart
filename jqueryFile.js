/**
 * Created by Raf on 8/11/2016.
 */
$(document).ready(function () {
    window.firstRun = true;
    readJSON();
    //for developping
    //skipStart();
    //firstRun for reading json
    var welkom = $("#welkom");
    welkom.animate({opacity: 1}, 2000, function () {
        welkom.animate({top: "5%", 'margin-top': 0}, 1000, function () {
            $("#startKiezer").fadeIn("slow");
        });

    });

});
//getting the required element
function getElement(element){
    var task = window.json[element];
    console.log("We are at task: " + element);
    //on first run we read the json
    $("#title").text(task.title);
    var descr = $("#descr");
    $.each(task.descr, function(i, obj) {
        descr.append("<li>"+ obj +"</li>")
    });
    $("#solu").append(task.solu);
}
// reading the json file, this is only done once, so the web page doesn't use too much resources
function readJSON(){
    if(window.firstRun) {
        window.firstRun = false;
        $.getJSON("flow/main.json", function(d) {
            window.json = d;
        });
    }
}
$(".starterclick").click(function () {

    var start = $("#start");
    start.animate({opacity: 0}, 1000, function () {
        start.hide();
        $("nav").show(500, function () {
            $("#taskContainer").fadeIn("slow");
        });
    });


    if(this.id == "computer"){
        getElement("1.0");

    }else if(this.id == "beamer"){

    }
});
//scrollbar
$(window).on("load",function(){
    $("#explainContainer").mCustomScrollbar({
        theme:"minimal",
        axis: "xy"
    });
});
