## Classes

<dl>
<dt><a href="#Message">Message</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#render">render()</a></dt>
<dd><p>Public method - create DOM-element for new message and add to the Chat.</p>
</dd>
<dt><a href="#_addChatElement_new">_addChatElement()()</a> ⇒ <code>object</code></dt>
<dd><p>Inner method - adding elements (messages) and return DOM-element.</p>
</dd>
<dt><a href="#_scrollElement(element)">_scrollElement(element)</a></dt>
<dd><p>Inner method - scrolls if the element is not visible.</p>
</dd>
<dt><a href="#addMessage(message)">addMessage(message)</a></dt>
<dd><p>Public method - adding new key and value to the data-object.</p>
</dd>
</dl>

<a name="Message"></a>

## Message
**Kind**: global class
<a name="new_Message_new"></a>

### new Message()
Class Message add messagees in Chat (DOM-element).

<a name="render"></a>

## render()
Public method - create DOM-element for new message and add to the Chat.

**Kind**: global function
<a name="_addChatElement_new"></a>

## _addChatElement()() ⇒ <code>object</code>
Inner method - adding elements (messages) and return DOM-element.

**Kind**: global function
**Returns**: <code>object</code> - - return DOM-element if one message or document fragment with chat's messages DOM-elements (if messages more than one).
<a name="_scrollElement(element)"></a>

## _scrollElement(element)
Inner method - scrolls if the element is not visible.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | the DOM-element of the Chat. |

<a name="addMessage(message)"></a>

## addMessage(message)
Public method - adding new key and value to the data-object.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| message | <code>object</code> | the objest contains user, time and message keys. |

