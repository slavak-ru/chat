## Classes

<dl>
<dt><a href="#Form">Form</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#_initEvents">_initEvents()</a></dt>
<dd><p>Inner method - adding EventListener on Submit to the Form.</p>
</dd>
<dt><a href="#_onSubmit(e)">_onSubmit(e)</a></dt>
<dd><p>Inner method - initial collect-data method on submit event.</p>
</dd>
<dt><a href="#_collectData">_collectData()</a> ⇒ <code>object</code></dt>
<dd><p>Inner method - collect-data from form-elements.</p>
</dd>
<dt><a href="#_setErrorClass(elem)">_setErrorClass(elem, tooltipName)</a></dt>
<dd><p>Inner method - set Error class to the from form-elements if value is empty.</p>
</dd>
<dt><a href="#_removeErrorClass(elem)">_removeErrorClass()</a></dt>
<dd><p>Inner method - remove Error class from the from form-elements if value isn&#39;t empty.</p>
</dd>
<dt><a href="#_checkMail(mail)">_checkMail()</a> ⇒ <code>boolean</code></dt>
<dd><p>Inner method - to check the e-mail address.</p>
</dd>
<dt><a href="#_setMessageTime">_setMessageTime()</a> ⇒ <code>string</code></dt>
<dd><p>Inner method - return message&#39;s time.</p>
</dd>
<dt><a href="#onSubmit(message)">onSubmit()</a></dt>
<dd><p>Public method - recive function from app.js.</p>
</dd>
<dt><a href="#render">render()</a></dt>
<dd><p>Public method - create inners DOM-elements (inputs and submit button) in the Form.</p>
</dd>
</dl>

<a name="Form"></a>

## Form
**Kind**: global class
<a name="new_Form_new"></a>

### new Form()
Class Form collect data from form-elements on Submint event.

<a name="_initEvents"></a>

## _initEvents()
Inner method - adding EventListener on Submit to the Form.

**Kind**: global function
<a name="_onSubmit(e)"></a>

## _onSubmit(e)
Inner method - initial collect-data method on submit event.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event object. |

<a name="_collectData"></a>

## _collectData() ⇒ <code>object</code>
Inner method - collect-data from form-elements.

**Kind**: global function
**Returns**: <code>object</code> - collectData - data for post to the database.
<a name="_setErrorClass(elem)"></a>

## _setErrorClass(elem, tooltipName)
Inner method - set Error class to the from form-elements if value is empty.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | element (input) without information. |
| tooltipName | <code>string</code> | tooltip name. |

<a name="_removeErrorClass(elem)"></a>

## _removeErrorClass()
Inner method - remove Error class from the from form-elements if value isn't empty.

**Kind**: global function
<a name="_checkMail(mail)"></a>

## _checkMail() ⇒ <code>boolean</code>
Inner method - to check the e-mail address.

**Kind**: global function
**Returns**: <code>boolean</code> - return true if e-mail address is true and false if e-mail address wrong.
<a name="_setMessageTime"></a>

## _setMessageTime() ⇒ <code>string</code>
Inner method - return message's time.

**Kind**: global function
**Returns**: <code>string</code> - time of message (dd.mm.yy; hh:mm:ss).
<a name="onSubmit(message)"></a>

## onSubmit()
Public method - recive function from app.js.

**Kind**: global function
<a name="render"></a>

## render()
Public method - create inners DOM-elements (inputs and submit button) in the Form.

**Kind**: global function