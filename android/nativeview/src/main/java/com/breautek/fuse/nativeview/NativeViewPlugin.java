
/*
Copyright 2023-2024 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package com.breautek.fuse.nativeview;

import com.breautek.fuse.FuseAPIPacket;
import com.breautek.fuse.FuseAPIResponse;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FusePlugin;
import android.widget.RelativeLayout;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.util.HashMap;

public class NativeViewPlugin extends FusePlugin {

    public static final String TAG = "NativeViewPlugin";

    private final RelativeLayout $container;

    private final HashMap<String, NativeView> $views;

    public NativeViewPlugin(FuseContext context) {
        super(context);

        $views = new HashMap<>();

        $container = new RelativeLayout(context.getActivityContext());
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/echo", new APIHandler<NativeViewPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                JSONObject params = packet.readAsJSONObject();

                JSONObject jRect = params.getJSONObject("rect");
                NativeRect rect = new NativeRect(
                    (float) jRect.getDouble("x"),
                    (float) jRect.getDouble("y"),
                    (float) jRect.getDouble("w"),
                    (float) jRect.getDouble("h")
                );

                JSONObject jOverlay = params.optJSONObject("overlay");
                NativeOverlay.WebviewBuilder overlayBuilder = null;

                if (jOverlay != null) {
                    overlayBuilder = new NativeOverlay.WebviewBuilder(this.plugin.getContext());
                    if (jOverlay.has("html")) {
                        overlayBuilder.setHTMLString(jOverlay.getString("html"));
                    }
                    else if (jOverlay.has("file")) {
                        overlayBuilder.setFile(jOverlay.getString("file"));
                    }
                    else {
                        this.plugin.getContext().getLogger().warn(TAG, "Overlay requires HTML or a file path.");
                        overlayBuilder = null;
                    }
                }

                NativeView nview = new NativeView(this.plugin.getContext(), rect, overlayBuilder);
                $views.put(nview.getID(), nview);
                $container.addView(nview.getView());
            }
        });
    }

    @Override
    public String getID() {
        return "FuseNativeView";
    }
}
