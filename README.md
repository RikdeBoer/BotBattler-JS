
  # BotBattler-JS  
  *Invisible early-detection clientside spam protection for forms*  
 
  BotBattler-JS is an effective, lightweight (1.4k in size), anti-spam solution
  for forms. It requires no thrid-party site or API. As this is a 100%
  clientside solution, it detects spam the moment the submit button is
  pressed, without the spammy data travelling across the Internet, thus 
  preventing unnecessary load on your server.

  ## Description
  Similar to its more established cousin, honeypot, BotBattler-JS is a 
  non-intrusive approach to prevent forms on your website from being abused by
  bots aiming to spam your server with inappropriate comments, like advertising,
  as well as malicious registration or login attempts.
  
  To use BotBattler-JS on a form on your website, drop the file botbattler.min.js
  in the root (or some subdirectory) of your website. Then insert the code below 
  before the closing body tag on the page that has the form you wish to protect.
 
    <script src="botbattler.min.js"></script>
    <script>
      document.addEventListener('readystatechange', _ => {
        if (document.readyState == 'complete') botbattler('fileOrPathToPostTo') 
      })
    </script>
 
  Replace fileOrPathToPostTo by the value you see in your form tag for the 
  "action" attribute, e.g. "contact.php". Then set the action attribute to
  "//nowhere".
  BotBattler will auto-replace this action attribute a few seconds after the
  page is loaded. However, if JavaScript is switched off this won't occur and
  the server will not receive any form data.
 
  Unlike CAPTCHA-type solutions, BotBattler-JS, like honeypot, works "under the 
  wraps" and does not affect the form workflow or user exerience in any way.
  This combined with the fact that BotBattler-JS is a 100% clientside solution
  that is easy to implement on your site, makes it a great first line of
  defence - in fact, it may be the only defence you'll need.
 
  **How does it work?**  
  BotBattler employs a number of strategies.

  First, it operates 100% clientside (i.e. via Javascript). This means that BotBattler doesn't require the spammy data to first make a trip to your server (or a third-party API) before the attack can be detected.

  BotBattler adds an extra field to your forms that is invisible to humans. Bots, unaware that the field is hidden, are tempted to fill out most fields on the form, including the hidden field. This then traps the bots into detection. This technique is similar to the honeypot approach. What's different though is that BotBattler doesn't check for the field to be empty. Rather it insists the field has a <em>specific</em> value. This then allows the field to be marked as <em>required</em>, forming an extra temptation for a bot to populate the field, and seal its fate, as without a required value the form will refuse to be submitted!
The specific value is a random non-guessable, non-reusable number that is different every time the page is served.
 
  A final strategy used in conjunction with the above is measuring, clientside, how many seconds pass between the time the page was loaded and the time the form was submitted. If the form was populated in, say, less than 5 seconds (configurable), it was most likely a bot at work -- or a person entering rubbish quickly, which  we're also happy to block!
 
  ## FAQs
  **What if the bot "browser"/robot software has JavaScript disabled?**   
  With BotBattler-JS the server destination is initially NOT on the form. It
  gets set after a few seconds, or, when JavaScript is switched off, not at all.
  Therefore if JavaScript is turned off, form submission will go nowhere.
  You may want to put a noscript tag in head or body (preferred) of your page:

    <noscript><p><em>
      Javascript is disabled on this page. You must enable Javascript to submit the form.
    </em></p></noscript>
    
  **Can I use BotBattler-JS in combination with other spam blockers?**  
  Yes you can. Be aware that most spam blockers operate on the serverside,
  whereas BotBattler-JS is a clientside solution. This means that when 
  BotBattler-JS traps a bot, the server and therefore any serverside spam 
  blockers will never know about it and will have no work to do.
  Just listen to the sound of silence!
  
  **Console error**  
  In the Chrome and Safari browsers you may see a message like this in the 
  console:  
  
  *"An invalid form control with name='botbattler-name' is not focusable."*   
  
  You can safely ignore this message.
  
  **Multiple forms on the same page**   
  You need one botbattler() call for each form on the page.
  For 2nd, 3rd ... forms you need to specify not only the first argument, 
  the action, but also the remaining two arguments, minElapsedSecs (integer
  or float) and formId (string). Here's an example:
 
    <script src="js/botbattler.min.js"></script>
    <script>
      document.addEventListener('readystatechange', _ => {
        if (document.readyState == 'complete') {
          botbattler('contact.php')
          botbattler('register.php', 4, 'registration-form')
          botbattler('/login', 4, 'login-form')
        }
      })
    </script>
