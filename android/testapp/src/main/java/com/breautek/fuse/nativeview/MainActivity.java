package com.breautek.fuse.nativeview;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.util.Log;

import com.breautek.fuse.FuseActivity;
import com.breautek.fuse.FuseContext;
import com.breautek.fuse.nativeview.NativeViewPlugin;

public class MainActivity extends FuseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);

        FuseContext fuseContext = getFuseContext();
        NativeViewPlugin nviewAPI = new NativeViewPlugin(fuseContext);
        fuseContext.registerPlugin(nviewAPI);

//        View button = this.findViewById(R.id.testButton);
//        button.setOnClickListener(v -> {
//            Log.i("NVIEW_TEST", "Native view button clicked!");
//        });
    }
}