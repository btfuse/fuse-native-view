plugins {
    id("com.android.application")
}

android {
    namespace = "com.breautek.fuse.nativeview"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.breautek.fuse.nativeview"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation("com.breautek.fuse:core:0.8.5")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation(project(":nativeview"))
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}

android.applicationVariants.configureEach {
    val variantName = this.baseName.replaceFirstChar(Char::titlecase);

    val prepareJSTask = tasks.register<Exec>("prepareJS${variantName}") {
        this.workingDir("../../testapp");
        commandLine("npx", "webpack", "--mode", "none", "--config", "webpack.android.js");
    }

    tasks.named("generate${variantName}Resources").configure {
        this.dependsOn(prepareJSTask);
    }
}
