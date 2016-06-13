/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        //app.notifications("something", "some title", true, false);
    },
    notifications: function(message, title, autoCancel, ongoing) {
        window.plugin.notification.local.add({
            id:         "CastleClubRadio",  // A unique id of the notifiction
            message:    message,  // The message that is displayed
            title:      title,  // The title of the message
            autoCancel: autoCancel, // Setting this flag and the notification is automatically canceled when the user clicks it
            ongoing:    ongoing, // Prevent clearing of notification (Android only)
        });
    },
    notificationsDismiss: function(noteId) {

    }
};

app.initialize();

$(document).ready(function() {
    //click link and load html page in content
    $("#leftpanel a").on("click", function(event) {
        event.preventDefault();
        var page = $(this).attr("data-page"),
            title = $(this).html(),
            pageID;

        //create switch statement
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
        }

        $("#leftpanel").panel("close");
        $(".ui-content #page-load").html("Loading...").load('http://castleclubcms.pixelbof.co.uk/api/cms2app/'+pageID, function(data) {
            $.each(data, function(i, item) {
                $(".ui-content #page-load").html(data[i].pageHtml);
            });
        });
        $(".header h1.main-title").html(title);
    });

    //radio controller
    var radio = document.getElementById("radio");
    var bufferStatus = false;
    radio.preload = "auto";

    if(bufferStatus != false) {
        radio.onplaying = function() {
            app.notifications("Currently Playing", "Castle Club Radio", true, true);
        };
    }

    $("#radio").on("play", function() {
        $(".radio-holder #status").html("Stream loading...").delay(7000).html("Stream Buffering...");

        setTimeout(function() {
            bufferStatus = true;
            
            $(".radio-holder #status").html("Stream Buffered!").delay(800).hide();
            app.notifications("Currently Playing", "Castle Club Radio", true, true);
        }, 15000);
            
    })
    
});