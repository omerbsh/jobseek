/*
Omerbsh.com - Created by Omer Ben Shushan
*/

/*
* Tone selection from UL list.
*/
$( document ).ready(function() {
	var app_text;
	var application_tone;
	var default_tone = "Professional";

	var employerName, employerCompany, employerEmail;

	$( "#main-menu li" ).click(function() {
		$(this).addClass( "active" ).siblings().removeClass( "active" );
		application_tone = $(this).text();
		//Get letter from TXT files.
		$.get( "applications/" + application_tone + ".txt" , function( data ) {
			app_text = data;
		});
	});

	$( "#create" ).click(function() {
		if(application_tone === undefined) {
			$( ".popup-text" ).html("<span style='color:red;'>Please select tone for your letter.</span>");
			$("#myModal").modal({show: true});
		}
		else {
			$("#send_mail").show();
		}

		//get form data
		employerName 	= $( "#employer-name" ).val();
		employerCompany = $( "#employer-company" ).val();
		employerEmail 	= $( "#employer-email" ).val();
		//replace all vars by user values
		app_text = app_text.replace( "{{employer_name}}", 	employerName);
		app_text = app_text.replace( "{{employer_company}}", employerCompany);
		app_text = app_text.replace( "{{employer_email}}", 	employerEmail);

		$( "#result" ).text( app_text );
	});

	$( "#send_mail" ).click(function() {
		//send mail by post
		$.post( "sendMail.php", { 
			email: employerEmail, 
			company: employerCompany,
		 	content: mailContent 
		 });
		//alert success
	});
});