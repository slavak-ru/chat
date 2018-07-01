'use strict';
/** @description app.js - is a control module, create and manage all components of the Chat*/
let chat = new Chat(document.getElementById('chat'));
let form = new Form(document.getElementById('form'));

chat.render();
form.render();

let textarea = new Textarea(document.querySelector('textarea[name="message"]'));

form.onSubmit = (message) => {
  let tooltip = {};
  
  if (!message.user || !message.message ) {
    let errors = document.querySelectorAll('.error');
    errors.forEach((elem)=>{
      tooltip[elem] = new Tooltip(elem);
      tooltip[elem].createTooltip();
    });
    return;
  }

  let tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach((elem)=> document.body.removeChild(elem) )

  chat.addMessage(message);
  chat.render();
  form.render();
}