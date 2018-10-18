## Classes

<dl>
<dt><a href="#Encrypt">Encrypt</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#hashIt">hashIt(str)</a> ⇒ <code>string</code></dt>
<dd><p>Public method - creates hash for password using SHA1.</p>
</dd>
<dt><a href="#_binb2b64">_binb2b64(binarray)</a> ⇒ <code>string</code></dt>
<dd><p>Inner method - Convert an array of big-endian words to a base-64 string</p>
</dd>
<dt><a href="#_coreSha1">_coreSha1(x, len)</a> ⇒ <code>array</code></dt>
<dd><p>Calculate the SHA-1 of an array of big-endian words, and a bit length</p>
</dd>
<dt><a href="#_str2binb">_str2binb(str)</a> ⇒ <code>array</code></dt>
<dd><p>Convert an 8-bit or 16-bit string to an array of big-endian words In 8-bit function, characters &gt;255 have their hi-byte silently ignored.</p>
</dd>
<dt><a href="#_safeAdd">_safeAdd()</a></dt>
<dd><p>Add integers, wrapping at 2^32. This uses 16-bit operations internally to work around bugs in some JS interpreters.</p>
</dd>
<dt><a href="#_rol">_rol(num, cnt)</a> ⇒ <code>number</code></dt>
<dd><p>Bitwise rotate a 32-bit number to the left.</p>
</dd>
<dt><a href="#_sha1Ft">_sha1Ft()</a></dt>
<dd><p>Perform the appropriate triplet combination function for the current iteration.</p>
</dd>
<dt><a href="#_sha1_kt">_sha1_kt(t)</a> ⇒ <code>number</code></dt>
<dd><p>Determine the appropriate additive constant for the current iteration.</p>
</dd>
</dl>

<a name="Encrypt"></a>

## Encrypt
**Kind**: global class
<a name="new_Encrypt_new"></a>

### new Encrypt()
Class Encrypt - creates hash for string (password / e-mail address / etc) using SHA1

<a name="hashIt"></a>

## hashIt(str) ⇒ <code>string</code>
Public method - creates hash for password using SHA1.

**Kind**: global function
**Returns**: <code>string</code> - encrypted string

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | the string to be encrypted |

<a name="_binb2b64"></a>

## _binb2b64(binarray) ⇒ <code>string</code>
Inner method - Convert an array of big-endian words to a base-64 string

**Kind**: global function
**Returns**: <code>string</code> - str - encrypted string

| Param | Type | Description |
| --- | --- | --- |
| binarray | <code>array</code> | an array of big-endian words |

<a name="_coreSha1"></a>

## _coreSha1(x, len) ⇒ <code>array</code>
Calculate the SHA-1 of an array of big-endian words, and a bit length

**Kind**: global function
**Returns**: <code>array</code> - array with calculate the SHA-1

| Param | Type | Description |
| --- | --- | --- |
| x | <code>array</code> | an array of big-endian words |
| len | <code>number</code> | a bit length |

<a name="_str2binb"></a>

## _str2binb(str) ⇒ <code>array</code>
Convert an 8-bit or 16-bit string to an array of big-endian words In 8-bit function, characters >255 have their hi-byte silently ignored.

**Kind**: global function
**Returns**: <code>array</code> - bin - array of big-endian words

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | an 8-bit or 16-bit string |

<a name="_safeAdd"></a>

## _safeAdd()
Add integers, wrapping at 2^32. This uses 16-bit operations internally to work around bugs in some JS interpreters.

**Kind**: global function
<a name="_rol"></a>

## _rol(num, cnt) ⇒ <code>number</code>
Bitwise rotate a 32-bit number to the left.

**Kind**: global function
**Returns**: <code>number</code> - number after rotated

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | a 32-bit number |
| cnt | <code>number</code> | count |

<a name="_sha1Ft"></a>

## _sha1Ft()
Perform the appropriate triplet combination function for the current iteration.

**Kind**: global function
<a name="_sha1_kt"></a>

## _sha1_kt(t) ⇒ <code>number</code>
Determine the appropriate additive constant for the current iteration.

**Kind**: global function
**Returns**: <code>number</code> - additive constant for the current iteration.

| Param | Type | Description |
| --- | --- | --- |
| t | <code>number</code> | number the current iteration |