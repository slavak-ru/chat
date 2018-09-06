## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#_initialStartApp">_initialStartApp()</a></dt>
<dd><p>Inner method - create header of the App.</p>
</dd>
<dt><a href="#_getUrls">_getUrls()</a></dt>
<dd><p>Inner method - get the database URLs for messages and users from json file from server.</p>
</dd>
<dt><a href="#_renderAppTemplate">_renderAppTemplate()</a></dt>
<dd><p>Inner method - render App template (header).</p>
</dd>
<dt><a href="#_pagesRegistration">_pagesRegistration()</a></dt>
<dd><p>Inner method - page registration, creating the object with page-name, page-url, method for page and HTMLAnchorElement for
page.</p>
</dd>
<dt><a href="#_initEvents">_initEvents()</a></dt>
<dd><p>Inner method - creating events for click (click on HTMLAnchorElement); and events for the window resizing.</p>
</dd>
<dt><a href="#_startChat">_startChat()</a></dt>
<dd><p>Inner method - creating Chat page.</p>
</dd>
<dt><a href="#_setVh">_setVh()</a></dt>
<dd><p>Inner method - sets the VH size for window resizing and sets app content height.</p>
</dd>
<dt><a href="#onLoginSubmit(userName)">onLoginSubmit(userName)</a></dt>
<dd><p>Public method - which sets behavior Login page on submit event.</p>
</dd>
<dt><a href="#_startLogin">_startLogin()</a></dt>
<dd><p>Inner method - creating Login page.</p>
</dd>
</dl>

<a name="App"></a>

## App
**Kind**: global class
<a name="new_App_new"></a>

### new App()
Class App - manages Form and Chat

<a name="_initialStartApp"></a>

## _initialStartApp()
Inner method - create header of the App.

**Kind**: global function
<a name="_getUrls"></a>

## _getUrls()
Inner method - get the database URLs for messages and users from json file from server.

**Kind**: global function
<a name="_renderAppTemplate"></a>

## _renderAppTemplate()
Inner method - render App template (header).

**Kind**: global function
<a name="_pagesRegistration"></a>

## _pagesRegistration()
Inner method - page registration, creating the object with page-name, page-url, method for page and HTMLAnchorElement for page.

**Kind**: global function
<a name="_initEvents"></a>

## _initEvents()
Inner method - creating events for click (click on HTMLAnchorElement); and events for the window resizing.

**Kind**: global function
<a name="_startChat"></a>

## _startChat()
Inner method - creating Chat page.

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
Inner method - creating Login page.

**Kind**: global function