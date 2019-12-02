$('#login_button').on('click', (function(event) {
	let $email = $('#email')
	let $email_empty = $('#email-empty')
	let $password = $('#password')
	let $password_empty = $('#password-empty')
	let $credentials_incorrect = $('#credentials-incorrect')

	if($email.val() == '') {
		$credentials_incorrect.addClass('hidden')
		$email_empty.removeClass('hidden')
	} else {
		if(validation_email($email.val())) {
			$email_empty.addClass('hidden')
		} else {
			$email_empty.removeClass('hidden')
			$email_empty.text('This email is not valid')
		}
	}

	if($password.val() == '') {
		$credentials_incorrect.addClass('hidden')
		$password_empty.removeClass('hidden')
	} else {
		$password_empty.addClass('hidden')
	}

	// INICIO BACK END //

	json_to_send = {
		"email": $email.val(),
		"password" : $password.val()
	}

	json_to_send = JSON.stringify(json_to_send)
	console.log(json_to_send)
	$.ajax({
		// url: 'http://localhost:3000/login',
		url: 'https://miniwebserverrx.herokuapp.com/login',
	    headers: {
	        'Content-Type':'application/json'
	    },
	    method: 'POST',
	    dataType: 'json',
	    data: json_to_send,
	    success: function(data){
	      // guardar token en localstorage o cookie
	      localStorage.setItem('token', data.token)
	      window.location = './diary.html'
    	},
    	error: function(error_msg) {
      		//alert((error_msg["responseText"]))
      		if($password.val() != '' && $email.val() != '') {
      			$credentials_incorrect.removeClass('hidden')
      		}
    	}
  	})

  	// FIN BACK END //

	function validation_email(email) {
		var regexp_email = /\S+@\S+\.\S+/
		return regexp_email.test(email)
	}
}))
