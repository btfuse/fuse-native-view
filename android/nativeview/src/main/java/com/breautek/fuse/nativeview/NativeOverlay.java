package com.breautek.fuse.nativeview;

import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;

import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import com.breautek.fuse.FuseContext;

import java.io.File;

public class NativeOverlay {
    private final View $view;

    public NativeOverlay(IOverlayBuilder builder) {
        $view = builder.build();
    }

    public View getView() {
        return $view;
    }

    public static interface IOverlayBuilder {
        View build();
    }

    public static class WebviewBuilder implements IOverlayBuilder {
        private final FuseContext $context;

        private String $html;
        private String $file;

        public WebviewBuilder(FuseContext context) {
            $context = context;
            $html = null;
            $file = null;
        }

        public WebviewBuilder setHTMLString(String html) {
            $html = html;
            return this;
        }

        public WebviewBuilder setFile(String path) {
            $file = path;
            return this;
        }

        public WebviewBuilder setFile(File file) {
            $file = file.getAbsolutePath();
            return this;
        }

        public View build() {
            if ($html == null && $file == null) {
                throw new RuntimeException("An HTML string or HTML file path must be set to build a NativeOverlay.");
            }

            WebView webview = new WebView($context.getActivityContext());
            webview.setBackgroundColor(0x0);

            final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                    .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler($context.getActivityContext()))
                    .setHttpAllowed(false)
                    .setDomain($context.getHost())
                    .build();

            webview.setWebViewClient(new WebViewClientCompat() {
                @Override
                public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                    return assetLoader.shouldInterceptRequest((request.getUrl()));
                }
            });

            WebSettings settings = webview.getSettings();
            settings.setAllowFileAccess(false);
            settings.setAllowContentAccess(false);
            settings.setJavaScriptEnabled(false);
            settings.setDomStorageEnabled(false);

            if ($html != null) {
                webview.loadData($html, "text/html", "utf-8");
            }
            else {
                webview.loadUrl($file);
            }

            return webview;
        }
    }
}
