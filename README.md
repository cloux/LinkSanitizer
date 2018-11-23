## About

Link Sanitizer is a simple and efficient userscript for [Violentmonkey](https://violentmonkey.github.io) and [Greasemonkey](https://www.greasespot.net) browser addons. It will "sanitize" links on all webpages using a simple set of common rules. This includes removing trackers, link shims, and other bloated hyperlink redirects. In addition to this script, it is a good idea to use [Privacy Badger](https://www.eff.org/pb), who specializes on some nasty [Facebook](https://www.eff.org/deeplinks/2018/05/privacy-badger-rolls-out-new-ways-fight-facebook-tracking) and [Google](https://www.eff.org/deeplinks/2018/10/privacy-badger-now-fights-more-sneaky-google-tracking) deeplink trackers.

## Installation

1. Install [Violentmonkey](https://violentmonkey.github.io) or [Greasemonkey](https://www.greasespot.net) userscript manager addon in your browser.
2. Open [Link Sanitizer file](https://raw.githubusercontent.com/cloux/LinkSanitizer/master/linksanitizer.user.js). Your userscript manager should recognize and install it.

## Known Issues

### Userscripts and Content Security Policies

Userscripts won't work on websites implementing restrictive Content Security Policies (e.g. _addons.mozilla.org_, _github.com_, or _twitter.com_). Currently the only way to make ViolentMonkey or GreaseMonkey work on all sites is to disable the CSP protection, which is [generally **not recommended**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

The corresponding setting in [Firefox about:config](about:config) is:

    security.csp.enable = false

On Chrome, the CSP can be overridden by extensions [Content Security Policy Override](https://chrome.google.com/webstore/detail/content-security-policy-o/lhieoncdgamiiogcllfmboilhgoknmpi), [UnXSS](https://chrome.google.com/webstore/detail/unxss/cbjmpjkhiafmdnjnigdbelcnbihgpmge) or [Caspr Enforcer](https://chrome.google.com/webstore/detail/caspr-enforcer/fekcdjkhlbjngkimekikebfegbijjafd).

The development progress on this issue for Mozilla is [here](https://bugzilla.mozilla.org/show_bug.cgi?id=1267027), the discussion on Greasemonkey code is [here](https://github.com/greasemonkey/greasemonkey/issues/2046).

### Firefox addons on "superior" domains

Mozilla decided that Firefox simply disables addons for domains which are regarded as superior to user and his freedom. These domains are unsurprisingly owned by Mozilla. To get rid of this nasty "superior domain list" and enable addons everywhere, set in [about:config](about:config):

    extensions.webextensions.restrictedDomains = ""

### Firefox and AddonManagerAPI on addons.mozilla.org

Addons are also disabled for the _addons.mozilla.org_ domain, which can access the hidden AddonManagerWebAPI exposed by Firefox. This Firefox behavior is [hardcoded](https://dxr.mozilla.org/mozilla-central/source/toolkit/mozapps/extensions/AddonManagerWebAPI.cpp). To make userscripts work on addons.mozilla.org, first turn off Firefox and then add into the _~/.mozilla/firefox/PROFILE.default/prefs.js_ file:

    user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);

NOTE: Your path to the _prefs.js_ might differ. See [mozillazine article](http://kb.mozillazine.org/Prefs.js_file) or [dev docs](https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/A_brief_guide_to_Mozilla_preferences) on editing user preferences.

NOTE: This setting is hidden and not available in about:config, it has to be added into the _prefs.js_ manually.

NOTE: You will be able to install plugins as usual, but the _addons.mozilla.org_ website will not be able to see which addons are already installed or otherwise manipulate them.

### Compatibility

Tested with [Violentmonkey](https://violentmonkey.github.io) and [Greasemonkey](https://www.greasespot.net) on Firefox 60,61,63 and Chromium 70. Tampermonkey was not tested due to it's cumbersome legal status, see [https://tampermonkey.net/eula.php](https://tampermonkey.net/eula.php).

## Author

This userscript is maintained by _cloux@rote.ch_

## License

This work is free. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as published here: http://www.wtfpl.net/about.

---
