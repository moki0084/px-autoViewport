+ function () {
    var clearViewports = function () {
        var viewports = document.querySelectorAll('meta[name=viewport]';
          for (var i =0, len = viewports.length; i < len; i++) {
                viewports[i].remove();
            }
    }
    var getContent = function () {
        var width = 640;
        var content = 'width=' + width + ', user-scalable=no, target-densitydpi=device-dpi';
        if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
            var version = parseFloat(RegExp.$1);
            if (version > 2.3) {
                var phoneScale = parseInt(window.screen.width) / width;
                if (/MZ-M571C/.test(navigator.userAgent)) {
                    content = 'width=' + width + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale;
                } else if (/M571C/.test(navigator.userAgent)) {
                    content = 'width=' + width + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale;
                } else {
                    content = 'width=' + width + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi';
                }
            } else {
                content = 'width=' + width + ', user-scalable=no, target-densitydpi=device-dpi';
            }
        }
        return content

    }

    var setViewport = function () {
        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", getContent());
        meta.id = 'viewport';
        document.querySelector("head").appendChild(meta);
    }

    var resetViewport = function () {
        clearViewports();
        setViewport();
    }

    var init = function () {
        resetViewport();

        //挟持广告导致错位, 延迟重设多次,可能会闪屏
        if (location.protocol != 'https:') {
            if (!document.body) {
                setTimeout(resetViewport, 100)
            }
        }

        window.addEventListener('resize', resetViewport);
        window.addEventListener('pageshow', resetViewport);
    };

    init();
}();
