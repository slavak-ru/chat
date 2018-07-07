## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#_startChat_new">_startChat()()</a></dt>
<dd><p>Inner method - create initial Chat and Form DOM-elements and render them.</p>
</dd>
<dt><a href="#_createElement(option)">_createElement(option)</a> ⇒ <code>object</code></dt>
<dd><p>Inner method - create DOM-element and append element to the App.</p>
</dd>
<dt><a href="#onSubmit(message)">onSubmit(message)</a></dt>
<dd><p>Public method - adding new message in the Chat.</p>
</dd>
</dl>

<a name="App"></a>

## App
**Kind**: global class
<a name="new_App_new"></a>

### new App(element)
Class App - manages Form and Chat


| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | the App DOM-element. |

<a name="_startChat_new"></a>

## _startChat()()
Inner method - create initial Chat and Form DOM-elements and render them.

**Kind**: global function
<a name="_createElement(option)"></a>

## _createElement(option) ⇒ <code>object</code>
Inner method - create DOM-element and append element to the App.

**Kind**: global function
**Returns**: <code>object</code> - element - created element.

| Param | Type | Description |
| --- | --- | --- |
| option | <code>object</code> | contains TAG-name, ClassName and ID of the element. |

<a name="onSubmit(message)"></a>

## onSubmit(message)
Public method - adding new message in the Chat.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| message | <code>object</code> | contains user-name, message-content and message time-creation |