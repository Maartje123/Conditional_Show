/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */

/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('Mashup Components.qvf', config);

	//get objects -- inserted here --
	app.getObject('CurrentSelections','CurrentSelections');
	app.getObject('SalesOrderTable','HUTPvv');
	app.getObject('LB_Customer','RBrVb');
	
	//create cubes and lists -- inserted here --
 		
	app.getList("SelectionObject", function(reply) { // First check if there are changes in a selection
				app.variable.getContent("vCountCustomers", function (reply) { // Then get the value of a variable
				   CustomerCount = Number(reply.qContent.qString);
					 console.log(CustomerCount);
					 qlik.resize();
					 // app.getList("SelectionObject", function(reply) {    }

					 			if(CustomerCount == 1) {
					 					$('#CustomerDiv').show();
										
					 			}
					 			else if(CustomerCount != 1)
					 			{
					 					$('#CustomerDiv').hide();
										
					 			}
					});
		});

			//Clear all
			$("#ClearAll").click(function() {
					app.clearAll();
				});

}

);

