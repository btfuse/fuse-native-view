
#!/bin/bash

# Copyright 2023-2024 Breautek 

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Purpose
#
# Builds and prepares the project for release.
# If you're developing or contributing to the Fuse framework, you'll want to open
# the XCWorkspace in XCode instead.
#
# This script will 
#   1.  Clean your build environment for a fresh build.
#   2.  Run tests, this may take awhile.
#   3.  Copy files to a dist/ directory.

source build-tools/assertions.sh
source build-tools/DirectoryTools.sh
source build-tools/Checksum.sh

assertMac "Mac is required to build Fuse iOS"

if [ -z "$BTFUSE_CODESIGN_IDENTITY" ]; then
    echo "BTFUSE_CODESIGN_IDENTITY environment variable is required."
    exit 2
fi

WORKSPACE="BTFuseNativeView.xcworkspace"
SCHEME="BTFuseNativeView"

echo "Building Fuse Native View Framework $(cat ./VERSION)..."

rm -rf dist
mkdir -p dist

spushd ios
    echo "Cleaning the workspace..."
    # Clean the build
    # XCode can do a poor job in detecting if object code should recompile, particularly when messing with
    # build configuration settings. This will ensure that the produced binary will be representative.
    xcodebuild -quiet -workspace $WORKSPACE -scheme $SCHEME -configuration Release -destination "generic/platform=iOS" clean
    assertLastCall
    xcodebuild -quiet -workspace $WORKSPACE -scheme $SCHEME -configuration Debug -destination "generic/platform=iOS Simulator" clean
    assertLastCall

    echo "Building iOS framework..."
    # Now build the iOS platform target in Release mode. We will continue to use Debug mode for iOS Simulator targets.
    xcodebuild -quiet -workspace $WORKSPACE -scheme $SCHEME -configuration Release -destination "generic/platform=iOS" build
    assertLastCall
    echo "Building iOS Simulator framework..."
    xcodebuild -quiet -workspace $WORKSPACE -scheme $SCHEME -configuration Debug -destination "generic/platform=iOS Simulator" build
    assertLastCall

    iosBuild=$(echo "$(xcodebuild -workspace $WORKSPACE -scheme $SCHEME -configuration Release -sdk iphoneos -showBuildSettings | grep "^\s*CONFIGURATION_BUILD_DIR")" | cut -d'=' -f2 | xargs)
    simBuild=$(echo "$(xcodebuild -workspace $WORKSPACE -scheme $SCHEME -configuration Debug -sdk iphonesimulator -showBuildSettings | grep "^\s*CONFIGURATION_BUILD_DIR")" | cut -d'=' -f2 | xargs)

    echo "Signing iOS build..."
    codesign -s $BTFUSE_CODESIGN_IDENTITY --deep $iosBuild/$SCHEME.framework
    assertLastCall

    echo "Verifying iOS Build"
    codesign -dvvvv $iosBuild/$SCHEME.framework
    assertLastCall

    cp -r $iosBuild/$SCHEME.framework.dSYM ../dist/

    echo "Packing XCFramework..."
    xcodebuild -create-xcframework \
        -framework $iosBuild/$SCHEME.framework \
        -debug-symbols $iosBuild/$SCHEME.framework.dSYM \
        -framework $simBuild/$SCHEME.framework \
        -output ../dist/$SCHEME.xcframework
    assertLastCall
spopd

spushd dist
    zip -r $SCHEME.xcframework.zip $SCHEME.xcframework > /dev/null
    zip -r $SCHEME.framework.dSYM.zip $SCHEME.framework.dSYM > /dev/null
    sha1_compute $SCHEME.xcframework.zip
    sha1_compute $SCHEME.framework.dSYM.zip
spopd

# VERSION=$(cat ./VERSION)
# FUSE_CHECKSUM=$(cat ./dist/$SCHEME.xcframework.zip.sha1.txt)

# btfusePodSpecTemplate=$(<BTFuse.podspec.template)

# btfusePodSpecTemplate=${btfusePodSpecTemplate//\$VERSION\$/$VERSION}
# btfusePodSpecTemplate=${btfusePodSpecTemplate//\$CHECKSUM\$/$FUSE_CHECKSUM}

# # Write the final result to BTFuse.podspec
# echo "$btfusePodSpecTemplate" > BTFuse.podspec
