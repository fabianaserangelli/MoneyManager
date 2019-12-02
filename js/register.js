$('#signup_button').on('click', (function(event) {
	
	let $name = $('#name')
	let $name_empty = $('#name-empty')
	let $email = $('#email')
	let $email_empty = $('#email-empty')
	let $email2_empty = $('#email2-empty')
	let $password = $('#password')
	let $password_empty = $('#password-empty')
	let $password_confirm = $('#password-confirm')
	let $passwordconfirm1_empty = $('#passwordconfirm1-empty')
	let $passwordconfirm2_empty = $('#passwordconfirm2-empty')


	if($name.val() == '') {
		$name_empty.removeClass('hidden')
	} else {
		if(validation_name($name.val())) {
			$name_empty.addClass('hidden')
		} else {
			$name_empty.removeClass('hidden')
			$name_empty.text('Your name should only have letters')
		}
	}

	if($email.val() == '') {
		$email2_empty.addClass('hidden')
		$email_empty.removeClass('hidden')
	} else {
		if(validation_email($email.val())) {
			$email2_empty.addClass('hidden')
			$email_empty.addClass('hidden')
		} else {
			$email2_empty.addClass('hidden')
			$email_empty.removeClass('hidden')
			$email_empty.text('This email is not valid')
		}
	}

	if($password.val() == '') {
		$password_empty.removeClass('hidden')
	} else {
		$password_empty.addClass('hidden')
	}

	if($password_confirm.val() == '') {
		$passwordconfirm1_empty.removeClass('hidden')
	} else {
		$passwordconfirm1_empty.addClass('hidden')
	}

	if($password_confirm.val() != $password.val() && $password_confirm.val() != '') {
		$passwordconfirm2_empty.removeClass('hidden')
	} else {
		$passwordconfirm2_empty.addClass('hidden')
	}

	// INICIO DE BACK //

	json_to_send = {
	    "name": $name.val(),
	    "email": $email.val(),
	    "password" : $password.val()
  	}

  	//alert($name);

  	json_to_send = JSON.stringify(json_to_send);



  	$.ajax({
	    // url: 'http://localhost:3000/users',
	    url: 'https://miniwebserverrx.herokuapp.com/users',
	    headers: {
	        'Content-Type':'application/json'
	    },
	    method: 'POST',
	    dataType: 'json',
	    data: json_to_send,
	    success: function(data){
	      alert("Successfully created");
	      console.log('success: ' + data);
	      window.location = 'index.html'
	    },
	    error: function(error_msg) {
	    	if($email.val() != '') {
	    		$email2_empty.removeClass('hidden')
	    	}
	    }
  	})

	// // FIN DE BACK //

	function validation_email(email) {
		var regexp_email = /\S+@\S+\.\S+/
		return regexp_email.test(email)
	}

	function validation_name(name) {
		var regexp_name = /^[A-Za-z]/
		return regexp_name.test(name)
	}
}))
