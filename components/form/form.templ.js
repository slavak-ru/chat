function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function formTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "C:\\Users\\God Father\\projects\\chat\\components\\form\\form.templ.pug";
pug_html = pug_html + "\u003Cform\u003E";
;pug_debug_line = 2;pug_debug_filename = "C:\\Users\\God Father\\projects\\chat\\components\\form\\form.templ.pug";
pug_html = pug_html + "\u003Clabel class=\"form__label\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "C:\\Users\\God Father\\projects\\chat\\components\\form\\form.templ.pug";
pug_html = pug_html + "\u003Cspan class=\"label__text\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "C:\\Users\\God Father\\projects\\chat\\components\\form\\form.templ.pug";
pug_html = pug_html + "Сообщение\u003C\u002Fspan\u003E";
;pug_debug_line = 4;pug_debug_filename = "C:\\Users\\God Father\\projects\\chat\\components\\form\\form.templ.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form__textarea\" rows=\"2\" cols=\"53\" data-tooltip=\"Введите сообщение\" name=\"message\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Flabel\u003E";
;pug_debug_line = 6;pug_debug_filename = "C:\\Users\\God Father\\projects\\chat\\components\\form\\form.templ.pug";
pug_html = pug_html + "\u003Cinput class=\"button button_form\" type=\"submit\" value=\"ОТПРАВИТЬ\" id=\"button\"\u002F\u003E";
;pug_debug_line = 7;pug_debug_filename = "C:\\Users\\God Father\\projects\\chat\\components\\form\\form.templ.pug";
pug_html = pug_html + "\u003Clabel class=\"form__label button__icon\" for=\"button\"\u003E\u003C\u002Flabel\u003E\u003C\u002Fform\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}