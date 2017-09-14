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
const displayError = (errorMsg) => {
  $('.returnMessage').text(errorMsg).removeClass('d-none')
}
const subscribeSuccess = () => {
  const successMessage = 'Thank you for your subscribe, you\'ll be first to know.'
  $('.returnMessage').text(successMessage).removeClass('d-none')
  $('.subscribeField').hide()
}
const doSubscribe = (data) => {
  const apiUrl = 'http://localhost:5000/subscribe'
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    if (typeof data === "object") {
      //Error
      displayError(data.Message)
    } else {
      subscribeSuccess()
    }
  })
}
const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}