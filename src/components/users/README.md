## Classes

<dl>
<dt><a href="#Users">Users</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getUsers">getUsers()</a> ⇒ <code>object</code></dt>
<dd><p>Public method - for get users information from database.</p>
</dd>
<dt><a href="#_makeRequest(options)">_makeRequest(url, method, data)</a> ⇒ <code>object</code></dt>
<dd><p>Inner method - for get users information from database.</p>
</dd>
<dt><a href="#checkUser(userData)">checkUser(userData)</a> ⇒ <code>boolean</code></dt>
<dd><p>Public method - checks users information.</p>
</dd>
<dt><a href="#setNewUser(options)">setNewUser(data, usersUrl)</a></dt>
<dd><p>Public method - publish in database information of the new user.</p>
</dd>
<dt><a href="#changePassword(options)">changePassword(data, usersUrl)</a></dt>
<dd><p>Public method - for change user&#39;s password.</p>
</dd>
<dt><a href="#getUsersList">getUsersList()</a> ⇒ <code>object</code></dt>
<dd><p>Public method - for recive users informtion.</p>
</dd>
</dl>

<a name="Users"></a>

## Users
**Kind**: global class
<a name="new_Users_new"></a>

### new Users(usersUrl, networkService)
Class Users - gets, checks and put users information.


| Param | Type | Description |
| --- | --- | --- |
| usersUrl | <code>string</code> | URL for get, or put users information. |
| networkService | <code>class</code> | class for network. |

<a name="getUsers"></a>

## getUsers() ⇒ <code>object</code>
Public method - for get users information from database.

**Kind**: global function
**Returns**: <code>object</code> - return object with users informations.
<a name="_makeRequest(options)"></a>

## _makeRequest(url, method, data) ⇒ <code>object</code>
Inner method - for get users information from database.

**Kind**: global function
**Returns**: <code>object</code> - return object with users informations.

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL. |
| method | <code>string</code> | request method. |
| data | <code>object</code> | data for publishing in the database. |

<a name="checkUser(userData)"></a>

## checkUser(userData) ⇒ <code>boolean</code>
Public method - checks users information.

**Kind**: global function
**Returns**: <code>boolean</code> - return true if user information is correct, or false.

| Param | Type | Description |
| --- | --- | --- |
| userData | <code>object</code> | user information for check. |

<a name="setNewUser(options)"></a>

## setNewUser(data, usersUrl)
Public method - publish in database information of the new user.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | user information for publish. |
| usersUrl | <code>string</code> | URL for publish. |

<a name="changePassword(options)"></a>

## changePassword(data, usersUrl)
Public method - for change user's password.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | user information for publish. |
| usersUrl | <code>string</code> | URL for publish. |

<a name="getUsersList"></a>

## getUsersList() ⇒ <code>object</code>
Public method - for recive users informtion.

**Kind**: global function
**Returns**: <code>object</code> - return users information.