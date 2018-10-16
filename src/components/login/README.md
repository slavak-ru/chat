## Classes

<dl>
<dt><a href="#Login">Login</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#_initEvents_new">_initEvents()()</a></dt>
<dd><p>Inner method - adding EventListener, sets classes on the tab elements and show/hide password</p>
</dd>
<dt><a href="#_setTabsClass(elemOnClick)">_setTabsClass(elemOnClick)</a></dt>
<dd><p>Inner method - adding class to the tabs on loggin page.</p>
</dd>
<dt><a href="#_renderForm(template)">_renderForm(template)</a></dt>
<dd><p>Inner method - creating loggin form from template.</p>
</dd>
<dt><a href="#onLoginSubmit(data)">onLoginSubmit(data)</a></dt>
<dd><p>Public method - for behavior on submit login form</p>
</dd>
<dt><a href="#_onModalEvent">_onModalEvent()</a></dt>
<dd><p>Inner method - removing modal window.</p>
</dd>
<dt><a href="#onSubmit(message)">onSubmit(data)</a></dt>
<dd><p>Public method - for behavior login page on submit login form</p>
</dd>
<dt><a href="#initialStartLogin">initialStartLogin()</a></dt>
<dd><p>Public method - for initial start login page. Creates tabs of the login form.</p>
</dd>
</dl>

<a name="Login"></a>

## Login
**Kind**: global class
<a name="new_Login_new"></a>

### new Login()
Class Login creates the Login page from the template, creates forms (login,registration), collect data from form-elements on Submit
event and creates modal window if information isn't correct.

<a name="_initEvents_new"></a>

## _initEvents()
Inner method - adding EventListener, sets classes on the tab elements and show/hide password

**Kind**: global function
<a name="_setTabsClass(elemOnClick)"></a>

## _setTabsClass(elemOnClick)
Inner method - adding class to the tabs on loggin page.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| elemOnClick | <code>object</code> | the element of the DOM on which the click occurred. |

<a name="_renderForm(template)"></a>

## _renderForm(template)
Inner method - creating loggin form from template.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| template | <code>object</code> | template for creating loggin form. |

<a name="onLoginSubmit(data)"></a>

## onLoginSubmit(data)
Public method - for behavior on submit login form

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | data (user information) from login form. |

<a name="_onModalEvent"></a>

## _onModalEvent()
Inner method - removing modal window.

**Kind**: global function
<a name="onSubmit(message)"></a>

## onSubmit(data)
Public method - for behavior login page on submit login form

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | user name from login form. |

<a name="initialStartLogin"></a>

## initialStartLogin()
Public method - for initial start login page. Creates tabs of the login form.

**Kind**: global function