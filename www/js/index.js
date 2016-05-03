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
        this.bindEvents();
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
        //device ready
        //app.notifications("Welcome to castle club radio", "Live from Ayia Napa!", true, true);

        $( document ).on( "pagecreate", "#demo-page", function() {
            $( document ).on( "swipeleft", "#demo-page", function( e ) {
                // We check if there is no open panel on the page because otherwise
                // a swipe to close the left panel would also open the right panel (and v.v.).
                // We do this by checking the data that the framework stores on the page element (panel: open).
                if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
                    if ( e.type === "swiperight" ) {
                        $( "#left-panel" ).panel( "open" );
                    } else if (e.type === "swipeleft") {
                        $( "#left-panel" ).panel( "close" );
                    }
                }
            });
        });
    },
    notifications: function(message, title, autoCancel, ongoing) {
        window.plugin.notification.local.add({
            id:         "CastleClubRadio",  // A unique id of the notifiction
            message:    message,  // The message that is displayed
            title:      title,  // The title of the message
            badge:      1,  // Displays number badge to notification
            autoCancel: autoCancel, // Setting this flag and the notification is automatically canceled when the user clicks it
            ongoing:    ongoing, // Prevent clearing of notification (Android only)
        });
    }
};

app.initialize();