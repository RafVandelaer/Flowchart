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
//getting the required element, adding json to HTML page
function getElement(element){


    var task =window.json[element];
    var backwards = $(".fa-arrow-left");

    backwards.attr("step", backwards.attr("this"));
    backwards.attr("this",element);


    var imageCount = ["twelve","six","four","three","twoo","twoo","one"];



    console.log("We are at task: " + element);
    //on first run we read the json
    $("#title").text(task.title);
    var descr = $("#descr");
    descr.empty();
    $.each(task.descr, function(i, obj) {
        descr.append("<li>"+ obj +"</li>")
    });
    var solu =  $("#solu");
    solu.empty();
    solu.append(task.solu);
    console.log(task.solu);
    $("#activeImage").find("img").attr("src", task.images[0]);

    var container =  $("#images");

    container.empty();
    var colums = task.images.length;
    console.log("totall images: " + colums );
    var oneOrMore = "column";
    if(colums < 6){
        oneOrMore = "colums"
    }


    $.each(task.images, function(i, obj, callback) {
         console.log("An image is added");
        container.append("<img class='"+ imageCount[colums-1]+ " " + oneOrMore+ " imageScroll ' src='" + obj + "'/>");
        var imageScroll = $(".imageScroll")
        imageScroll.css("height", container.outerHeight());
        imageScroll.css("width", "auto");
    });
   /* container.mCustomScrollbar(
        {axis:"x"}
    );*/
    $(".fa-times").attr("step",task.notSolved);
    $(".fa-check").attr("step",task.nextStep);


   /* $.each(task.images, function(i, obj) {
      /* console.log("An image is added")
        tableRow.append("<td><img src='" + obj + "' /></td>");
    });*/
}
// on click of an image
$(document).on('click', '.imageScroll',function () {
    $("#activeImage").find("img").attr("src", $(this).attr("src"));

});

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
            $("#taskContainer").fadeIn("slow", function () {
                $('.imageScroll').each(function(i, obj) {
                    $(this).css("height", $('#images').outerHeight());
                });
            });
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

$("#next").click(function () {
    getElement($(this).attr("step"));
});
$("#cross").click(function () {
    getElement($(this).attr("step"));
});

$("#back").click(function () {
    getElement($(this).attr("step"));
});