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
<dt><a href="#_hidePlaceholder">_hidePlaceholder(e)</a></dt>
<dd><p>Inner method - hides placeholder value (if value of the input is empty) and creates tooltip from placeholder value of the input element on focus event.</p>
</dd>
<dt><a href="#_showPlaceholder">_showPlaceholder(e)</a></dt>
<dd><p>Inner method - shows the value of the placeholder (if value of the input is empty) and removes tooltip on blur event.</p>
</dd>
<dt><a href="#_collectData">_collectData()</a> ⇒ <code>object</code></dt>
<dd><p>Inner method - collect-data from form-elements.</p>
</dd>
<dt><a href="#_setErrorClass(elem)">_setErrorClass(elem, tooltipContent)</a></dt>
<dd><p>Inner method - set Error class to the from form-elements if value is empty.</p>
</dd>
<dt><a href="#_removeErrorClass(elem)">_removeErrorClass(elem)</a></dt>
<dd><p>Inner method - remove Error class from the from form-elements if value isn&#39;t empty.</p>
</dd>
<dt><a href="#_checkMail(mail)">_checkMail(mail)</a> ⇒ <code>boolean</code></dt>
<dd><p>Inner method - to check the e-mail address.</p>
</dd>
<dt><a href="#_setMessageTime">_setMessageTime()</a> ⇒ <code>string</code></dt>
<dd><p>Inner method - return message&#39;s time.</p>
</dd>
<dt><a href="#onSubmit(message)">onSubmit()</a></dt>
<dd><p>Public method - recive function from app.js.</p>
</dd>
<dt><a href="#render">render(template)</a></dt>
<dd><p>Public method - create inners DOM-elements (inputs and submit button) in the Form.</p>
</dd>
<dt><a href="#_placeholdersRegister">_placeholdersRegister()</a></dt>
<dd><p>Inner method - registers all input elements in the form.</p>
</dd>
<dt><a href="#_observer">_observer()</a></dt>
<dd><p>Inner method - observing the parent element of the form, when the target element was remove - removes all tooltips.</p>
</dd>
<dt><a href="#_createTooltip">_createTooltip(group, elem, tooltipContent)</a></dt>
<dd><p>Inner method - creates tooltip.</p>
</dd>
<dt><a href="#_removeTooltip">_removeTooltip(group, elem)</a></dt>
<dd><p>Inner method - removes tooltip.</p>
</dd>
</dl>

<a name="Form"></a>

## Form
**Kind**: global class
<a name="new_Form_new"></a>

### new Form()
Class Form creates a Form from a template, controls pop-up tooltips on error and on placeholders, collects data from Form elements on the Submit event.

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

<a name="_hidePlaceholder"></a>

## _hidePlaceholder(e)
Inner method - hides placeholder value (if value of the input is empty) and creates tooltip from placeholder value of the input element on focus event.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | event object. |

<a name="_showPlaceholder"></a>

## _showPlaceholder(e)
Inner method - shows the value of the placeholder (if value of the input is empty) and removes tooltip on blur event.

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

## _setErrorClass(elem, tooltipContent)
Inner method - set Error class to the from form-elements if value is empty.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | element (input) without information. |
| tooltipContent | <code>string</code> | tooltip's content. |

<a name="_removeErrorClass(elem)"></a>

## _removeErrorClass(elem)
Inner method - remove Error class from the from form-elements if value isn't empty.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | target DOM element |

<a name="_checkMail(mail)"></a>

## _checkMail(mail) ⇒ <code>boolean</code>
Inner method - to check the e-mail address.

**Kind**: global function
**Returns**: <code>boolean</code> - return true if e-mail address is true and false if e-mail address wrong.

| Param | Type | Description |
| --- | --- | --- |
| mail | <code>string</code> | an e-mail addres for checking |

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

## render(template)
Public method - create inners DOM-elements (inputs and submit button) in the Form.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| template | <code>functon</code> | a template for rendering the form |

<a name="_placeholdersRegister"></a>

## _placeholdersRegister()
Inner method - registers all input elements in the form.

**Kind**: global function
<a name="_observer"></a>

## _observer()
Inner method - observing the parent element of the form, when the target element was remove - removes all tooltips.

**Kind**: global function
<a name="_createTooltip"></a>

## _createTooltip(group, elem, tooltipContent)
Inner method - creates tooltip.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| group | <code>string</code> | the name of the tooltip group |
| elem | <code>object</code> | the target element |
| tooltipContent | <code>string</code> | content for the tooltip |

<a name="_removeTooltip"></a>

## _removeTooltip(group, elem)
Inner method - removes tooltip.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| group | <code>string</code> | the name of the tooltip group |
| elem | <code>object</code> | the target element |