(function(){
  'use strict';

  class Users {
    constructor({usersUrl}) {

      this.networkService = this._networkService.bind(this);
      this.usersUrl = usersUrl;
      this.delay = 0;
      this.usersList;

      this.getUsers();

    }

    getUsers() {
      this.networkService({url: this.usersUrls, type: 'GET'})
      .then(response => {
        if (response === undefined) {
          let self = this;
      
          setTimeout(function requestUsers() {

            self.networkService({url: self.usersUrl, type: 'GET'})
              .then(response => {
                if(!response) setTimeout(requestUsers, self.delay);
                self.usersList = JSON.parse(response);
                return self.usersList;
              });
            }, this.delay);
        }
      }) 
    }


    checkUser(paramName, paramValue) {
     
      let isUser = Object.keys(this.usersList).some((obj) => {
              return this.usersList[obj][paramName] === paramValue; 

      });

      return isUser;

    } 

    setNewUser({data, usersUrls}) {
      console.log(data)
      let json = JSON.stringify(data);
      console.log(json)

      this.networkService({
                url: usersUrls, 
                type:'POST', 
                data: json})
                .then(()=> {

                  this.getUsers();
                
                });
    }


    /*
    data
    {user-name: "bob", e-mail: "bob@mail.ru", pass: "dfsdgs", time: "05.08.18, 18:35:46", formName: "forgot"}
    usersList
    {0: {…}, -LJ9ibB21cn_vncakOJU: {…}}
    0: {e-mail: "slavak.rus@gmail.com", pass: "12345", user-name: "slavak"}
    -LJ9ibB21cn_vncakOJU: {e-mail: "bob@mail.ru", formName: "sign", pass: "123", time: "05.08.18, 18:35:16", user-name: "bob"}

    */
    _networkService({url, type, data}) {
      return new NetworkService().httpReq({url, type, data})
        .then(
          response => response,
          error => console.log(`Rejected: ${error}`)
      )
    }

    outerMethod() {
      console.log('You should set outerMethod');
    }

    getUsersList(){
      return this.usersList;
    }


  }

  window.Users = Users;
})();