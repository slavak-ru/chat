'use strict';

function httpGet({url, type, data}) {
  url = url;
  type = type;
  data = data;

  return new Promise(function(resolve, reject){
    let req = new XMLHttpRequest();
    req.open(type, url, true);

    req.addEventListener('load', function(){
      if(this.status !== 200) {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
      resolve(this.response);
    });

    req.addEventListener('error', function(){
      reject(new Error("Network Error"));
    });

    (data && type === 'POST')? req.send(data) : req.send();

  });
}

/*
(function(){
  'use strict';

  class Xhr {
    constructor({url, type, data}) {
      this.url = url;
      this.type = type;
      this.data = data;

      this.httpGet = this._httpGet().bind(this);

      console.log(this.url, this.type);
    }

    _httpGet() {
      return new Promise(function(resolve, reject){
        
        console.log(`request ${this.type}`);
        let req = new XMLHttpRequest();
        req.open(this.type, this.url, true);

        req.addEventListener('load', function(){
          if(this.status !== 200) {
            let error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
          resolve(this.response);
        });

        req.addEventListener('error', function(){
          reject(new Error("Network Error"));
        });

        (this.data && this.type === 'POST')? req.send(this.data) : req.send();

      });
    }
  }

  window.Xhr = Xhr;
})();
*/

/*
let get = new Xhr({url: 'https://chat-2b2e7.firebaseio.com/chat.json', type: 'GET'});
get.httpGet()
  .then(
    response => {this.data = response; console.log(this.data)},
    error => console.log(`Rejected: ${error}`)
  );
*/  
/*      
      'https://chat-2b2e7.firebaseio.com/chat.json'
      'https://components-e2e6e.firebaseio.com/chat/messages/iketari.json'
*/


/*
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
*/