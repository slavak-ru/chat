'use strict';
(function(){
  'use strict';

  class NetworkService {
    constructor() {

    }

    httpReq({url, type, data}) {

      return new Promise((resolve, reject)=>{
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
    
        req.addEventListener('error', ()=>{
          reject(new Error("Network Error"));
        });

        (data && type === 'POST')? req.send(data) : req.send();
    
      });
    }
  }

  window.NetworkService = NetworkService;
})();

/*
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
*/
