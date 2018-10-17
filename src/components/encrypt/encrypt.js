/**
 * @class Encrypt
 * @description Class Encrypt - creates hash for string (password / e-mail address / etc) using SHA1
 * */
export default class Encrypt {
  constructor() {
    this.chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode*/
    this.b64pad =
      ''; /* base-64 pad character. "=" for strict RFC compliance   */
  }

  /**
   * @method hashIt
   * @description Public method - creates hash for password using SHA1.
   * @param {string} str - the string to be encrypted
   * @return {string} encrypted string
   */
  hashIt(str) {
    let pass = str;
    let secPass = this._binb2b64(
      this._core_sha1(this._str2binb(pass), str.length * this.chrsz)
    );
    return secPass;
  }

  /**
   * @method _binb2b64
   * @description  Inner method - Convert an array of big-endian words to a base-64 string
   * @param {array} binarray - an array of big-endian words
   * @return {string} str - encrypted string
   */
  _binb2b64(binarray) {
    var tab =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var str = '';
    for (var i = 0; i < binarray.length * 4; i += 3) {
      var triplet =
        (((binarray[i >> 2] >> (8 * (3 - (i % 4)))) & 0xff) << 16) |
        (((binarray[(i + 1) >> 2] >> (8 * (3 - ((i + 1) % 4)))) & 0xff) << 8) |
        ((binarray[(i + 2) >> 2] >> (8 * (3 - ((i + 2) % 4)))) & 0xff);
      for (var j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > binarray.length * 32) str += this._b64pad;
        else str += tab.charAt((triplet >> (6 * (3 - j))) & 0x3f);
      }
    }
    return str;
  }

  /**
   * @method _core_sha1
   * @description  Calculate the SHA-1 of an array of big-endian words, and a bit length
   * @param {array} x - an array of big-endian words
   * @param {number} len - a bit length
   * @return {array} array with calculate the SHA-1
   */
  _core_sha1(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - (len % 32));
    x[(((len + 64) >> 9) << 4) + 15] = len;

    var w = Array(80);
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    let e = -1009589776;
    let max = x.length;

    for (let i = 0; i < max; i += 16) {
      let olda = a;
      let oldb = b;
      let oldc = c;
      let oldd = d;
      let olde = e;

      for (var j = 0; j < 80; j++) {
        if (j < 16) w[j] = x[i + j];
        else w[j] = this._rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
        var t = this._safe_add(
          this._safe_add(this._rol(a, 5), this._sha1_ft(j, b, c, d)),
          this._safe_add(this._safe_add(e, w[j]), this._sha1_kt(j))
        );
        e = d;
        d = c;
        c = this._rol(b, 30);
        b = a;
        a = t;
      }

      a = this._safe_add(a, olda);
      b = this._safe_add(b, oldb);
      c = this._safe_add(c, oldc);
      d = this._safe_add(d, oldd);
      e = this._safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
  }

  /**
   * @method _str2binb
   * @description  Convert an 8-bit or 16-bit string to an array of big-endian words In 8-bit function, characters >255 have their hi-byte silently ignored.
   * @param {string} str - an 8-bit or 16-bit string
   * @return {array} bin - array of big-endian words
   */
  _str2binb(str) {
    let bin = Array();
    let mask = (1 << this.chrsz) - 1;
    let max = str.length;

    for (let i = 0; i < max * this.chrsz; i += this.chrsz)
      bin[i >> 5] |=
        (str.charCodeAt(i / this.chrsz) & mask) << (32 - this.chrsz - (i % 32));
    return bin;
  }

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  /**
   * @method _safe_add
   * @description  Add integers, wrapping at 2^32. This uses 16-bit operations internally to work around bugs in some JS interpreters.
   */
  _safe_add(x, y) {
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  /**
   * @method _rol
   * @description  Bitwise rotate a 32-bit number to the left.
   * @param {number} num - a 32-bit number
   * @param {number} cnt - count
   * @return {number} number after rotated
   */
  _rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  /**
   * @method _sha1_ft
   * @description  Perform the appropriate triplet combination function for the current iteration.
   */
  _sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | (~b & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
  }

  /**
   * @method _sha1_kt
   * @description  Determine the appropriate additive constant for the current iteration.
   * @param {number} t - number the current iteration
   * @return {number} additive constant for the current iteration.
   */
  _sha1_kt(t) {
    return t < 20
      ? 1518500249
      : t < 40
        ? 1859775393
        : t < 60
          ? -1894007588
          : -899497514;
  }
}
