var app = {
    // Application Constructor
    initialize: function() {
        app.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('playing', this.onPlaying, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //device ready for cordova API only
    },
    onPlaying: function() {
       app.notifications("Currently Playing", "Castle Club Radio", true, true);

        var radioTimer = setInterval(app.radioTime, 1000);
    },
    radioTime: function() {
        var radio = document.getElementById("radio"),
        audioCurrentTime = radio.currentTime;

        $(".radio-holder #status").html("Stream Buffered!").delay(1000).hide();

        var minutes = "0" + Math.floor(audioCurrentTime / 60);
        var seconds = "0" +  Math.floor(audioCurrentTime - minutes * 60);

        var dur = minutes.substr(-2) + ":" + seconds.substr(-2);

        //document.getElementById("radioPlayer").getElementsByClassName(".timer")[0].innerHtml(dur);
        $("#radioPlayer .timer").html(dur);
    },
    notifications: function(message, title, autoCancel, ongoing) {
        window.plugins.notification.local.schedule({
            id:         "CastleClubRadio",  // A unique id of the notifiction
            title:      title,  // The title of the message
            text:       message,  // The message that is displayed
            icon:       "img/logo.png",
            autoCancel: autoCancel, // Setting this flag and the notification is automatically canceled when the user clicks it
            ongoing:    ongoing, // Prevent clearing of notification (Android only)
        });
    }
};

app.initialize();

//functions after app has loaded, jquery click specific

$(document).ready(function() {
    //get initial page header
    $(".header h1.main-title").html($("a#initLoad").html());

    $.get('http://castleclubcms.pixelbof.co.uk/api/cms2app/1', function(data) {
        $(".ui-content #page-load").html("Loading...");
        $(".ui-content #page-load").html(data.pageHtml)
    });
    //click link and load html page in content
    $("#leftpanel a").on("click", function(event) {
        event.preventDefault();
        var page = $(this).attr("data-page"),
            title = $(this).html(),
            pageID;

        //create switch statement to choose API page
        switch(page) {
            case 'index':
                pageID = 1
                break;
            case 'about-djs':
                pageID = 2
                break;
            case 'schedule':
                pageID = 3
                break;
            case 'interact':
                pageID = 4
                break;
            case 'facebook':
                pageID = 5
                break;
            case 'twitter':
                pageID = 6
                break;
            case 'youtube':
                pageID = 7
                break;
        }

        $("#leftpanel").panel("close");
        if(pageID != null || pageID != '' || pageID != undefined) {
            $(".ui-content #page-load").html("<div style='width:100%;text-align:center;'><img src='img/ajax-loader.gif' /></div>");
            $.get('http://castleclubcms.pixelbof.co.uk/api/cms2app/'+pageID, function(data) {
                $(".ui-content #page-load").html(data.pageHtml)
            });
        } else {

        }

        $(".header h1.main-title").html(title);
    });

    //add background-image after page has loaded
    var img = 'img/Android/res/drawable-xxxhdpi/screen.png';

    $( ".ui-page" ).delay(4500).animate({
          backgroundColor: "rgba(102,102,102,0.9)",
        }, 800 );

    $('body')
        .delay(4500)
        .queue( function(next){ 
        $(this).css({
            backgroundImage: "url("+img+")", 
            backgroundRepeat : "no-repeat", 
            backgroundPosition: "center center", 
            backgroundSize: "cover"});
        next(); 
    });


    //radio controller
    var radio = document.getElementById("radio");
    radio.preload = "auto";

    $(radio).trigger('play');
    $(".radio-holder #status").html("Stream Buffering...");

    $("#radioPlayer a").on("click", function() {
        if($(this).attr("id") == "play") {
            $(this).prop("id", "pause").find("i").removeClass("zmdi-play").addClass("zmdi-pause");
            $('#radioPlayer .timer').css("background-image", "url(img/playing.gif)");
            $(radio).trigger('play');
            $(".radio-holder #status").html("Stream Buffering...");
        } else if($(this).attr("id") == "pause") {
            $(this).prop("id", "play").find("i").removeClass("zmdi-pause").addClass("zmdi-play");
            $('#radioPlayer .timer').css("background-image", "none");
            $(radio).trigger('pause');
        } else if($(this).attr("id") == "mute") {
            $(this).prop("id", "muted").find("i").removeClass("zmdi-volume-up").addClass("zmdi-volume-off");
            $(radio).prop("muted",!$(radio).prop("muted"));
        } else if($(this).attr("id") == "muted") {
            $(this).prop("id", "mute").find("i").removeClass("zmdi-volume-off").addClass("zmdi-volume-up");
            $(radio).prop("muted",!$(radio).prop("muted"));
        }
    });
    
});