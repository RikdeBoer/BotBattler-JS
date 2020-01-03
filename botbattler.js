/*
 * 2020 Rik de Boer, Melbourne, Australia.
 */
function botbattler(action = '', minElapsedSecs = 4.0, formId = '') {

  const BOTBATTLER_SECRET = Math.random() // or Date.now() if you prefer
  const ACTION_SINK = 'nowhere'

  var form = formId
    ? document.getElementById(formId)
    : document.getElementsByTagName('form')[0]

  if (!form) {
    console.error('BotBattler: form not found. Cannot set up bot trap.')
    return
  }
  const formAction = form.getAttribute('action') || ''
  // Note: form action may have query string appended
  if (formAction.indexOf(ACTION_SINK) < 0) {
    console.log(`BotBattler: form ${form.id} has a (default) action. Therefore the form is not protected when an attacking bot has JavaScript turned off.\nPlease change the action value on the form to "nowhere" and pass the orignal value as the first argument to the botbattler() call. If you wish to post to the same page you may use "" for the first argument.`)
  }

  /* Create a honeypot-style input field. Make it required to tempt the bot
   * even more to enter a value. This will lead to its downfall.
   *
   *   <div style="display:none !important">
   *     <label for="botinput-###">Name</label>
   *     <input type="text" name="botbattler-name" id="botinput-###" required>
   *   </div>
   */
  let botDiv = document.createElement('div')
  botDiv.style.display = 'none' // how to add !important ?
  let botLabel = document.createElement('label')
  botLabel.innerHTML = 'Name'
  botLabel.setAttribute('for', 'botinput-' + form.id)
  let botInput = document.createElement('input')
  botInput.id = botLabel.getAttribute('for')
  botInput.name = 'botbattler-name'
  botInput.required = true

  botDiv.appendChild(botLabel)
  botDiv.appendChild(botInput)
  form.appendChild(botDiv)

  setTimeout( _ => {
    if (formAction.indexOf(ACTION_SINK) >= 0) {
      form.setAttribute('action', action)
    }
    if (!botInput.value) {
      // Set a value as it is a required field. Test on submit.
      botInput.value = BOTBATTLER_SECRET
    }
    // else the bot has filled it out. It will be caught on submit.
  }, minElapsedSecs * 1000)

  // Find <input> or <button> elements that may submit the form.
  const submitButtons = form.querySelectorAll('[type=submit]');
  for (let i = 0; i < submitButtons.length; i++) {
    submitButtons[i].addEventListener('click', event => {
      if (form.getAttribute('action').indexOf(ACTION_SINK) >= 0) {
        event.preventDefault() // Cancels submission
        alert('Form not ready yet. Please wait a second and try again.')
      }
    })
  }

  form.addEventListener('submit', event => {
    if (BOTBATTLER_SECRET != botInput.value) {
      event.preventDefault() // Cancels submission
    }
  })

}
