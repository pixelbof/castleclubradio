$(function() {

  // Initialize nativeDroid2

  $.nd2({
    stats : {
      analyticsUA: null // Your UA-Code for Example: 'UA-123456-78'
    },
    advertising : {
      active : false, // true | false
      path : "../../pages/fragments/adsense/", // Define where the Ad-Templates are: For example: "pages/fragments/adsense/"
      extension : null // Define the Ad-Template content Extension (Most case: ".html" or ".php")
    }
  });


});
