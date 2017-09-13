$(document).ready(() => {
  $('#subscribe').click(subscribe)
  $('#subscribe-email').keypress((e) => {
    (e.which === 13) && subscribe()
  })
})
const subscribe = () => {
  const name = $('#subscribe-name').val()
  const email = $('#subscribe-email').val()
  !validateEmail(email) && $('.errorMsg').removeClass('d-none')
  validateEmail(email) && ( $('.errorMsg').addClass('d-none') && doSubscribe({name: name, email: email}) )
}
const doSubscribe = (data) => {
  const apiUrl = 'https://us5.api.mailchimp.com/3.0/lists/3c74ae0db6/members/'
  const token = 'ac72fc6a76d41ee66a69760e64e180f1-us5'
  let headers = new Headers({
    'Authorization': 'Basic '+token,
    'Content-Type': 'application/json'
  })
  const request = new Request(apiUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: headers,
    body: JSON.stringify({
      'email_address': data.email,
      'status': 'subscribed',
      'merge_fields': {
        'FNAME': data.name
      }
    })
  })

  fetch(request)
  .then((res) => {
    console.log(res)
    return res.json()
  })
  .then((data) => {
    alert(JSON.stringify( data ))
  })
}
const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}