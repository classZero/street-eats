const userRegExp = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/
const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%_-]{2,}$/
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function testUsername(username){
	if (userRegExp.test(username) === true){
		console.log('valid username')
		return true
	}
}

export function testPassword(password){
	if (passRegExp.test(password) === true){
		console.log('valid password')
		return true
	}
}

export function testEmail(email){
	if(emailRegExp.test(email) === true){
		console.log('valid email')
		return true
	}
}