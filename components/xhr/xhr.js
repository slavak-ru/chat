(function(){
  'use strict';

  class Xhr {
    constructor({url}) {
      this.urs = url;
    }

    getData() {
      let req = new XMLHttpRequest();
      req.open('GET', 'https://chat-2b2e7.firebaseio.com/chat.json', true);
      
      req.addEventListener('readystatechange', event =>{
        if (req.readyState !== 4 ) return;
        
        this.respData = JSON.parse(req.responseText);
        
        return this.respData;
      })
      req.send();
    }

  }

  window.Xhr = Xhr;
})();
      
/*      
      'https://chat-2b2e7.firebaseio.com/chat/messages.json'
      'https://components-e2e6e.firebaseio.com/chat/messages/iketari.json'
*/