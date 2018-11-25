// ==UserScript==
// @name         Link Sanitizer
// @description  Clean up unnecessary hyperlink redirections and link shims
// @version      1.0.2
// @author       cloux <cloux@rote.ch>
// @license      WTFPL 2.0; http://www.wtfpl.net/about/
// @namespace    https://github.com/cloux
// @homepage     https://github.com/cloux/LinkSanitizer
// @supportURL   https://github.com/cloux/LinkSanitizer
// @updateURL    https://raw.githubusercontent.com/cloux/LinkSanitizer/master/linksanitizer.user.js 
// @icon         http://icons.iconarchive.com/icons/designbolts/seo/128/Natural-Link-icon.png
// @include      *
// @run-at       document-start
// ==/UserScript==

(function() {
	// Limit contentType to "text/plain" or "text/html"
	if ((document.contentType != undefined) && (document.contentType != "text/plain") && (document.contentType != "text/html")) {
		console.log("Hyperlink Sanitizer - Not loading for content type " + document.contentType);
		return;
	}
	//console.log("Hyperlink Sanitizer - Loaded");

	// sanitize single link
	function sanitize(weblink) {
		if (weblink.length == 0) {
			return "";
		}
		//console.log("Sanitizer found link: " + weblink);
		// is this a wrapped hyperlink?
		if (/^http.*https?(%3A|:)/.test(weblink) == false) {
			return weblink;
		}
		// whitelisted services
		if (/google\.[a-z]*\/ServiceLogin/.test(weblink) ||                      // google login service
		    /^http.*(login|registration)[/?].*http/.test(weblink) ||             // heise.de
		    /\/signin\?openid/.test(weblink) ||                                  // amazon.com
		    /^https?:\/\/[a-z.]*archive\.org\//.test(weblink) ||                 // archive.org
		    /^https?:\/\/(www\.)?facebook\.com\/sharer/.test(weblink) ||         // share on FB
		    /^https?:\/\/(www\.)?linkedin\.com\/share/.test(weblink) ||          // share on linkedin
		    /^https?:\/\/(www\.)?twitter\.com\/intent\/tweet/.test(weblink) ||   // tweet link
		    /^https?:\/\/(www\.)?pinterest\.com\/pin\/create\//.test(weblink)) { // pinterest post
			return weblink;
		}
		console.log("Hyperlink: " + weblink);
		var strnew = weblink.replace(/http.*(https?(%3A|:)[^\\&]*).*/, '$1');
		strnew = strnew.replace(/%23/g, '#');
		strnew = strnew.replace(/%26/g, '&');
		strnew = strnew.replace(/%2F/g, '/');
		strnew = strnew.replace(/%3A/g, ':');
		strnew = strnew.replace(/%3D/g, '=');
		strnew = strnew.replace(/%3F/g, '?');
		// NOTE: %25 must be translated last
		strnew = strnew.replace(/%25/g, '%');
		console.log("SANITIZED: " + strnew);
		return strnew;
	}

	// MutationObserver callback
	function callback() {
		// Query for elements
		hyperlinks = window.document.getElementsByTagName('a');	
		for (var i = 0; i < hyperlinks.length; i++) {
			// Make sure the callback isn't invoked with the same element more than once
			if (!hyperlinks[i].sanitized) {
				hyperlinks[i].sanitized = true;
				// Sanitize hyperlink
				hyperlinks[i].href = sanitize(hyperlinks[i].href);
			}
		}
	}
	// Create an observer instance linked to the callback function
	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var observer = new MutationObserver(callback);
	// Start observing the target node for configured mutations
	observer.observe(window.document.documentElement, { childList: true, subtree: true });
	// Ensure script execution for every element on every page refresh
	window.onload = callback();

})();
