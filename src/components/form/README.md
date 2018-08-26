## Classes

<dl>
<dt><a href="#Form">Form</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#_initEvents_new">_initEvents()()</a></dt>
<dd><p>Inner method - adding EventListener on Submit to the Form.</p>
</dd>
<dt><a href="#render_new">render()()</a></dt>
<dd><p>Public method - create inners DOM-elements (inputs and submit button) in the Form.</p>
</dd>
<dt><a href="#onSubmit(message)">onSubmit()</a></dt>
<dd><p>Public method - recive function from app.js.</p>
</dd>
<dt><a href="#_onSubmit(e)">_onSubmit()</a></dt>
<dd><p>Inner method - initial collect-data method on submit event.</p>
</dd>
<dt><a href="#_collectData_new">_collectData()()</a></dt>
<dd><p>Inner method - collect-data from form-elements.</p>
</dd>
<dt><a href="#_setMessageTime_new">_setMessageTime()()</a> ⇒ <code>string</code></dt>
<dd><p>Inner method - return message&#39;s time.</p>
</dd>
<dt><a href="#_setErrorClass(elem)">_setErrorClass()</a></dt>
<dd><p>Inner method - set Error class to the from form-elements if value is empty.</p>
</dd>
<dt><a href="#_removeErrorClass(elem)">_removeErrorClass()</a></dt>
<dd><p>Inner method - remove Error class from the from form-elements if value isn&#39;t empty.</p>
</dd>
</dl>

<a name="Form"></a>

## Form
**Kind**: global class
<a name="new_Form_new"></a>

### new Form(element, tooltip)
Class Form collect data from form-elements on Submint event.


| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | the Form (DOM-element). |
| tooltip | <code>class</code> | class Tooltip for create tooltips. |

<a name="_initEvents_new"></a>

## _initEvents()()
Inner method - adding EventListener on Submit to the Form.

**Kind**: global function
<a name="render_new"></a>

## render()()
Public method - create inners DOM-elements (inputs and submit button) in the Form.

**Kind**: global function
<a name="onSubmit(message)"></a>

## onSubmit()
Public method - recive function from app.js.

**Kind**: global function
<a name="_onSubmit(e)"></a>

## _onSubmit()
Inner method - initial collect-data method on submit event.

**Kind**: global function
<a name="_collectData_new"></a>

## _collectData()()
Inner method - collect-data from form-elements.

**Kind**: global function
<a name="_setMessageTime_new"></a>

## _setMessageTime()() ⇒ <code>string</code>
Inner method - return message's time.

**Kind**: global function
**Returns**: <code>string</code> - time of message (dd.mm.yy; hh:mm:ss).
<a name="_setErrorClass(elem)"></a>

## _setErrorClass()
Inner method - set Error class to the from form-elements if value is empty.

**Kind**: global function
<a name="_removeErrorClass(elem)"></a>

## _removeErrorClass()
Inner method - remove Error class from the from form-elements if value isn't empty.

**Kind**: global function