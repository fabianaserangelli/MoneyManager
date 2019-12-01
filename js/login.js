$('#login_button').on('click', (function(event) {
	let $email = $('#email')
	let $email_empty = $('#email-empty')
	let $password = $('#password')
	let $password_empty = $('#password-empty')
	let $credentials_incorrect = $('#credentials-incorrect')

	if($email.val() == '') {
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
		$password_empty.removeClass('hidden')
	} else {
		$password_empty.addClass('hidden')
	}

	if($password.val() != '' && $email.val() != '') {
		location.href = 'diary.html'
	}

	function validation_email(email) {
		var regexp_email = /\S+@\S+\.\S+/
		return regexp_email.test(email)
	}
}))