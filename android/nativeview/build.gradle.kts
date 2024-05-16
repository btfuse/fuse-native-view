
plugins {
    id("com.android.library")
    id("maven-publish")
}

android {
    namespace = "com.breautek.fuse.nativeview"
    compileSdk = 34

    defaultConfig {
        minSdk = 26

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles("consumer-rules.pro")
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    compileOnly("com.breautek.fuse:core:0.8.5")
    implementation("androidx.webkit:webkit:1.11.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.12.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}

android.libraryVariants.configureEach {
    val variantName = this.baseName.replaceFirstChar(Char::titlecase)

    val prepareJSTask = tasks.register<Exec>("prepareJS${variantName}") {
        this.workingDir("../../")
        commandLine("npx", "webpack", "--mode", "none", "--config", "webpack.android.js")
    }

    tasks.named("generate${variantName}Resources").configure {
        this.dependsOn(prepareJSTask)
    }
}

publishing {
    publications {
        create<MavenPublication>("release") {
            groupId = "com.breautek.fuse"
            artifactId = "nativeview"
            version = file("../VERSION").readText().trim()
        }
    }

    repositories {
        maven {
            url = uri("https://archiva.breautek.com/repository/breautek")
            credentials {
                username = findProperty("breautek.repository.user").toString()
                password = findProperty("breautek.repository.password").toString()
            }
        }
    }
}
