'use strict';

$(
  function () {
    var cookies = {};

    if (segmentAnalyticsKey)
      initSegment();

    // reference :
    // https://segment.com/docs/sources/website/analytics.js/quickstart/
    function initSegment() {
      // Create a queue, but don't obliterate an existing one!
      var analytics = window.analytics = window.analytics || [];

      // If the real analytics.js is already on the page return.
      if (analytics.initialize) return;

      // If the snippet was invoked already show an error.
      if (analytics.invoked) {
        if (window.console && console.error)
          console.error('Segment snippet included twice.');
        return;
      }

      // Invoked flag, to make sure the snippet
      // is never invoked twice.
      analytics.invoked = true;

      // A list of the methods in Analytics.js to stub.
      analytics.methods = [
        'trackSubmit',
        'trackClick',
        'trackLink',
        'trackForm',
        'pageview',
        'identify',
        'reset',
        'group',
        'track',
        'ready',
        'alias',
        'debug',
        'page',
        'once',
        'off',
        'on'
      ];

      // Define a factory to create stubs. These are placeholders
      // for methods in Analytics.js so that you never have to wait
      // for it to load to actually record data. The `method` is
      // stored as the first argument, so we can replay the data.
      analytics.factory = function (method) {
        return function () {
          var args = Array.prototype.slice.call(arguments);
          args.unshift(method);
          analytics.push(args);
          return analytics;
        };
      };

      // For each of our methods, generate a queueing stub.
      for (var i = 0; i < analytics.methods.length; i++) {
        var key = analytics.methods[i];
        analytics[key] = analytics.factory(key);
      }

      // Define a method to load Analytics.js from our CDN,
      // and that will be sure to only ever load it once.
      analytics.load = function (key) {
        // Create an async script element based on your key.
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = ('https:' === document.location.protocol
          ? 'https://' : 'http://')
          + 'cdn.segment.com/analytics.js/v1/'
          + key + '/analytics.min.js';

        // Insert our script next to the first script element.
        var first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);
      };

      // Add a version to keep track of what's in the wild.
      analytics.SNIPPET_VERSION = '4.0.0';

      // Load Analytics.js with your key, which will automatically
      // load the tools you've enabled for your account. Boosh!
      analytics.load(segmentAnalyticsKey);

      setupLinkTracking();
      // Make the first page call to load the integrations. If
      // you'd like to manually name or tag the page, edit or
      // move this call however you'd like.
      analytics.page();
    }

    // setup callbacks for tracking all the link clicks
    function setupLinkTracking() {
      // track all links with "a" tag and "analytics-track" class
      $('a.analytics-track').click(
        function (e) {
          var eventName = e.currentTarget.id;
          var message = {
            htmlClass: e.currentTarget.className,
            htmlId: e.currentTarget.id,
            target: e.target.href
          };
          var accountId = getCookie('shippableAccountId');
          var hubspotId = getCookie('shippableHubspotId');

          if (accountId)
            message.accountId = accountId;

          if (hubspotId)
            message.hubspotId = hubspotId;

          analytics.track(eventName, message);

          return true;  // returning false disables the click event
        }
      );
    }

    function getCookie(name) {
      if (cookies[name]) return cookies[name];

      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if (parts.length == 2)
        cookies[name] = parts.pop().split(';').shift();
      return cookies[name];
    }
  }
);
