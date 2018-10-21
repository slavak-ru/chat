## Classes

<dl>
<dt><a href="#Router">Router</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#start">start()</a></dt>
<dd><p>Public method - is the address bar listener. If address had been change - launches the definite method for creates page</p>
</dd>
<dt><a href="#pagesRegistration">pagesRegistration()</a></dt>
<dd><p>Public method - page registration, creating the object with page-name, page-url, method for page and HTMLAnchorElement for page.</p>
</dd>
<dt><a href="#initEvents">initEvents(elem)</a></dt>
<dd><p>Public method - creating events for click (click on HTMLAnchorElement).</p>
</dd>
<dt><a href="#setCurrentPage">setCurrentPage(name)</a></dt>
<dd><p>Public method - sets current page name and push url-name in the window history.</p>
</dd>
<dt><a href="#getCurrentPage">getCurrentPage()</a> ⇒ <code>string</code></dt>
<dd><p>Public method - returns the name of the current page.</p>
</dd>
</dl>

<a name="Router"></a>

## Router
**Kind**: global class
<a name="new_Router_new"></a>

### new Router()
The Router class performs routing to the application pages.

<a name="start"></a>

## start()
Public method - is the address bar listener. If address had been change - launches the definite method for creates page

**Kind**: global function
<a name="pagesRegistration"></a>

## pagesRegistration()
Public method - page registration, creating the object with page-name, page-url, method for page and HTMLAnchorElement for page.

**Kind**: global function
<a name="initEvents"></a>

## initEvents(elem)
Public method - creating events for click (click on HTMLAnchorElement).

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>object</code> | target DOM element |

<a name="setCurrentPage"></a>

## setCurrentPage(name)
Public method - sets current page name and push url-name in the window history.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | current page name |

<a name="getCurrentPage"></a>

## getCurrentPage() ⇒ <code>string</code>
Public method - returns the name of the current page.

**Kind**: global function
**Returns**: <code>string</code> - - current page name