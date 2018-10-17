## Classes

<dl>
<dt><a href="#Chat">Chat</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#initialStartChat">initialStartChat()</a></dt>
<dd><p>Public method - creates chat page from template and retrieves messages from the database.</p>
</dd>
<dt><a href="#_startChat">_startChat()</a></dt>
<dd><p>Inner method - create initial Chat and Form DOM-elements.</p>
</dd>
<dt><a href="#_updateMessages">_updateMessages()</a></dt>
<dd><p>Inner method - updates messages from databse every time set by delay.</p>
</dd>
<dt><a href="#_render(user)">_render(user)</a></dt>
<dd><p>Inner method - render Chat and Form DOM-elements.</p>
</dd>
<dt><a href="#onSubmit(message)">onSubmit(message)</a></dt>
<dd><p>Public method - adding new message in the Chat.</p>
</dd>
</dl>

<a name="Chat"></a>

## Chat
**Kind**: global class
<a name="new_Chat_new"></a>

### new Chat()
Class Chat - creating Chat page content and manages Chat and Form

<a name="initialStartChat"></a>

## initialStartChat()
Public method - creates chat page from template and retrieves messages from the database.

**Kind**: global function
<a name="_startChat"></a>

## _startChat()
Inner method - create initial Chat and Form DOM-elements.

**Kind**: global function
<a name="_updateMessages"></a>

## _updateMessages()
Inner method - updates messages from databse every time set by delay.

**Kind**: global function
<a name="_render(user)"></a>

## _render(user)
Inner method - render Chat and Form DOM-elements.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| user | <code>string</code> | the name of the current user, if any user is logged in - displays the form element. |