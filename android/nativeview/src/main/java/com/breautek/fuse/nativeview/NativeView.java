
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

import com.breautek.fuse.FuseContext;
import com.breautek.fuse.FuseScreenUtils;

import java.util.UUID;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class NativeView {
    private final String $id;
    private final FuseContext $context;

    private float $width;
    private float $height;
    private float $x;
    private float $y;

    private final RelativeLayout $layout;
    private final NativeOverlay $overlay;

    public NativeView(@NonNull FuseContext context, @NonNull NativeRect rect, @Nullable NativeOverlay.IOverlayBuilder overlayBuilder) {
        $id = UUID.randomUUID().toString();
        $context = context;
        $width = rect.width;
        $height = rect.height;
        $x = rect.x;
        $y = rect.y;

        $layout = new RelativeLayout(context.getActivityContext());
        $updateLayout();
        $layout.setBackgroundColor(0x0);

        if (overlayBuilder != null) {
            $overlay = new NativeOverlay(overlayBuilder);
            $layout.addView($overlay.getView(), new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            ));
        }
        else {
            $overlay = null;
        }
    }

    public String getID() {
        return $id;
    }

    public View getView() {
        return $layout;
    }

    private void $updateLayout() {
        FuseScreenUtils utils = $context.getScreenUtils();
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                (int) utils.toNativePx($width),
                (int) utils.toNativePx($height)
        );

        params.leftMargin = (int) utils.toNativePx($x);
        params.topMargin = (int) utils.toNativePx($y);
        $layout.setLayoutParams(params);
    }
}
