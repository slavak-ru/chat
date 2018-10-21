## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#_methodBinding(args)">_methodBinding()</a> ⇒ <code>object</code></dt>
<dd><p>Inner method - for binding of the methods around this.</p>
</dd>
<dt><a href="#_initialStartApp">_initialStartApp()</a></dt>
<dd><p>Inner method - creates the header of the App, start Router and start Chat</p>
</dd>
<dt><a href="#_getUrls">_getUrls()</a></dt>
<dd><p>Inner method - get the database URLs for messages and users from json file from server.</p>
</dd>
<dt><a href="#_renderAppTemplate">_renderAppTemplate()</a></dt>
<dd><p>Inner method - render App template (header).</p>
</dd>
<dt><a href="#_initEvents">_initEvents()</a></dt>
<dd><p>Inner method - creating events for click (click on HTMLAnchorElement); and events for the window resizing.</p>
</dd>
<dt><a href="#_language">_language(e)</a></dt>
<dd><p>Inner method - switches the languages in the application  and reloads the content.</p>
</dd>
<dt><a href="#_startChat">_startChat()</a></dt>
<dd><p>Inner method - creating the Chat page and initializing the Chat.</p>
</dd>
<dt><a href="#_isCurrentUser">_isCurrentUser()</a></dt>
<dd><p>Inner method - to check the user&#39;s login and replace the language switch with the user name.</p>
</dd>
<dt><a href="#_setVh">_setVh()</a></dt>
<dd><p>Inner method - sets the VH size for window resizing and sets app content height.</p>
</dd>
<dt><a href="#onLoginSubmit(userName)">onLoginSubmit(userName)</a></dt>
<dd><p>Public method - which sets behavior Login page on submit event.</p>
</dd>
<dt><a href="#_startLogin">_startLogin()</a></dt>
<dd><p>Inner method - creating Login and initializing the Logins methods.</p>
</dd>
<dt><a href="#_getIP">_getIP()</a></dt>
<dd><p>Inner method - for define user IP and sets it in session Storage.</p>
</dd>
</dl>

<a name="App"></a>

## App
**Kind**: global class
<a name="new_App_new"></a>

### new App()
Class App - manages Form and Chat of the application

<a name="_methodBinding(args)"></a>

## _methodBinding() ⇒ <code>object</code>
Inner method - for binding of the methods around this.

**Kind**: global function
**Returns**: <code>object</code> - method -  method binded around App class.

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>object</code> | array of the arguments. Each argument is a method. |

<a name="_initialStartApp"></a>

## _initialStartApp()
Inner method - creates the header of the App, start Router and start Chat

**Kind**: global function
<a name="_getUrls"></a>

## _getUrls()
Inner method - get the database URLs for messages and users from json file from server.

**Kind**: global function
<a name="_renderAppTemplate"></a>

## _renderAppTemplate()
Inner method - render App template (header).

**Kind**: global function
<a name="_initEvents"></a>

## _initEvents()
Inner method - creating events for click (click on HTMLAnchorElement); and events for the window resizing.

**Kind**: global function
<a name="_language"></a>

## _language(e)
Inner method - switches the languages in the application  and reloads the content.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event on click. |

<a name="_startChat"></a>

## _startChat()
Inner method - creating the Chat page and initializing the Chat.

**Kind**: global function
<a name="_isCurrentUser"></a>

## _isCurrentUser()
Inner method - to check the user's login and replace the language switch with the user name.

**Kind**: global function
<a name="_setVh"></a>

## _setVh()
Inner method - sets the VH size for window resizing and sets app content height.

**Kind**: global function
<a name="onLoginSubmit(userName)"></a>

## onLoginSubmit(userName)
Public method - which sets behavior Login page on submit event.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| userName | <code>object</code> | the current user name. |

<a name="_startLogin"></a>

## _startLogin()
Inner method - creating Login and initializing the Logins methods.

**Kind**: global function
<a name="_getIP"></a>

## _getIP()
Inner method - for define user IP and sets it in session Storage.

**Kind**: global function