/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js":
/*!******************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractFuseAPIFactory = void 0;
/**
 * An factory class that defines the base signature for creating a FuseAPI bridge object.
 */
class AbstractFuseAPIFactory {
}
exports.AbstractFuseAPIFactory = AbstractFuseAPIFactory;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/AbstractFuseLoggerFactory.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/AbstractFuseLoggerFactory.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractFuseLoggerFactory = void 0;
class AbstractFuseLoggerFactory {
    constructor() { }
}
exports.AbstractFuseLoggerFactory = AbstractFuseLoggerFactory;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/ContentType.js":
/*!*******************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/ContentType.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentType = void 0;
/**
 * Some common data types
 */
var ContentType;
(function (ContentType) {
    ContentType["TEXT"] = "text/plain";
    ContentType["JSON"] = "application/json";
    ContentType["JAVASCRIPT"] = "text/javascript";
    ContentType["WASM"] = "application/wasm";
    ContentType["BINARY"] = "application/octet-stream";
})(ContentType || (exports.ContentType = ContentType = {}));


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseAPI.js":
/*!***************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseAPI.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPI = void 0;
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../node_modules/@btfuse/core/lib/FuseSerializer.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "../node_modules/@btfuse/core/lib/FuseCallbackManager.js");
/**
 * Base class for the Fuse API bridge for exchanging data with the native platform
 */
class FuseAPI {
    constructor() {
        this.$serializer = this._createSerializer();
    }
    _createSerializer() {
        return new FuseSerializer_1.FuseSerializer();
    }
    getSerializer() {
        return this.$serializer;
    }
    _createRoute(pluginID, method) {
        return `/api/${pluginID}${method}`;
    }
    async execute(pluginID, method, contentType, args) {
        return this._execute(pluginID, method, contentType, this.$serializer.serialize(args));
    }
    createCallbackContext(cb) {
        return FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback(cb);
    }
    releaseCallback(id) {
        FuseCallbackManager_1.FuseCallbackManager.getInstance().releaseCallback(id);
    }
}
exports.FuseAPI = FuseAPI;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseAPIFactory.js":
/*!**********************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseAPIFactory.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPIFactory = void 0;
const AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "../node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js");
const Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@btfuse/core/lib/Platform.js");
const IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "../node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js");
const AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "../node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js");
/**
 * A FuseAPI factory that uses the HTTP/app scheme as the bridge.
 */
class FuseAPIFactory extends AbstractFuseAPIFactory_1.AbstractFuseAPIFactory {
    constructor() {
        super();
        // Realistically there will only be one or the other set.
        this.$iosScheme = null;
        this.$androidScheme = null;
    }
    create(platform) {
        switch (platform) {
            case Platform_1.Platform.IOS: return this._createiOSAPI();
            case Platform_1.Platform.ANDROID: return this._createAndroidAPI();
            default: throw new Error('Unsupported platform: ' + platform);
        }
    }
    _createiOSAPI() {
        if (!this.$iosScheme) {
            this.$iosScheme = new IOSSchemeFuseAPI_1.IOSSchemeFuseAPI();
        }
        return this.$iosScheme;
    }
    _createAndroidAPI() {
        if (!this.$androidScheme) {
            this.$androidScheme = new AndroidSchemeFuseAPI_1.AndroidSchemeFuseAPI();
        }
        return this.$androidScheme;
    }
}
exports.FuseAPIFactory = FuseAPIFactory;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseAPIResponse.js":
/*!***********************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseAPIResponse.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPIResponse = void 0;
const FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "../node_modules/@btfuse/core/lib/FuseResponseReader.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@btfuse/core/lib/FuseError.js");
class FuseAPIResponse {
    constructor(content, headers, status) {
        this.$status = status;
        this.$content = content;
        this.$headers = this.$parseHeaders(headers);
    }
    isError() {
        return this.$status >= 400;
    }
    getContentLength() {
        var _a;
        let lenStr = (_a = this.$headers.get('content-type')) === null || _a === void 0 ? void 0 : _a[0];
        let length = parseInt(lenStr);
        if (isNaN(length)) {
            length = 0;
        }
        return length;
    }
    getContentType() {
        var _a;
        return (_a = this.$headers.get('content-type')) === null || _a === void 0 ? void 0 : _a[0];
    }
    async readAsArrayBuffer() {
        return this.$content;
    }
    async readAsBlob() {
        return new Blob([this.$content]);
    }
    async readAsText() {
        return await FuseResponseReader_1.FuseResponseReader.readAsText(this.$content);
    }
    async readAsJSON() {
        return await FuseResponseReader_1.FuseResponseReader.readAsJSON(this.$content);
    }
    async readAsError() {
        let serializedError = await FuseResponseReader_1.FuseResponseReader.readAsJSON(this.$content);
        return FuseError_1.FuseError.fromSerialized(serializedError);
    }
    getHeaders() {
        return this.$headers;
    }
    getHeader(key) {
        return this.$headers.get(key);
    }
    $parseHeaders(headers) {
        let map = new Map();
        if (!headers) {
            return map;
        }
        let lines = headers.split('\r\n');
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].split(':');
            let key = line[0];
            if (!map.has(key)) {
                map.set(key, []);
            }
            let headerValue = map.get(key);
            headerValue.push(line[1]);
        }
        return map;
    }
}
exports.FuseAPIResponse = FuseAPIResponse;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseCallbackManager.js":
/*!***************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseCallbackManager.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseCallbackManager = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.mjs");
const UUID = tslib_1.__importStar(__webpack_require__(/*! uuid */ "../node_modules/uuid/dist/commonjs-browser/index.js"));
window.__btfuse_callbacks = new Map();
window.__btfuse_doCallback = function (callbackID, data) {
    if (callbackID && window.__btfuse_callbacks.has(callbackID)) {
        window.__btfuse_callbacks.get(callbackID)(data);
    }
};
/**
 * A singleton manager to manage native callbacks.
 *
 * Create a callback context and pass the return context id to native clients,
 * in which they can use to respond back.
 *
 * Note that plugin APIs are far more efficient and can handle a diverse set of data,
 * including large payloads, so when possible it's best to use a plugin API instead of a
 * callback API.
 *
 * This callback API is however, useful for building listener kind of services where the native
 * needs to continously callback to the webview with small data packets.
 */
class FuseCallbackManager {
    constructor() { }
    static getInstance() {
        if (!FuseCallbackManager.$instance) {
            FuseCallbackManager.$instance = new FuseCallbackManager();
        }
        return FuseCallbackManager.$instance;
    }
    createCallback(cb) {
        let id = UUID.v4();
        window.__btfuse_callbacks.set(id, (data) => {
            cb(data);
        });
        return id;
    }
    releaseCallback(id) {
        window.__btfuse_callbacks.delete(id);
    }
}
exports.FuseCallbackManager = FuseCallbackManager;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseContext.js":
/*!*******************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseContext.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseContext = void 0;
const FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "../node_modules/@btfuse/core/lib/plugins/FuseRuntime.js");
const Version_1 = __webpack_require__(/*! ./Version */ "../node_modules/@btfuse/core/lib/Version.js");
/**
 * A context class that holds Fuse Framework state
 */
class FuseContext {
    constructor(platform, apiFactory, loggerFactory) {
        this.$platform = platform;
        this.$logger = loggerFactory.create();
        this.$runtimeVersion = null;
        this.$defaultAPIFactory = apiFactory;
        this.$runtime = new FuseRuntime_1.FuseRuntime(this);
    }
    getLogger() {
        return this.$logger;
    }
    getDefaultAPIFactory() {
        return this.$defaultAPIFactory;
    }
    getPlatform() {
        return this.$platform;
    }
    async $getRuntimeInfo() {
        if (!this.$runtimeInfo) {
            this.$runtimeInfo = await this.$runtime.getInfo();
        }
        return this.$runtimeInfo;
    }
    async getPlatformVersion() {
        if (!this.$runtimeVersion) {
            let info = await this.$getRuntimeInfo();
            this.$runtimeVersion = Version_1.Version.parseVersionString(info.version);
        }
        return this.$runtimeVersion;
    }
    async isDebugMode() {
        let info = await this.$getRuntimeInfo();
        return info.debugMode;
    }
    async registerPauseHandler(callback) {
        return await this.$runtime.registerPauseHandler(callback);
    }
    async unregisterPauseHandler(callbackID) {
        return await this.$runtime.unregisterPauseHandler(callbackID);
    }
    async registerResumeHandler(callback) {
        return await this.$runtime.registerResumeHandler(callback);
    }
    async unregisterResumeHandler(callbackID) {
        return await this.$runtime.unregisterResumeHandler(callbackID);
    }
}
exports.FuseContext = FuseContext;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseContextBuilder.js":
/*!**************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseContextBuilder.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseContextBuilder = void 0;
const FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "../node_modules/@btfuse/core/lib/FuseAPIFactory.js");
const FuseContext_1 = __webpack_require__(/*! ./FuseContext */ "../node_modules/@btfuse/core/lib/FuseContext.js");
const FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "../node_modules/@btfuse/core/lib/FuseLoggerFactory.js");
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../node_modules/@btfuse/core/lib/FuseLoggerLevel.js");
const PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "../node_modules/@btfuse/core/lib/PlatformResolver.js");
class FuseContextBuilder {
    constructor() {
        this.$loggerFactory = null;
        this.$apiFactory = null;
        this.$platformResolver = new PlatformResolver_1.PlatformResolver();
    }
    setPlatformResolver(resolver) {
        this.$platformResolver = resolver;
        return this;
    }
    setAPIFactory(factory) {
        this.$apiFactory = factory;
        return this;
    }
    setLoggerFactory(factory) {
        this.$loggerFactory = factory;
        return this;
    }
    async _isDebugMode(context) {
        return await context.isDebugMode();
    }
    async build() {
        let platform = this.$platformResolver.resolve();
        let apiFactory;
        if (this.$apiFactory) {
            apiFactory = this.$apiFactory;
        }
        else {
            apiFactory = new FuseAPIFactory_1.FuseAPIFactory();
        }
        let loggerFactory;
        if (this.$loggerFactory) {
            loggerFactory = this.$loggerFactory;
        }
        else {
            loggerFactory = new FuseLoggerFactory_1.FuseLoggerFactory(platform);
        }
        let context = new FuseContext_1.FuseContext(platform, apiFactory, loggerFactory);
        let isDebugMode = await this._isDebugMode(context);
        let logger = context.getLogger();
        logger.enableNativeBridge(isDebugMode);
        let level = logger.getLevel();
        level |= FuseLoggerLevel_1.FuseLoggerLevel.DEBUG;
        logger.setLevel(level);
        return context;
    }
}
exports.FuseContextBuilder = FuseContextBuilder;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseError.js":
/*!*****************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseError.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseError = void 0;
class FuseError extends Error {
    constructor(domain, message, cause, code) {
        super(message);
        this.name = this.constructor.name;
        this.$domain = domain;
        this.$message = message;
        this.$code = code || 0;
        this.$cause = cause || null;
    }
    getMessage() {
        return this.$message;
    }
    getDomain() {
        return this.$domain;
    }
    getCode() {
        return this.$code;
    }
    getCause() {
        return this.$cause;
    }
    serialize() {
        return {
            domain: this.getDomain(),
            message: this.getMessage(),
            code: this.getCode(),
            stack: this.stack
        };
    }
    static wrap(error) {
        let ferr = null;
        if (typeof error === 'string') {
            ferr = new FuseError('Unknown', error, null, 0);
        }
        else if (error instanceof FuseError) {
            ferr = error;
        }
        else if (error instanceof Error) {
            ferr = new FuseError(error.name, error.message, error, 0);
        }
        else if (FuseError.$isSerializedFuseError(error)) {
            ferr = FuseError.fromSerialized(error);
        }
        else {
            console.error('Unwrappable Error', error);
            ferr = new FuseError('FuseError', 'Unwrappable error', null, 0);
        }
        return ferr;
    }
    static fromSerialized(error) {
        return new FuseError(error.domain, error.message, null, error.code);
    }
    toString() {
        return 'FuseError';
    }
    static $isSerializedFuseError(error) {
        return 'message' in error && 'domain' in error && 'code' in error;
    }
}
exports.FuseError = FuseError;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseLogger.js":
/*!******************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseLogger.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLogger = exports.FuseLoggerSerializer = void 0;
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../node_modules/@btfuse/core/lib/FuseLoggerLevel.js");
class FuseLoggerSerializer {
    constructor() { }
    _serializeToString(obj) {
        if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') {
            return this._serializePrimitiveToString(obj);
        }
        else if (obj instanceof Date) {
            return this._serializeDateToString(obj);
        }
        else if (this._isISerializable(obj)) {
            return this._serializeToString(obj.serialize());
        }
        else if (obj instanceof Error) {
            return this._serializeErrorToString(obj);
        }
        // When all else fails, attempt to JSON stringify
        return JSON.stringify(obj, null, 4);
    }
    _serializePrimitiveToString(obj) {
        return obj.toString();
    }
    _serializeErrorToString(obj) {
        let serializedError = {
            name: obj.name,
            message: obj.message,
            stack: obj.stack
        };
        return JSON.stringify(serializedError, null, 4);
    }
    _serializeDateToString(obj) {
        return obj.toISOString();
    }
    serialize(obj) {
        if (obj === null || obj === undefined) {
            return null;
        }
        let out = null;
        if (obj instanceof Blob) {
            out = `[Blob ${obj.type || 'Binary'} (${obj.size} bytes)]`;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date) {
            out = this._serializeToString(obj);
        }
        else if (obj instanceof ArrayBuffer) {
            out = `[ArrayBuffer (${obj.byteLength} bytes)]`;
        }
        else if (this._isISerializable(obj)) {
            out = this.serialize(obj.serialize());
        }
        else {
            // should be either JSON objects or json arrays at this point
            out = this._serializeToString(obj);
        }
        return out;
    }
    _isISerializable(x) {
        return !!x.serialize && typeof x.serialize === 'function';
    }
}
exports.FuseLoggerSerializer = FuseLoggerSerializer;
/**
 * A base logger implementation which includes a serializer for common types.
 * It will serialize/accept all values that TSerializable accepts, however Blob/ArrayBuffer
 * or other binary data types will not be serialized. Instead it will print an
 * object identifier, with mime type if present, along with the size of the buffer.
 *
 * The base logger does not provide any native bridging. While usable for purely webview side,
 * use the FuseLoggerFactory to get a logger specific for your runtime environment.
 */
class FuseLogger {
    constructor() {
        this.$enableNativeBridge = true;
        this.$level = FuseLoggerLevel_1.FuseLoggerLevel.INFO | FuseLoggerLevel_1.FuseLoggerLevel.WARN | FuseLoggerLevel_1.FuseLoggerLevel.ERROR;
        this.$serializer = new FuseLoggerSerializer();
        this._registerNativeCalblack();
    }
    _registerNativeCalblack() { }
    setLevel(level) {
        this.$level = level;
    }
    getLevel() {
        return this.$level;
    }
    enableNativeBridge(flag) {
        this.$enableNativeBridge = !!flag;
    }
    _onNativeLogEntry(entry) {
        if (!(this.getLevel() & entry.level)) {
            return;
        }
        if (entry.level === FuseLoggerLevel_1.FuseLoggerLevel.SILENT) {
            return;
        }
        switch (entry.level) {
            case FuseLoggerLevel_1.FuseLoggerLevel.DEBUG:
                console.debug(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.INFO:
                console.info(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.WARN:
                console.warn(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.ERROR:
                console.error(entry.message);
                break;
        }
    }
    /**
     * @param level The log level for this log print
     * @param message Overridable hook to send logs to the native environment
     */
    _logToNative(level, message) { }
    $logToNative(level, args) {
        if (!this.$enableNativeBridge) {
            return;
        }
        let serializedArgs = [];
        for (let i = 0; i < args.length; i++) {
            serializedArgs.push(this.$serializer.serialize(args[i]));
        }
        this._logToNative(level, serializedArgs.join('\t'));
    }
    debug(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.DEBUG)) {
            return;
        }
        console.debug(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.DEBUG, args);
    }
    info(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.INFO)) {
            return;
        }
        console.info(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.INFO, args);
    }
    warn(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.WARN)) {
            return;
        }
        console.warn(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.WARN, args);
    }
    error(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.ERROR)) {
            return;
        }
        console.error(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.ERROR, args);
    }
}
exports.FuseLogger = FuseLogger;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseLoggerFactory.js":
/*!*************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseLoggerFactory.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLoggerFactory = void 0;
const FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "../node_modules/@btfuse/core/lib/FuseLogger.js");
const Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@btfuse/core/lib/Platform.js");
const IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "../node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js");
const AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "../node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js");
class FuseLoggerFactory {
    constructor(platform) {
        this.$platform = platform;
    }
    create() {
        switch (this.$platform) {
            case Platform_1.Platform.IOS:
                return new IOSFuseLogger_1.IOSFuseLogger();
            case Platform_1.Platform.ANDROID:
                return new AndroidFuseLogger_1.AndroidFuseLogger();
            case Platform_1.Platform.TEST:
                return new FuseLogger_1.FuseLogger();
        }
    }
}
exports.FuseLoggerFactory = FuseLoggerFactory;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseLoggerLevel.js":
/*!***********************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseLoggerLevel.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLoggerLevel = void 0;
var FuseLoggerLevel;
(function (FuseLoggerLevel) {
    FuseLoggerLevel[FuseLoggerLevel["SILENT"] = 0] = "SILENT";
    FuseLoggerLevel[FuseLoggerLevel["DEBUG"] = 1] = "DEBUG";
    FuseLoggerLevel[FuseLoggerLevel["INFO"] = 2] = "INFO";
    FuseLoggerLevel[FuseLoggerLevel["WARN"] = 4] = "WARN";
    FuseLoggerLevel[FuseLoggerLevel["ERROR"] = 8] = "ERROR";
})(FuseLoggerLevel || (exports.FuseLoggerLevel = FuseLoggerLevel = {}));


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FusePermissionGrantResult.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FusePermissionGrantResult.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionGrantResult = void 0;
const FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "../node_modules/@btfuse/core/lib/FusePermissionState.js");
class FusePermissionGrantResult {
    constructor(results) {
        this.$results = results;
    }
    isGranted(permission) {
        return this.$results[permission] === FusePermissionState_1.FusePermissionState.GRANTED;
    }
    isAllGranted() {
        for (let i in this.$results) {
            if (this.$results[i] !== FusePermissionState_1.FusePermissionState.GRANTED) {
                return false;
            }
        }
        return true;
    }
    rejectJustifications() {
        for (let i in this.$results) {
            if (this.$results[i] === FusePermissionState_1.FusePermissionState.REQUIRES_JUSTIFICATION) {
                this.$results[i] = FusePermissionState_1.FusePermissionState.DENIED;
            }
        }
    }
    shouldJustify() {
        for (let i in this.$results) {
            if (this.$results[i] === FusePermissionState_1.FusePermissionState.REQUIRES_JUSTIFICATION) {
                return true;
            }
        }
        return false;
    }
}
exports.FusePermissionGrantResult = FusePermissionGrantResult;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FusePermissionRequest.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FusePermissionRequest.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionRequest = void 0;
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "../node_modules/@btfuse/core/lib/ContentType.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@btfuse/core/lib/FuseError.js");
const FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "../node_modules/@btfuse/core/lib/FusePermissionGrantResult.js");
/**
 * Abstract class to handle permission request.
 * Concrete classes should implement the protected _request method to call on their
 * permission request Fuse API.
 */
class FusePermissionRequest {
    constructor(apiBridge, permissionSet, justificationHandler = null) {
        if (!permissionSet || (permissionSet && permissionSet.length === 0)) {
            throw new FuseError_1.FuseError(FusePermissionRequest.TAG, 'At least one permission is required');
        }
        this.$api = apiBridge;
        this.$permissionSet = permissionSet;
        this.$justificationHandler = justificationHandler;
    }
    getPermissionSet() {
        return this.$permissionSet;
    }
    async $request(isJustified) {
        let response = await this.$api(ContentType_1.ContentType.JSON, {
            permissionSet: this.getPermissionSet(),
            isJustified: isJustified
        });
        if (response.isError()) {
            throw await response.readAsError();
        }
        return new FusePermissionGrantResult_1.FusePermissionGrantResult(await response.readAsJSON());
    }
    async $onJustificationRequest() {
        if (!this.$justificationHandler) {
            console.warn('Permission requires justification, but this request has no TJustificationHandler');
            return false;
        }
        return await this.$justificationHandler();
    }
    async request() {
        let results = await this.$request(false);
        if (results.shouldJustify()) {
            if (await this.$onJustificationRequest()) {
                results = await this.$request(true);
            }
            else {
                results.rejectJustifications();
            }
        }
        return results;
    }
}
exports.FusePermissionRequest = FusePermissionRequest;
FusePermissionRequest.TAG = 'PermissionRequest';


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FusePermissionState.js":
/*!***************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FusePermissionState.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionState = void 0;
var FusePermissionState;
(function (FusePermissionState) {
    FusePermissionState[FusePermissionState["GRANTED"] = 0] = "GRANTED";
    FusePermissionState[FusePermissionState["REQUIRES_JUSTIFICATION"] = 1] = "REQUIRES_JUSTIFICATION";
    FusePermissionState[FusePermissionState["DENIED"] = 2] = "DENIED";
})(FusePermissionState || (exports.FusePermissionState = FusePermissionState = {}));


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FusePlugin.js":
/*!******************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FusePlugin.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePlugin = void 0;
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../node_modules/@btfuse/core/lib/FuseSerializer.js");
/**
 * Base class for Fuse Plugins
 */
class FusePlugin {
    constructor(context) {
        this.$context = context;
        this.$apiFactory = this._createAPIFactory() || context.getDefaultAPIFactory();
    }
    /**
     * Creates the API bridge
     * @param platform
     * @returns
     */
    _createAPI(platform) {
        return this._getAPIFactory().create(platform);
    }
    _createAPIFactory() {
        return null;
    }
    _getAPIFactory() {
        return this.$apiFactory;
    }
    /**
     * TAPIOpts is a plugin generic type declaring options.
     * User may use this to declare a path on how to get a particular FuseAPI.
     *
     * This API may be overridden by subclasses to utilise the given options.
     * The default implementation is to simply return a standard FuseAPI.
     *
     * @param opts
     * @returns
     */
    _getAPI(opts) {
        return this.$getAPI();
    }
    /**
     * Returns a standard FuseAPI
     * @returns
     */
    $getAPI() {
        return this._getAPIFactory().create(this.getContext().getPlatform());
    }
    /**
     * Creates a callback context that can be passed to native
     * The native code can use the callbackID to callback to the JS code.
     *
     * The callback can be used several times.
     *
     * Release the callback using _releaseCallback with the given callbackID.
     * These API usages should be part of your plugin API. When releasing a callback,
     * a standard API call should be made to your plugin to tell the native side that
     * the callback is no longer usable, and it should clean up the native resources surrounding
     * the callback context.
     *
     * Note that callback data payloads only supports strings.
     *
     * @param cb
     * @returns String - callbackID
     */
    _createCallback(cb, apiOpts) {
        return this._getAPI(apiOpts).createCallbackContext(cb);
    }
    /**
     * Releases a created callback.
     *
     * @param id callbackID
     */
    _releaseCallback(id, apiOpts) {
        this._getAPI(apiOpts).releaseCallback(id);
    }
    /**
     * Returns the FuseContext
     *
     * @returns
     */
    getContext() {
        return this.$context;
    }
    /**
     * Returns the plugin ID
     */
    getID() {
        return this._getID();
    }
    /**
     * The execution API. Concrete classes can call this to perform calls to the native side.
     *
     * The concrete class should expose public methods with type information exposed.
     *
     * @param method The method link, this should match the endpoint defined in the native API.
     * @param contentType the MIME type of the data you are passing in.
     * @param data - The data to pass to the native environment
     * @returns {ArrayBuffer} The response body from native. FuseResponseReader has some utility methods to read the data in common formats (e.g. text or JSON)
     */
    async _exec(method, contentType, data, apiOpts) {
        return await this._getAPI(apiOpts).execute(this.getID(), method, contentType, data);
    }
    _createAPIBridge(route, serializer) {
        if (!serializer) {
            serializer = new FuseSerializer_1.FuseSerializer();
        }
        return async (type, data) => {
            return await this._exec(route, type, serializer.serialize(data));
        };
    }
}
exports.FusePlugin = FusePlugin;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseResponseReader.js":
/*!**************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseResponseReader.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseResponseReader = void 0;
/**
 * A static class with convenience methods for reading common
 * response content body formats.
 */
class FuseResponseReader {
    constructor() { }
    static async readAsText(data) {
        return await new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(new Blob([data]));
        });
    }
    static async readAsJSON(data) {
        let str = await this.readAsText(data);
        return JSON.parse(str);
    }
}
exports.FuseResponseReader = FuseResponseReader;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/FuseSerializer.js":
/*!**********************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/FuseSerializer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseSerializer = void 0;
class FuseSerializer {
    constructor() { }
    _serializeToString(obj) {
        if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') {
            return this._serializePrimitiveToString(obj);
        }
        else if (obj instanceof Date) {
            return this._serializeDateToString(obj);
        }
        else if (this._isISerializable(obj)) {
            return this._serializeToString(obj.serialize());
        }
        else if (obj instanceof Error) {
            return this._serializeErrorToString(obj);
        }
        // When all else fails, attempt to JSON stringify
        return JSON.stringify(obj);
    }
    _serializePrimitiveToString(obj) {
        return obj.toString();
    }
    _serializeErrorToString(obj) {
        let serializedError = {
            name: obj.name,
            message: obj.message,
            stack: obj.stack
        };
        return JSON.stringify(serializedError, null, 4);
    }
    _serializeDateToString(obj) {
        return obj.toISOString();
    }
    serialize(obj) {
        if (obj === null || obj === undefined) {
            return null;
        }
        let bin;
        if (obj instanceof Blob) {
            bin = obj;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date) {
            bin = new Blob([this._serializeToString(obj)]);
        }
        else if (obj instanceof ArrayBuffer) {
            bin = new Blob([obj]);
        }
        else if (this._isISerializable(obj)) {
            bin = new Blob([this.serialize(obj.serialize())]);
        }
        else {
            // should be either JSON objects or json arrays at this point
            bin = new Blob([this._serializeToString(obj)]);
        }
        return bin;
    }
    _isISerializable(x) {
        return !!x.serialize && typeof x.serialize === 'function';
    }
}
exports.FuseSerializer = FuseSerializer;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/HTTPFuseAPI.js":
/*!*******************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/HTTPFuseAPI.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTTPFuseAPI = void 0;
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "../node_modules/@btfuse/core/lib/ContentType.js");
const FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "../node_modules/@btfuse/core/lib/FuseAPI.js");
const FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "../node_modules/@btfuse/core/lib/FuseAPIResponse.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@btfuse/core/lib/FuseError.js");
/**
 * A Fuse API implementation that uses HTTP protocol to make native calls
 */
class HTTPFuseAPI extends FuseAPI_1.FuseAPI {
    async _getEndpoint() {
        return '';
    }
    async _initHeaders(xhr) { }
    ;
    async buildRoute(pluginID, method) {
        let endpoint = await this._getEndpoint();
        return `${endpoint}${this._createRoute(pluginID, method)}`;
    }
    async _execute(pluginID, method, contentType, data) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open('POST', await this.buildRoute(pluginID, method));
        if (!contentType) {
            contentType = ContentType_1.ContentType.BINARY;
        }
        if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }
        await this._initHeaders(xhr);
        return await this._doRequest(xhr, data);
    }
    _doRequest(xhr, data) {
        return new Promise((resolve, reject) => {
            xhr.onload = async () => {
                let response = new FuseAPIResponse_1.FuseAPIResponse(xhr.response, xhr.getAllResponseHeaders(), xhr.status);
                if (response.isError()) {
                    reject(await response.readAsError());
                }
                else {
                    resolve(response);
                }
            };
            xhr.onerror = (e) => {
                reject(new FuseError_1.FuseError('FuseAPI', 'Network Error'));
            };
            xhr.ontimeout = (e) => {
                reject(new FuseError_1.FuseError('FuseAPI', 'API Timeout'));
            };
            this._doSend(xhr, data);
        });
    }
    _doSend(xhr, data) {
        if (data !== undefined && data !== null) {
            xhr.send(data);
        }
        else {
            xhr.send();
        }
    }
}
exports.HTTPFuseAPI = HTTPFuseAPI;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/Platform.js":
/*!****************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/Platform.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Platform = void 0;
/**
 * Enumeration for supported platforms
 */
var Platform;
(function (Platform) {
    Platform[Platform["IOS"] = 1] = "IOS";
    Platform[Platform["ANDROID"] = 2] = "ANDROID";
    /**
     * Specialized platform used for test environments,
     * will not be used for regular runtimes.
     */
    Platform[Platform["TEST"] = 3] = "TEST";
})(Platform || (exports.Platform = Platform = {}));


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/PlatformResolver.js":
/*!************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/PlatformResolver.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatformResolver = void 0;
const Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@btfuse/core/lib/Platform.js");
/**
 * A strategy to resolve the runtime's platform
 */
class PlatformResolver {
    resolve() {
        if (this.isIOSEnvironment()) {
            return Platform_1.Platform.IOS;
        }
        else {
            // The only other supported platform is Android, so
            // it's assumed
            return Platform_1.Platform.ANDROID;
        }
    }
    isIOSEnvironment() {
        return location.protocol === 'btfuse:';
    }
    isAndroidEnvironment() {
        return !this.isIOSEnvironment();
    }
}
exports.PlatformResolver = PlatformResolver;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/Version.js":
/*!***************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/Version.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Version = void 0;
class Version {
    constructor(major, minor, patch) {
        this.$major = major;
        this.$minor = minor || 0;
        this.$patch = patch || 0;
    }
    static parseVersionString(version) {
        let parts = version.split('.');
        let major = parseInt(parts[0]);
        let minor = parseInt(parts[1]);
        let patch = parseInt(parts[2]);
        if (isNaN(major)) {
            major = 0;
        }
        if (isNaN(minor)) {
            minor = 0;
        }
        if (isNaN(patch)) {
            patch = 0;
        }
        return new Version(major, minor, patch);
    }
    getMajor() {
        return this.$major;
    }
    getMinor() {
        return this.$minor;
    }
    getPatch() {
        return this.$patch;
    }
    toString() {
        return `${this.$major}.${this.$minor}.${this.$patch}`;
    }
    compare(b) {
        return Version.compare(this, b);
    }
    static compare(lhs, rhs) {
        if (lhs.$major === rhs.$major && lhs.$minor === rhs.$minor && lhs.$patch === rhs.$patch) {
            return Version.EQUAL;
        }
        if (lhs.$major === rhs.$major) {
            if (lhs.$minor === rhs.$minor) {
                if (lhs.$patch === rhs.$patch) {
                    // shouldn't have reached here... as it should have been caught by the simple test above first
                    // but for consistency we will keep it here.
                    return Version.EQUAL;
                }
                else {
                    return lhs.$patch > rhs.$patch ? Version.GREATER_THAN : Version.LESS_THAN;
                }
            }
            else {
                return lhs.$minor > rhs.$minor ? Version.GREATER_THAN : Version.LESS_THAN;
            }
        }
        else {
            return lhs.$major > rhs.$major ? Version.GREATER_THAN : Version.LESS_THAN;
        }
    }
}
exports.Version = Version;
Version.LESS_THAN = -1;
Version.EQUAL = 0;
Version.GREATER_THAN = 1;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseLogger = void 0;
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "../node_modules/@btfuse/core/lib/FuseLogger.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "../node_modules/@btfuse/core/lib/FuseCallbackManager.js");
class AndroidFuseLogger extends FuseLogger_1.FuseLogger {
    _logToNative(level, message) {
        window.BTFuseNative.log(level, message);
    }
    _registerNativeCalblack() {
        window.BTFuseNative.setLogCallback(FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback((payload) => {
            let entry = null;
            try {
                entry = JSON.parse(payload);
            }
            catch (ex) {
                return;
            }
            this._onNativeLogEntry(entry);
        }));
    }
}
exports.AndroidFuseLogger = AndroidFuseLogger;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js":
/*!************************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidSchemeFuseAPI = void 0;
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "../node_modules/@btfuse/core/lib/HTTPFuseAPI.js");
/**
 * A Fuse API implementation for an embedded HTTP server to bridge the JS and Native API calls.
 */
class AndroidSchemeFuseAPI extends HTTPFuseAPI_1.HTTPFuseAPI {
    async _getEndpoint() {
        return `https://localhost:${window.BTFuseNative.getAPIPort()}`;
    }
    async _initHeaders(xhr) {
        xhr.setRequestHeader('X-Fuse-Secret', window.BTFuseNative.getAPISecret());
    }
}
exports.AndroidSchemeFuseAPI = AndroidSchemeFuseAPI;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/api.js":
/*!***********************************************!*\
  !*** ../node_modules/@btfuse/core/lib/api.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseLogger = exports.AndroidSchemeFuseAPI = exports.IOSFuseLogger = exports.IOSSchemeFuseAPI = exports.FuseLoggerFactory = exports.AbstractFuseLoggerFactory = exports.FuseLoggerSerializer = exports.FuseLogger = exports.FuseLoggerLevel = exports.FusePermissionGrantResult = exports.FusePermissionRequest = exports.FusePermissionState = exports.FuseSerializer = exports.FuseError = exports.HTTPFuseAPI = exports.FusePlugin = exports.FuseRuntime = exports.AbstractFuseAPIFactory = exports.FuseAPIFactory = exports.FuseResponseReader = exports.ContentType = exports.FuseAPIResponse = exports.FuseCallbackManager = exports.FuseAPI = exports.Version = exports.FuseContextBuilder = exports.FuseContext = exports.PlatformResolver = exports.Platform = void 0;
// Common API
var Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@btfuse/core/lib/Platform.js");
Object.defineProperty(exports, "Platform", ({ enumerable: true, get: function () { return Platform_1.Platform; } }));
var PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "../node_modules/@btfuse/core/lib/PlatformResolver.js");
Object.defineProperty(exports, "PlatformResolver", ({ enumerable: true, get: function () { return PlatformResolver_1.PlatformResolver; } }));
var FuseContext_1 = __webpack_require__(/*! ./FuseContext */ "../node_modules/@btfuse/core/lib/FuseContext.js");
Object.defineProperty(exports, "FuseContext", ({ enumerable: true, get: function () { return FuseContext_1.FuseContext; } }));
var FuseContextBuilder_1 = __webpack_require__(/*! ./FuseContextBuilder */ "../node_modules/@btfuse/core/lib/FuseContextBuilder.js");
Object.defineProperty(exports, "FuseContextBuilder", ({ enumerable: true, get: function () { return FuseContextBuilder_1.FuseContextBuilder; } }));
var Version_1 = __webpack_require__(/*! ./Version */ "../node_modules/@btfuse/core/lib/Version.js");
Object.defineProperty(exports, "Version", ({ enumerable: true, get: function () { return Version_1.Version; } }));
var FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "../node_modules/@btfuse/core/lib/FuseAPI.js");
Object.defineProperty(exports, "FuseAPI", ({ enumerable: true, get: function () { return FuseAPI_1.FuseAPI; } }));
var FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "../node_modules/@btfuse/core/lib/FuseCallbackManager.js");
Object.defineProperty(exports, "FuseCallbackManager", ({ enumerable: true, get: function () { return FuseCallbackManager_1.FuseCallbackManager; } }));
var FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "../node_modules/@btfuse/core/lib/FuseAPIResponse.js");
Object.defineProperty(exports, "FuseAPIResponse", ({ enumerable: true, get: function () { return FuseAPIResponse_1.FuseAPIResponse; } }));
var ContentType_1 = __webpack_require__(/*! ./ContentType */ "../node_modules/@btfuse/core/lib/ContentType.js");
Object.defineProperty(exports, "ContentType", ({ enumerable: true, get: function () { return ContentType_1.ContentType; } }));
var FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "../node_modules/@btfuse/core/lib/FuseResponseReader.js");
Object.defineProperty(exports, "FuseResponseReader", ({ enumerable: true, get: function () { return FuseResponseReader_1.FuseResponseReader; } }));
var FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "../node_modules/@btfuse/core/lib/FuseAPIFactory.js");
Object.defineProperty(exports, "FuseAPIFactory", ({ enumerable: true, get: function () { return FuseAPIFactory_1.FuseAPIFactory; } }));
var AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "../node_modules/@btfuse/core/lib/AbstractFuseAPIFactory.js");
Object.defineProperty(exports, "AbstractFuseAPIFactory", ({ enumerable: true, get: function () { return AbstractFuseAPIFactory_1.AbstractFuseAPIFactory; } }));
var FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "../node_modules/@btfuse/core/lib/plugins/FuseRuntime.js");
Object.defineProperty(exports, "FuseRuntime", ({ enumerable: true, get: function () { return FuseRuntime_1.FuseRuntime; } }));
var FusePlugin_1 = __webpack_require__(/*! ./FusePlugin */ "../node_modules/@btfuse/core/lib/FusePlugin.js");
Object.defineProperty(exports, "FusePlugin", ({ enumerable: true, get: function () { return FusePlugin_1.FusePlugin; } }));
var HTTPFuseAPI_1 = __webpack_require__(/*! ./HTTPFuseAPI */ "../node_modules/@btfuse/core/lib/HTTPFuseAPI.js");
Object.defineProperty(exports, "HTTPFuseAPI", ({ enumerable: true, get: function () { return HTTPFuseAPI_1.HTTPFuseAPI; } }));
var FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@btfuse/core/lib/FuseError.js");
Object.defineProperty(exports, "FuseError", ({ enumerable: true, get: function () { return FuseError_1.FuseError; } }));
var FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../node_modules/@btfuse/core/lib/FuseSerializer.js");
Object.defineProperty(exports, "FuseSerializer", ({ enumerable: true, get: function () { return FuseSerializer_1.FuseSerializer; } }));
var FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "../node_modules/@btfuse/core/lib/FusePermissionState.js");
Object.defineProperty(exports, "FusePermissionState", ({ enumerable: true, get: function () { return FusePermissionState_1.FusePermissionState; } }));
var FusePermissionRequest_1 = __webpack_require__(/*! ./FusePermissionRequest */ "../node_modules/@btfuse/core/lib/FusePermissionRequest.js");
Object.defineProperty(exports, "FusePermissionRequest", ({ enumerable: true, get: function () { return FusePermissionRequest_1.FusePermissionRequest; } }));
var FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "../node_modules/@btfuse/core/lib/FusePermissionGrantResult.js");
Object.defineProperty(exports, "FusePermissionGrantResult", ({ enumerable: true, get: function () { return FusePermissionGrantResult_1.FusePermissionGrantResult; } }));
// Logger
var FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../node_modules/@btfuse/core/lib/FuseLoggerLevel.js");
Object.defineProperty(exports, "FuseLoggerLevel", ({ enumerable: true, get: function () { return FuseLoggerLevel_1.FuseLoggerLevel; } }));
var FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "../node_modules/@btfuse/core/lib/FuseLogger.js");
Object.defineProperty(exports, "FuseLogger", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLogger; } }));
Object.defineProperty(exports, "FuseLoggerSerializer", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLoggerSerializer; } }));
var AbstractFuseLoggerFactory_1 = __webpack_require__(/*! ./AbstractFuseLoggerFactory */ "../node_modules/@btfuse/core/lib/AbstractFuseLoggerFactory.js");
Object.defineProperty(exports, "AbstractFuseLoggerFactory", ({ enumerable: true, get: function () { return AbstractFuseLoggerFactory_1.AbstractFuseLoggerFactory; } }));
var FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "../node_modules/@btfuse/core/lib/FuseLoggerFactory.js");
Object.defineProperty(exports, "FuseLoggerFactory", ({ enumerable: true, get: function () { return FuseLoggerFactory_1.FuseLoggerFactory; } }));
// iOS Specific APIs / Implementations
var IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "../node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js");
Object.defineProperty(exports, "IOSSchemeFuseAPI", ({ enumerable: true, get: function () { return IOSSchemeFuseAPI_1.IOSSchemeFuseAPI; } }));
var IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "../node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js");
Object.defineProperty(exports, "IOSFuseLogger", ({ enumerable: true, get: function () { return IOSFuseLogger_1.IOSFuseLogger; } }));
// Android Specific APIs / Implementations
var AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "../node_modules/@btfuse/core/lib/android/AndroidSchemeFuseAPI.js");
Object.defineProperty(exports, "AndroidSchemeFuseAPI", ({ enumerable: true, get: function () { return AndroidSchemeFuseAPI_1.AndroidSchemeFuseAPI; } }));
var AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "../node_modules/@btfuse/core/lib/android/AndroidFuseLogger.js");
Object.defineProperty(exports, "AndroidFuseLogger", ({ enumerable: true, get: function () { return AndroidFuseLogger_1.AndroidFuseLogger; } }));


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js":
/*!*************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/ios/IOSFuseLogger.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSFuseLogger = void 0;
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "../node_modules/@btfuse/core/lib/FuseLogger.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "../node_modules/@btfuse/core/lib/FuseCallbackManager.js");
class IOSFuseLogger extends FuseLogger_1.FuseLogger {
    _logToNative(level, message) {
        window.webkit.messageHandlers.log.postMessage([level, message]);
    }
    _registerNativeCalblack() {
        window.webkit.messageHandlers.setLogCallback.postMessage(FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback((payload) => {
            let entry = null;
            try {
                entry = JSON.parse(payload);
            }
            catch (ex) {
                return;
            }
            this._onNativeLogEntry(entry);
        }));
    }
}
exports.IOSFuseLogger = IOSFuseLogger;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/ios/IOSSchemeFuseAPI.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSSchemeFuseAPI = void 0;
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "../node_modules/@btfuse/core/lib/HTTPFuseAPI.js");
/**
 * A Fuse API implementation for iOS that uses WKURLSchemeHandler to bridge the JS and Native API calls.
 */
class IOSSchemeFuseAPI extends HTTPFuseAPI_1.HTTPFuseAPI {
    async _getEndpoint() {
        return `https://localhost:${await window.webkit.messageHandlers.getAPIPort.postMessage("")}`;
    }
    async _initHeaders(xhr) {
        xhr.setRequestHeader('X-Fuse-Secret', await window.webkit.messageHandlers.getAPISecret.postMessage(""));
    }
}
exports.IOSSchemeFuseAPI = IOSSchemeFuseAPI;


/***/ }),

/***/ "../node_modules/@btfuse/core/lib/plugins/FuseRuntime.js":
/*!***************************************************************!*\
  !*** ../node_modules/@btfuse/core/lib/plugins/FuseRuntime.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseRuntime = void 0;
const ContentType_1 = __webpack_require__(/*! ../ContentType */ "../node_modules/@btfuse/core/lib/ContentType.js");
const FusePlugin_1 = __webpack_require__(/*! ../FusePlugin */ "../node_modules/@btfuse/core/lib/FusePlugin.js");
class FuseRuntime extends FusePlugin_1.FusePlugin {
    constructor(context) {
        super(context);
        this.$callbackIDs = [];
    }
    _getID() {
        return 'FuseRuntime';
    }
    async getInfo() {
        let data = await this._exec('/info');
        return await data.readAsJSON();
    }
    async registerPauseHandler(cb) {
        let cbID = this._createCallback((payload) => {
            cb();
        });
        await this._exec('/registerPauseHandler', ContentType_1.ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);
        return cbID;
    }
    async unregisterPauseHandler(callbackID) {
        await this._exec('/unregisterPauseHandler', ContentType_1.ContentType.TEXT, callbackID);
    }
    async registerResumeHandler(cb) {
        let cbID = this._createCallback((payload) => {
            cb();
        });
        await this._exec('/registerResumeHandler', ContentType_1.ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);
        return cbID;
    }
    async unregisterResumeHandler(callbackID) {
        await this._exec('/unregisterResumeHandler', ContentType_1.ContentType.TEXT, callbackID);
    }
}
exports.FuseRuntime = FuseRuntime;


/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function get() {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _parse.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function get() {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function get() {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function get() {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function get() {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function get() {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function get() {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _version.default;
  }
}));

var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "../node_modules/uuid/dist/commonjs-browser/v1.js"));

var _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ "../node_modules/uuid/dist/commonjs-browser/v3.js"));

var _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ "../node_modules/uuid/dist/commonjs-browser/v4.js"));

var _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ "../node_modules/uuid/dist/commonjs-browser/v5.js"));

var _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ "../node_modules/uuid/dist/commonjs-browser/nil.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ "../node_modules/uuid/dist/commonjs-browser/version.js"));

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "../node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/md5.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/md5.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/native.js":
/*!************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/native.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
  randomUUID
};
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/nil.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/nil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/parse.js":
/*!***********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/parse.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/regex.js":
/*!***********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/regex.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/rng.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/rng.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/sha1.js":
/*!**********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/sha1.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/stringify.js":
/*!***************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/stringify.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.unsafeStringify = unsafeStringify;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v1.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v1.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "../node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.unsafeStringify)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v3.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v3.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "../node_modules/uuid/dist/commonjs-browser/v35.js"));

var _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ "../node_modules/uuid/dist/commonjs-browser/md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v35.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v35.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.DNS = void 0;
exports["default"] = v35;

var _stringify = __webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js");

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "../node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v4.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v4.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _native = _interopRequireDefault(__webpack_require__(/*! ./native.js */ "../node_modules/uuid/dist/commonjs-browser/native.js"));

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "../node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }

  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.unsafeStringify)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v5.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v5.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "../node_modules/uuid/dist/commonjs-browser/v35.js"));

var _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ "../node_modules/uuid/dist/commonjs-browser/sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/validate.js":
/*!**************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/validate.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ "../node_modules/uuid/dist/commonjs-browser/regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/version.js":
/*!*************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/version.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ "../src/FuseNativeViewNode.ts":
/*!************************************!*\
  !*** ../src/FuseNativeViewNode.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseNativeViewNode = void 0;
class FuseNativeViewNode {
    constructor(api, id, node) {
        this.$api = api;
        this.$id = id;
        this.$node = node;
        this.$isActive = false;
        this.$isUpdating = false;
        this.$timer = null;
        this.$lastUpdatedRect = null;
        this.$isDestroyed = false;
        this.$tick = this.$tick.bind(this);
        this.setActive(true);
    }
    getID() {
        return this.$id;
    }
    getNode() {
        return this.$node;
    }
    setActive(flag) {
        this.$isActive = flag;
        if (flag) {
            this.$timer = window.requestAnimationFrame(this.$tick);
        }
        else {
            if (this.$timer !== null) {
                window.cancelAnimationFrame(this.$timer);
            }
        }
    }
    isActive() {
        return this.$isActive;
    }
    async $update(rect) {
        await this.$api.update(this.getID(), rect);
    }
    static getNativeRect(node) {
        let domRect = node.getBoundingClientRect();
        let rect = {
            x: domRect.x,
            y: domRect.y,
            w: domRect.width,
            h: domRect.height
        };
        return rect;
    }
    $hasRectChanges(a, b) {
        return a.x !== b.x || a.y !== b.y || a.w !== b.w || a.h !== b.h;
    }
    async $tick() {
        let rect = FuseNativeViewNode.getNativeRect(this.$node);
        if (!this.$isUpdating && (this.$lastUpdatedRect == null || this.$hasRectChanges(this.$lastUpdatedRect, rect))) {
            try {
                this.$isUpdating = true;
                await this.$update(rect);
            }
            catch (ex) {
                this.$lastUpdatedRect = null;
            }
            this.$isUpdating = false;
            this.$lastUpdatedRect = rect;
        }
        if (this.$isActive) {
            this.$timer = window.requestAnimationFrame(this.$tick);
        }
        else {
            this.$timer = null;
        }
    }
    /**
     * Destroys this fuse native view. When destroyed, the native
     * view will be removed from the DOM and this node will no longer be tracked.
     */
    async destroy() {
        await this.$api.destroy(this);
        this.$isDestroyed = true;
    }
}
exports.FuseNativeViewNode = FuseNativeViewNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVzZU5hdGl2ZVZpZXdOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0Z1c2VOYXRpdmVWaWV3Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0VBY0U7OztBQUtGLE1BQWEsa0JBQWtCO0lBVTNCLFlBQW1CLEdBQXlCLEVBQUUsRUFBVSxFQUFFLElBQWlCO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUs7UUFDUixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVNLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxJQUFhO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0QsQ0FBQzthQUNJLENBQUM7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

/***/ }),

/***/ "../src/FuseNativeViewPlugin.ts":
/*!**************************************!*\
  !*** ../src/FuseNativeViewPlugin.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseNativeViewPlugin = void 0;
const core_1 = __webpack_require__(/*! @btfuse/core */ "../node_modules/@btfuse/core/lib/api.js");
const FuseNativeViewNode_1 = __webpack_require__(/*! ./FuseNativeViewNode */ "../src/FuseNativeViewNode.ts");
class FuseNativeViewPlugin extends core_1.FusePlugin {
    _getID() {
        return "FuseNativeView";
    }
    /**
     * Creates a overlay view. The given node will be tracked
     * according to it's position and size on screen.
     *
     * A native view will be positioned in the same position on top of
     * the webview.
     *
     * If a overlay is desirable, optionally a path to a HTML file can be given.
     * This HTML file will be loaded in a separate webview process. This separate
     * webview will process will have limited capabilities, but it will be sized
     * and positioned in the same area of the transparent mask, however
     * above the webview. If the overlay file is not specified, a webview overlay
     * will not be created.
     *
     * TBD: Notes on event propagation.
     *
     * @param node The node to track
     * @returns
     */
    async create(node, options) {
        let params = {
            rect: FuseNativeViewNode_1.FuseNativeViewNode.getNativeRect(node),
            options: options || {}
        };
        let response = await this._exec('/create', core_1.ContentType.JSON, params);
        if (response.isError()) {
            throw await response.readAsError();
        }
        let id = await response.readAsText();
        return new FuseNativeViewNode_1.FuseNativeViewNode(this, id, node);
    }
    async destroy(node) {
        let response = await this._exec('/destroy', core_1.ContentType.TEXT, node.getID());
        if (response.isError()) {
            throw await response.readAsError();
        }
    }
    async update(id, rect) {
        let response = await this._exec('/update', core_1.ContentType.JSON, {
            id: id,
            rect: rect
        });
        if (response.isError()) {
            throw await response.readAsError();
        }
    }
}
exports.FuseNativeViewPlugin = FuseNativeViewPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVzZU5hdGl2ZVZpZXdQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvRnVzZU5hdGl2ZVZpZXdQbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7Ozs7Ozs7Ozs7OztFQWNFOzs7QUFFRix1Q0FBeUY7QUFDekYsNkRBQTBEO0FBdUMxRCxNQUFhLG9CQUFxQixTQUFRLGlCQUFVO0lBQzdCLE1BQU07UUFDckIsT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBaUIsRUFBRSxPQUFrQztRQUNyRSxJQUFJLE1BQU0sR0FBK0I7WUFDckMsSUFBSSxFQUFFLHVDQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDNUMsT0FBTyxFQUFFLE9BQU8sSUFBSSxFQUFFO1NBQ3pCLENBQUM7UUFFRixJQUFJLFFBQVEsR0FBb0IsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxrQkFBVyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELElBQUksRUFBRSxHQUFXLE1BQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdDLE9BQU8sSUFBSSx1Q0FBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQXdCO1FBQ3pDLElBQUksUUFBUSxHQUFvQixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLGtCQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzdGLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7WUFDckIsTUFBTSxNQUFNLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBVSxFQUFFLElBQW9CO1FBQ2hELElBQUksUUFBUSxHQUFvQixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLGtCQUFXLENBQUMsSUFBSSxFQUFFO1lBQzFFLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQXhERCxvREF3REMifQ==

/***/ }),

/***/ "../src/api.ts":
/*!*********************!*\
  !*** ../src/api.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseNativeViewPlugin = exports.FuseNativeViewNode = void 0;
var FuseNativeViewNode_1 = __webpack_require__(/*! ./FuseNativeViewNode */ "../src/FuseNativeViewNode.ts");
Object.defineProperty(exports, "FuseNativeViewNode", ({ enumerable: true, get: function () { return FuseNativeViewNode_1.FuseNativeViewNode; } }));
var FuseNativeViewPlugin_1 = __webpack_require__(/*! ./FuseNativeViewPlugin */ "../src/FuseNativeViewPlugin.ts");
Object.defineProperty(exports, "FuseNativeViewPlugin", ({ enumerable: true, get: function () { return FuseNativeViewPlugin_1.FuseNativeViewPlugin; } }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0VBY0U7OztBQUVGLDJEQUF3RDtBQUFoRCx3SEFBQSxrQkFBa0IsT0FBQTtBQUMxQiwrREFBNEQ7QUFBcEQsNEhBQUEsb0JBQW9CLE9BQUEifQ==

/***/ }),

/***/ "../node_modules/tslib/tslib.es6.mjs":
/*!*******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var exports = {};
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/

/*
   Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @btfuse/core */ "../node_modules/@btfuse/core/lib/api.js");
const api_1 = __webpack_require__(/*! ../../src/api */ "../src/api.ts");
let dataContainer;
let plugin;
window.onload = async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    plugin = new api_1.FuseNativeViewPlugin(context);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdGFwcC9zcmMvQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRix1Q0FHc0I7QUFFdEIsdUNBRXVCO0FBRXZCLElBQUksYUFBMEIsQ0FBQztBQUMvQixJQUFJLE1BQTRCLENBQUM7QUFFakMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksRUFBRTtJQUN2QixJQUFJLE9BQU8sR0FBdUIsSUFBSSx5QkFBa0IsRUFBRSxDQUFDO0lBQzNELElBQUksT0FBTyxHQUFnQixNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqRCxNQUFNLEdBQUcsSUFBSSwwQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQyxDQUFDLENBQUMifQ==
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./webpack.ios.js ***!
  \************************/

/*
   Copyright 2023 Breautek

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @btfuse/core */ "../node_modules/@btfuse/core/lib/api.js");
const api_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../src/api'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let dataContainer;
let plugin;
window.onload = async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    plugin = new api_1.FuseNativeViewPlugin(context);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdGFwcC9zcmMvQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFjRTs7QUFFRix1Q0FHc0I7QUFFdEIsdUNBRXVCO0FBRXZCLElBQUksYUFBMEIsQ0FBQztBQUMvQixJQUFJLE1BQTRCLENBQUM7QUFFakMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksRUFBRTtJQUN2QixJQUFJLE9BQU8sR0FBdUIsSUFBSSx5QkFBa0IsRUFBRSxDQUFDO0lBQzNELElBQUksT0FBTyxHQUFnQixNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqRCxNQUFNLEdBQUcsSUFBSSwwQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQyxDQUFDLENBQUMifQ==
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixhQUFhO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBZTs7Ozs7Ozs7OztBQzlORjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7QUNWRjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTtBQUNmO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7QUNQRjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTs7QUFFZix1Q0FBdUMsbUJBQU8sQ0FBQyw2RUFBZTs7QUFFOUQsdUNBQXVDLHVDQUF1Qzs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7QUM1Q0Y7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7QUFDZiw2QkFBNkIsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsR0FBRztBQUMzRixrQkFBZTs7Ozs7Ozs7OztBQ1BGOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUN4QmE7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFEOztBQUVyRDs7QUFFQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCOztBQUVBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLE9BQU87QUFDekI7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTs7QUFFQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7O0FDdkdGOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlO0FBQ2YsdUJBQXVCOztBQUV2Qix1Q0FBdUMsbUJBQU8sQ0FBQyw2RUFBZTs7QUFFOUQsdUNBQXVDLHVDQUF1Qzs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBZTs7Ozs7Ozs7OztBQzNDRjs7QUFFYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRixrQkFBZTs7QUFFZixrQ0FBa0MsbUJBQU8sQ0FBQyxtRUFBVTs7QUFFcEQsaUJBQWlCLG1CQUFPLENBQUMsK0VBQWdCOztBQUV6Qyx1Q0FBdUMsdUNBQXVDOztBQUU5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7OztBQUdmO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7OztBQUdBLHdFQUF3RTtBQUN4RTs7QUFFQSw0RUFBNEU7O0FBRTVFLGdFQUFnRTs7QUFFaEU7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCOztBQUV4QiwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0EsdUJBQXVCOztBQUV2QixvQ0FBb0M7O0FBRXBDLDhCQUE4Qjs7QUFFOUIsa0NBQWtDOztBQUVsQyw0QkFBNEI7O0FBRTVCLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7O0FDMUdGOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlOztBQUVmLGdDQUFnQyxtQkFBTyxDQUFDLG1FQUFVOztBQUVsRCxpQ0FBaUMsbUJBQU8sQ0FBQyxtRUFBVTs7QUFFbkQsdUNBQXVDLHVDQUF1Qzs7QUFFOUU7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7O0FDZkY7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0YsV0FBVyxHQUFHLFdBQVc7QUFDekIsa0JBQWU7O0FBRWYsaUJBQWlCLG1CQUFPLENBQUMsK0VBQWdCOztBQUV6QyxvQ0FBb0MsbUJBQU8sQ0FBQyx1RUFBWTs7QUFFeEQsdUNBQXVDLHVDQUF1Qzs7QUFFOUU7QUFDQSwyQ0FBMkM7O0FBRTNDOztBQUVBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7OztBQUdKO0FBQ0EsOEJBQThCO0FBQzlCLElBQUksZUFBZTs7O0FBR25CO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDL0VhOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlOztBQUVmLHFDQUFxQyxtQkFBTyxDQUFDLHlFQUFhOztBQUUxRCxrQ0FBa0MsbUJBQU8sQ0FBQyxtRUFBVTs7QUFFcEQsaUJBQWlCLG1CQUFPLENBQUMsK0VBQWdCOztBQUV6Qyx1Q0FBdUMsdUNBQXVDOztBQUU5RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrRUFBa0U7OztBQUdsRTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTs7QUFFQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7O0FDMUNGOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlOztBQUVmLGdDQUFnQyxtQkFBTyxDQUFDLG1FQUFVOztBQUVsRCxrQ0FBa0MsbUJBQU8sQ0FBQyxxRUFBVzs7QUFFckQsdUNBQXVDLHVDQUF1Qzs7QUFFOUU7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7O0FDZkY7O0FBRWIsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Ysa0JBQWU7O0FBRWYsb0NBQW9DLG1CQUFPLENBQUMsdUVBQVk7O0FBRXhELHVDQUF1Qyx1Q0FBdUM7O0FBRTlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7O0FDaEJGOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlOztBQUVmLHVDQUF1QyxtQkFBTyxDQUFDLDZFQUFlOztBQUU5RCx1Q0FBdUMsdUNBQXVDOztBQUU5RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7QUNwQkY7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwyQ0FBMkM7Ozs7Ozs7Ozs7QUNqRzlCO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDRCQUE0QjtBQUM1QixlQUFlLG1CQUFPLENBQUMsNkRBQWM7QUFDckMsNkJBQTZCLG1CQUFPLENBQUMsMERBQXNCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLDJDQUEyQzs7Ozs7Ozs7OztBQ3hFOUI7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNEJBQTRCLEdBQUcsMEJBQTBCO0FBQ3pELDJCQUEyQixtQkFBTyxDQUFDLDBEQUFzQjtBQUN6RCxzREFBcUQsRUFBRSxxQ0FBcUMsbURBQW1ELEVBQUM7QUFDaEosNkJBQTZCLG1CQUFPLENBQUMsOERBQXdCO0FBQzdELHdEQUF1RCxFQUFFLHFDQUFxQyx1REFBdUQsRUFBQztBQUN0SiwyQ0FBMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCM0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUyxnQkFBZ0Isc0NBQXNDLGtCQUFrQjtBQUNqRix3QkFBd0I7QUFDeEI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVPO0FBQ1A7QUFDQSwrQ0FBK0MsT0FBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGNBQWM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSwyQ0FBMkMsUUFBUTtBQUNuRDtBQUNBOztBQUVPO0FBQ1Asa0NBQWtDO0FBQ2xDOztBQUVPO0FBQ1AsdUJBQXVCLHVGQUF1RjtBQUM5RztBQUNBO0FBQ0EseUdBQXlHO0FBQ3pHO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQSw4Q0FBOEMseUZBQXlGO0FBQ3ZJLDhEQUE4RCwyQ0FBMkM7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxrQkFBa0IseUJBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0EsNENBQTRDLHlFQUF5RTtBQUNySDs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUCwwQkFBMEIsK0RBQStELGlCQUFpQjtBQUMxRztBQUNBLGtDQUFrQyxNQUFNLCtCQUErQixZQUFZO0FBQ25GLGlDQUFpQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3RGLDhCQUE4QjtBQUM5QjtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQLFlBQVksNkJBQTZCLDBCQUEwQixjQUFjLHFCQUFxQjtBQUN0RyxlQUFlLG9EQUFvRCxxRUFBcUUsY0FBYztBQUN0SixxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxpQ0FBaUMsU0FBUztBQUMxQyxpQ0FBaUMsV0FBVyxVQUFVO0FBQ3RELHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0EsNEdBQTRHLE9BQU87QUFDbkgsK0VBQStFLGlCQUFpQjtBQUNoRyx1REFBdUQsZ0JBQWdCLFFBQVE7QUFDL0UsNkNBQTZDLGdCQUFnQixnQkFBZ0I7QUFDN0U7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLFFBQVEsWUFBWSxhQUFhLFNBQVMsVUFBVTtBQUNwRCxrQ0FBa0MsU0FBUztBQUMzQztBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE1BQU07QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUCwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1AsZ0RBQWdELFFBQVE7QUFDeEQsdUNBQXVDLFFBQVE7QUFDL0MsdURBQXVELFFBQVE7QUFDL0Q7QUFDQTtBQUNBOztBQUVPO0FBQ1AsMkVBQTJFLE9BQU87QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLGVBQWUsdUZBQXVGLGNBQWM7QUFDcEgscUJBQXFCLGdDQUFnQyxxQ0FBcUMsMkNBQTJDO0FBQ3JJLDBCQUEwQixNQUFNLGlCQUFpQixZQUFZO0FBQzdELHFCQUFxQjtBQUNyQiw0QkFBNEI7QUFDNUIsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQjs7QUFFTztBQUNQO0FBQ0EsZUFBZSw2Q0FBNkMsVUFBVSxzREFBc0QsY0FBYztBQUMxSSx3QkFBd0IsNkJBQTZCLG9CQUFvQix1Q0FBdUMsa0JBQWtCO0FBQ2xJOztBQUVPO0FBQ1A7QUFDQTtBQUNBLHlHQUF5Ryx1RkFBdUYsY0FBYztBQUM5TSxxQkFBcUIsOEJBQThCLGdEQUFnRCx3REFBd0Q7QUFDM0osMkNBQTJDLHNDQUFzQyxVQUFVLG1CQUFtQixJQUFJO0FBQ2xIOztBQUVPO0FBQ1AsK0JBQStCLHVDQUF1QyxZQUFZLEtBQUssT0FBTztBQUM5RjtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLDRCQUE0QjtBQUNwRSxDQUFDO0FBQ0Q7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLDJDQUEyQztBQUMzQzs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4Q0FBOEM7QUFDbkU7QUFDQTtBQUNBLHFCQUFxQixhQUFhO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxTQUFTLGdCQUFnQjtBQUN4RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7VUNqWEY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7O0FDTmE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLDZEQUFjO0FBQ3JDLGNBQWMsbUJBQU8sQ0FBQyxvQ0FBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx1aUI7Ozs7Ozs7OztBQzFCOUI7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLDZEQUFjO0FBQ3JDLGNBQWMsbUJBQU8sQ0FBQyw0SUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx1aUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vQ29udGVudFR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VBUElGYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlQVBJUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VDYWxsYmFja01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VDb250ZXh0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlQ29udGV4dEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VFcnJvci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZUxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZUxvZ2dlckZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VMb2dnZXJMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZVBlcm1pc3Npb25SZXF1ZXN0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlUGVybWlzc2lvblN0YXRlLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlUGx1Z2luLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlUmVzcG9uc2VSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VTZXJpYWxpemVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9IVFRQRnVzZUFQSS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vUGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL1BsYXRmb3JtUmVzb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL1ZlcnNpb24udHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL2FuZHJvaWQvQW5kcm9pZEZ1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vaW9zL0lPU0Z1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uL2lvcy9JT1NTY2hlbWVGdXNlQVBJLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi9wbHVnaW5zL0Z1c2VSdW50aW1lLnRzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9tZDUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9uaWwuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvc2hhMS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YxLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92MzUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y1LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92ZXJzaW9uLmpzIiwid2VicGFjazovLy8uLi9zcmMvRnVzZU5hdGl2ZVZpZXdOb2RlLnRzIiwid2VicGFjazovLy8uLi9zcmMvRnVzZU5hdGl2ZVZpZXdQbHVnaW4udHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9hcGkudHMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9BcHAudHMiLCJ3ZWJwYWNrOi8vLy4vd2VicGFjay5pb3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0nO1xuXG4vKipcbiAqIEFuIGZhY3RvcnkgY2xhc3MgdGhhdCBkZWZpbmVzIHRoZSBiYXNlIHNpZ25hdHVyZSBmb3IgY3JlYXRpbmcgYSBGdXNlQVBJIGJyaWRnZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlKHBsYXRmb3JtOiBQbGF0Zm9ybSk6IEZ1c2VBUEk7XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vSUZ1c2VMb2dnZXJcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0RnVzZUxvZ2dlckZhY3Rvcnkge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlKCk6IElGdXNlTG9nZ2VyO1xufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIFNvbWUgY29tbW9uIGRhdGEgdHlwZXNcbiAqL1xuZXhwb3J0IGVudW0gQ29udGVudFR5cGUge1xuICAgIFRFWFQgICAgICAgICAgICA9ICd0ZXh0L3BsYWluJyxcbiAgICBKU09OICAgICAgICAgICAgPSAnYXBwbGljYXRpb24vanNvbicsXG4gICAgSkFWQVNDUklQVCAgICAgID0gJ3RleHQvamF2YXNjcmlwdCcsIC8vIFJGQyA5MjM5XG4gICAgV0FTTSAgICAgICAgICAgID0gJ2FwcGxpY2F0aW9uL3dhc20nLFxuICAgIEJJTkFSWSAgICAgICAgICA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tICcuL0Z1c2VTZXJpYWxpemVyJztcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIsIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyIH0gZnJvbSAnLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuLyoqXG4gKiBHZW5lcmljIEFQSSByZXNwb25zZSBkYXRhIHR5cGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBURnVzZUFQSVJlc3BvbnNlRGF0YSB7XG4gICAga2VlcDogYm9vbGVhbjtcbiAgICBkYXRhPzogQmxvYjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRnVzZUFQSUNhbGxQYWNrZXQge1xuICAgIHJvdXRlOiBzdHJpbmc7XG4gICAgY2FsbGJhY2tJRDogc3RyaW5nO1xuICAgIGJvZHk6IEJsb2I7XG4gICAgY29udGVudFR5cGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciB0aGUgRnVzZSBBUEkgYnJpZGdlIGZvciBleGNoYW5naW5nIGRhdGEgd2l0aCB0aGUgbmF0aXZlIHBsYXRmb3JtXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlQVBJIHtcblxuICAgIHByaXZhdGUgJHNlcmlhbGl6ZXI6IEZ1c2VTZXJpYWxpemVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRzZXJpYWxpemVyID0gdGhpcy5fY3JlYXRlU2VyaWFsaXplcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlU2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiBuZXcgRnVzZVNlcmlhbGl6ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VyaWFsaXplcigpOiBGdXNlU2VyaWFsaXplciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzZXJpYWxpemVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRvIGltcGxlbWVudCBleGVjdXRlIG5hdGl2ZSBicmlkZ2UgbG9naWNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcGx1Z2luSUQgXG4gICAgICogQHBhcmFtIG1ldGhvZCBcbiAgICAgKiBAcGFyYW0gYXJncyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2V4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGFyZ3M6IEJsb2IpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT47XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZVJvdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAvYXBpLyR7cGx1Z2luSUR9JHttZXRob2R9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhlY3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU6IHN0cmluZywgYXJnczogVFNlcmlhbGl6YWJsZSk6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leGVjdXRlKHBsdWdpbklELCBtZXRob2QsIGNvbnRlbnRUeXBlLCB0aGlzLiRzZXJpYWxpemVyLnNlcmlhbGl6ZShhcmdzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNhbGxiYWNrQ29udGV4dChjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNhbGxiYWNrKGNiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsZWFzZUNhbGxiYWNrKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VDYWxsYmFjayhpZCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5JztcbmltcG9ydCB7IEZ1c2VBUEkgfSBmcm9tICcuL0Z1c2VBUEknO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtJztcbmltcG9ydCB7IElPU1NjaGVtZUZ1c2VBUEkgfSBmcm9tIFwiLi9pb3MvSU9TU2NoZW1lRnVzZUFQSVwiO1xuaW1wb3J0IHsgQW5kcm9pZFNjaGVtZUZ1c2VBUEkgfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEknO1xuXG4vKipcbiAqIEEgRnVzZUFQSSBmYWN0b3J5IHRoYXQgdXNlcyB0aGUgSFRUUC9hcHAgc2NoZW1lIGFzIHRoZSBicmlkZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlQVBJRmFjdG9yeSBleHRlbmRzIEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgIFxuICAgIHByaXZhdGUgJGlvc1NjaGVtZTogRnVzZUFQSTtcbiAgICBwcml2YXRlICRhbmRyb2lkU2NoZW1lOiBGdXNlQVBJO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIFJlYWxpc3RpY2FsbHkgdGhlcmUgd2lsbCBvbmx5IGJlIG9uZSBvciB0aGUgb3RoZXIgc2V0LlxuICAgICAgICB0aGlzLiRpb3NTY2hlbWUgPSBudWxsO1xuICAgICAgICB0aGlzLiRhbmRyb2lkU2NoZW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcnJpZGUgY3JlYXRlKHBsYXRmb3JtOiBQbGF0Zm9ybSk6IEZ1c2VBUEkge1xuICAgICAgICBzd2l0Y2ggKHBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLklPUzogcmV0dXJuIHRoaXMuX2NyZWF0ZWlPU0FQSSgpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5BTkRST0lEOiByZXR1cm4gdGhpcy5fY3JlYXRlQW5kcm9pZEFQSSgpO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBwbGF0Zm9ybTogJyArIHBsYXRmb3JtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlaU9TQVBJKCk6IEZ1c2VBUEkge1xuICAgICAgICBpZiAoIXRoaXMuJGlvc1NjaGVtZSkge1xuICAgICAgICAgICAgdGhpcy4kaW9zU2NoZW1lID0gbmV3IElPU1NjaGVtZUZ1c2VBUEkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kaW9zU2NoZW1lO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlQW5kcm9pZEFQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgaWYgKCF0aGlzLiRhbmRyb2lkU2NoZW1lKSB7XG4gICAgICAgICAgICB0aGlzLiRhbmRyb2lkU2NoZW1lID0gbmV3IEFuZHJvaWRTY2hlbWVGdXNlQVBJKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGFuZHJvaWRTY2hlbWU7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBGdXNlUmVzcG9uc2VSZWFkZXIgfSBmcm9tIFwiLi9GdXNlUmVzcG9uc2VSZWFkZXJcIjtcbmltcG9ydCB7IEZ1c2VFcnJvciwgSUZ1c2VFcnJvclNlcmlhbGl6ZWQgfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBGdXNlQVBJUmVzcG9uc2Uge1xuICAgIHByaXZhdGUgJGNvbnRlbnQ6IEFycmF5QnVmZmVyO1xuICAgIHByaXZhdGUgJGhlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgICBwcml2YXRlICRzdGF0dXM6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZW50OiBBcnJheUJ1ZmZlciwgaGVhZGVyczogc3RyaW5nIHwgbnVsbCwgc3RhdHVzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLiRjb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy4kaGVhZGVycyA9IHRoaXMuJHBhcnNlSGVhZGVycyhoZWFkZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFcnJvcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0YXR1cyA+PSA0MDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGxlblN0cjogc3RyaW5nID0gdGhpcy4kaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpPy5bMF07XG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHBhcnNlSW50KGxlblN0cik7XG4gICAgICAgIGlmIChpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LlswXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQXJyYXlCdWZmZXIoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQmxvYigpOiBQcm9taXNlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt0aGlzLiRjb250ZW50XSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlYWRBc1RleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNUZXh0KHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNKU09OPFQgPSB1bmtub3duPigpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNKU09OKHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNFcnJvcigpOiBQcm9taXNlPEZ1c2VFcnJvcj4ge1xuICAgICAgICBsZXQgc2VyaWFsaXplZEVycm9yOiBJRnVzZUVycm9yU2VyaWFsaXplZCA9IGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNKU09OKHRoaXMuJGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gRnVzZUVycm9yLmZyb21TZXJpYWxpemVkKHNlcmlhbGl6ZWRFcnJvcik7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhlYWRlcnMoKTogTWFwPHN0cmluZywgc3RyaW5nW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGhlYWRlcnM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhlYWRlcihrZXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGhlYWRlcnMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSAkcGFyc2VIZWFkZXJzKGhlYWRlcnM6IHN0cmluZyB8IG51bGwpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICAgICAgICBsZXQgbWFwOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxpbmVzOiBzdHJpbmdbXSA9IGhlYWRlcnMuc3BsaXQoJ1xcclxcbicpO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaW5lOiBzdHJpbmdbXSA9IGxpbmVzW2ldLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBsZXQga2V5OiBzdHJpbmcgPSBsaW5lWzBdO1xuICAgICAgICAgICAgaWYgKCFtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0KGtleSwgW10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGVhZGVyVmFsdWU6IHN0cmluZ1tdID0gbWFwLmdldChrZXkpO1xuICAgICAgICAgICAgaGVhZGVyVmFsdWUucHVzaChsaW5lWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIFROYXRpdmVDYWxsYmFja0Z1bmN0aW9uXG59IGZyb20gJy4vaW50ZXJuYWxzJztcbmltcG9ydCAqIGFzIFVVSUQgZnJvbSAndXVpZCc7XG5cbmV4cG9ydCB0eXBlIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyID0gKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcblxud2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcyA9IG5ldyBNYXA8c3RyaW5nLCBUTmF0aXZlQ2FsbGJhY2tGdW5jdGlvbj4oKTtcblxud2luZG93Ll9fYnRmdXNlX2RvQ2FsbGJhY2sgPSBmdW5jdGlvbihjYWxsYmFja0lEOiBzdHJpbmcsIGRhdGE6IHN0cmluZykge1xuICAgIGlmIChjYWxsYmFja0lEICYmIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuaGFzKGNhbGxiYWNrSUQpKSB7XG4gICAgICAgIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuZ2V0KGNhbGxiYWNrSUQpKGRhdGEpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQSBzaW5nbGV0b24gbWFuYWdlciB0byBtYW5hZ2UgbmF0aXZlIGNhbGxiYWNrcy5cbiAqIFxuICogQ3JlYXRlIGEgY2FsbGJhY2sgY29udGV4dCBhbmQgcGFzcyB0aGUgcmV0dXJuIGNvbnRleHQgaWQgdG8gbmF0aXZlIGNsaWVudHMsXG4gKiBpbiB3aGljaCB0aGV5IGNhbiB1c2UgdG8gcmVzcG9uZCBiYWNrLlxuICogXG4gKiBOb3RlIHRoYXQgcGx1Z2luIEFQSXMgYXJlIGZhciBtb3JlIGVmZmljaWVudCBhbmQgY2FuIGhhbmRsZSBhIGRpdmVyc2Ugc2V0IG9mIGRhdGEsXG4gKiBpbmNsdWRpbmcgbGFyZ2UgcGF5bG9hZHMsIHNvIHdoZW4gcG9zc2libGUgaXQncyBiZXN0IHRvIHVzZSBhIHBsdWdpbiBBUEkgaW5zdGVhZCBvZiBhXG4gKiBjYWxsYmFjayBBUEkuXG4gKiBcbiAqIFRoaXMgY2FsbGJhY2sgQVBJIGlzIGhvd2V2ZXIsIHVzZWZ1bCBmb3IgYnVpbGRpbmcgbGlzdGVuZXIga2luZCBvZiBzZXJ2aWNlcyB3aGVyZSB0aGUgbmF0aXZlXG4gKiBuZWVkcyB0byBjb250aW5vdXNseSBjYWxsYmFjayB0byB0aGUgd2VidmlldyB3aXRoIHNtYWxsIGRhdGEgcGFja2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VDYWxsYmFja01hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljICRpbnN0YW5jZTogRnVzZUNhbGxiYWNrTWFuYWdlcjtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBGdXNlQ2FsbGJhY2tNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFGdXNlQ2FsbGJhY2tNYW5hZ2VyLiRpbnN0YW5jZSkge1xuICAgICAgICAgICAgRnVzZUNhbGxiYWNrTWFuYWdlci4kaW5zdGFuY2UgPSBuZXcgRnVzZUNhbGxiYWNrTWFuYWdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuJGluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFjayhjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIpOiBzdHJpbmcge1xuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IFVVSUQudjQoKTtcbiAgICAgICAgd2luZG93Ll9fYnRmdXNlX2NhbGxiYWNrcy5zZXQoaWQsIChkYXRhOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGNiKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbGVhc2VDYWxsYmFjayhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5fX2J0ZnVzZV9jYWxsYmFja3MuZGVsZXRlKGlkKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEFic3RyYWN0RnVzZUFQSUZhY3RvcnkgfSBmcm9tICcuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnknO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHtcbiAgICBGdXNlUnVudGltZSxcbiAgICBJUnVudGltZUluZm8sXG4gICAgVFBhdXNlQ2FsbGJhY2tIYW5kbGVyLFxuICAgIFRSZXN1bWVDYWxsYmFja0hhbmRsZXJcbn0gZnJvbSAnLi9wbHVnaW5zL0Z1c2VSdW50aW1lJztcbmltcG9ydCB7VmVyc2lvbn0gZnJvbSAnLi9WZXJzaW9uJztcbmltcG9ydCB7SUZ1c2VMb2dnZXJ9IGZyb20gJy4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHsgQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSc7XG5cbi8qKlxuICogQSBjb250ZXh0IGNsYXNzIHRoYXQgaG9sZHMgRnVzZSBGcmFtZXdvcmsgc3RhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VDb250ZXh0IHtcbiAgICBwcml2YXRlICRwbGF0Zm9ybTogUGxhdGZvcm07XG4gICAgcHJpdmF0ZSAkcnVudGltZTogRnVzZVJ1bnRpbWU7XG4gICAgcHJpdmF0ZSAkcnVudGltZVZlcnNpb246IFZlcnNpb247XG4gICAgcHJpdmF0ZSAkcnVudGltZUluZm86IElSdW50aW1lSW5mbztcbiAgICBwcml2YXRlICRkZWZhdWx0QVBJRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeTtcbiAgICAvLyBwcml2YXRlICRkZWZhdWx0TG9nZ2VyOiBJRnVzZUxvZ2dlcjtcbiAgICBwcml2YXRlICRsb2dnZXI6IElGdXNlTG9nZ2VyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgIGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnksXG4gICAgICAgIGxvZ2dlckZhY3Rvcnk6IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnlcbiAgICApIHtcbiAgICAgICAgdGhpcy4kcGxhdGZvcm0gPSBwbGF0Zm9ybTtcbiAgICAgICAgdGhpcy4kbG9nZ2VyID0gbG9nZ2VyRmFjdG9yeS5jcmVhdGUoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJHJ1bnRpbWVWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy4kZGVmYXVsdEFQSUZhY3RvcnkgPSBhcGlGYWN0b3J5O1xuICAgICAgICB0aGlzLiRydW50aW1lID0gbmV3IEZ1c2VSdW50aW1lKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMb2dnZXIoKTogSUZ1c2VMb2dnZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kbG9nZ2VyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREZWZhdWx0QVBJRmFjdG9yeSgpOiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGRlZmF1bHRBUElGYWN0b3J5O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQbGF0Zm9ybSgpOiBQbGF0Zm9ybSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRwbGF0Zm9ybTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jICRnZXRSdW50aW1lSW5mbygpOiBQcm9taXNlPElSdW50aW1lSW5mbz4ge1xuICAgICAgICBpZiAoIXRoaXMuJHJ1bnRpbWVJbmZvKSB7XG4gICAgICAgICAgICB0aGlzLiRydW50aW1lSW5mbyA9IGF3YWl0IHRoaXMuJHJ1bnRpbWUuZ2V0SW5mbygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJHJ1bnRpbWVJbmZvO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRQbGF0Zm9ybVZlcnNpb24oKTogUHJvbWlzZTxWZXJzaW9uPiB7XG4gICAgICAgIGlmICghdGhpcy4kcnVudGltZVZlcnNpb24pIHtcbiAgICAgICAgICAgIGxldCBpbmZvOiBJUnVudGltZUluZm8gPSBhd2FpdCB0aGlzLiRnZXRSdW50aW1lSW5mbygpO1xuICAgICAgICAgICAgdGhpcy4kcnVudGltZVZlcnNpb24gPSBWZXJzaW9uLnBhcnNlVmVyc2lvblN0cmluZyhpbmZvLnZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy4kcnVudGltZVZlcnNpb247XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGlzRGVidWdNb2RlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBsZXQgaW5mbzogSVJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kZ2V0UnVudGltZUluZm8oKTtcbiAgICAgICAgcmV0dXJuIGluZm8uZGVidWdNb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFjazogVFBhdXNlQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS51bnJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrSUQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2s6IFRSZXN1bWVDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHJ1bnRpbWUudW5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2tJRCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeVwiO1xuaW1wb3J0IHsgQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vRnVzZUFQSUZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSBcIi4vRnVzZUNvbnRleHRcIjtcbmltcG9ydCB7IEZ1c2VMb2dnZXJGYWN0b3J5IH0gZnJvbSBcIi4vRnVzZUxvZ2dlckZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VMb2dnZXJMZXZlbCB9IGZyb20gXCIuL0Z1c2VMb2dnZXJMZXZlbFwiO1xuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHsgUGxhdGZvcm1SZXNvbHZlciB9IGZyb20gXCIuL1BsYXRmb3JtUmVzb2x2ZXJcIjtcblxuZXhwb3J0IGNsYXNzIEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgcHJpdmF0ZSAkcGxhdGZvcm1SZXNvbHZlcjogUGxhdGZvcm1SZXNvbHZlcjtcbiAgICBwcml2YXRlICRsb2dnZXJGYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5IHwgbnVsbDtcbiAgICBwcml2YXRlICRhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHwgbnVsbDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kbG9nZ2VyRmFjdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMuJGFwaUZhY3RvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybVJlc29sdmVyID0gbmV3IFBsYXRmb3JtUmVzb2x2ZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGxhdGZvcm1SZXNvbHZlcihyZXNvbHZlcjogUGxhdGZvcm1SZXNvbHZlcik6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtUmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFQSUZhY3RvcnkoZmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSk6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJGFwaUZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TG9nZ2VyRmFjdG9yeShmYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5KTogRnVzZUNvbnRleHRCdWlsZGVyIHtcbiAgICAgICAgdGhpcy4kbG9nZ2VyRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBfaXNEZWJ1Z01vZGUoY29udGV4dDogRnVzZUNvbnRleHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGNvbnRleHQuaXNEZWJ1Z01vZGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYnVpbGQoKTogUHJvbWlzZTxGdXNlQ29udGV4dD4ge1xuICAgICAgICBsZXQgcGxhdGZvcm06IFBsYXRmb3JtID0gdGhpcy4kcGxhdGZvcm1SZXNvbHZlci5yZXNvbHZlKCk7XG5cbiAgICAgICAgbGV0IGFwaUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnk7XG4gICAgICAgIGlmICh0aGlzLiRhcGlGYWN0b3J5KSB7XG4gICAgICAgICAgICBhcGlGYWN0b3J5ID0gdGhpcy4kYXBpRmFjdG9yeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFwaUZhY3RvcnkgPSBuZXcgRnVzZUFQSUZhY3RvcnkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2dnZXJGYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5O1xuICAgICAgICBpZiAodGhpcy4kbG9nZ2VyRmFjdG9yeSkge1xuICAgICAgICAgICAgbG9nZ2VyRmFjdG9yeSA9IHRoaXMuJGxvZ2dlckZhY3RvcnlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlckZhY3RvcnkgPSBuZXcgRnVzZUxvZ2dlckZhY3RvcnkocGxhdGZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbnRleHQ6IEZ1c2VDb250ZXh0ID0gbmV3IEZ1c2VDb250ZXh0KHBsYXRmb3JtLCBhcGlGYWN0b3J5LCBsb2dnZXJGYWN0b3J5KTtcblxuICAgICAgICBsZXQgaXNEZWJ1Z01vZGU6IGJvb2xlYW4gPSBhd2FpdCB0aGlzLl9pc0RlYnVnTW9kZShjb250ZXh0KTtcbiAgICAgICAgbGV0IGxvZ2dlcjogSUZ1c2VMb2dnZXIgPSBjb250ZXh0LmdldExvZ2dlcigpO1xuICAgICAgICBsb2dnZXIuZW5hYmxlTmF0aXZlQnJpZGdlKGlzRGVidWdNb2RlKTtcbiAgICAgICAgbGV0IGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwgPSBsb2dnZXIuZ2V0TGV2ZWwoKTtcbiAgICAgICAgbGV2ZWwgfD0gRnVzZUxvZ2dlckxldmVsLkRFQlVHO1xuICAgICAgICBsb2dnZXIuc2V0TGV2ZWwobGV2ZWwpO1xuXG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tIFwiLi9GdXNlU2VyaWFsaXplclwiO1xuaW1wb3J0IHsgSVNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL0lTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IFRGdXNlU2VyaWFsaXphYmxlLCBUU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vVFNlcmlhbGl6YWJsZVwiO1xuXG5leHBvcnQgdHlwZSBURnVzZUVycm9yQ2F1c2UgPSBzdHJpbmcgfCBFcnJvciB8IEZ1c2VFcnJvciB8IG51bGw7XG5cbmludGVyZmFjZSBfSUZ1c2VFcnJvclNlcmlhbGl6ZWQge1xuICAgIGRvbWFpbjogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgc3RhY2s/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElGdXNlRXJyb3JTZXJpYWxpemVkID0gVEZ1c2VTZXJpYWxpemFibGU8X0lGdXNlRXJyb3JTZXJpYWxpemVkPjtcblxuZXhwb3J0IGNsYXNzIEZ1c2VFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgSVNlcmlhbGl6YWJsZSB7XG4gICAgcHJpdmF0ZSAkZG9tYWluOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSAkbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgJGNhdXNlOiBURnVzZUVycm9yQ2F1c2U7XG4gICAgcHJpdmF0ZSAkY29kZTogbnVtYmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRvbWFpbjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNhdXNlPzogVEZ1c2VFcnJvckNhdXNlLCBjb2RlPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMuJGRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgdGhpcy4kbWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuJGNvZGUgPSBjb2RlIHx8IDA7XG4gICAgICAgIHRoaXMuJGNhdXNlID0gY2F1c2UgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWVzc2FnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4kbWVzc2FnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RG9tYWluKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRkb21haW47XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENhdXNlKCk6IFRGdXNlRXJyb3JDYXVzZSB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy4kY2F1c2U7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzZXJpYWxpemUoKTogSUZ1c2VFcnJvclNlcmlhbGl6ZWQge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9tYWluOiB0aGlzLmdldERvbWFpbigpLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5nZXRNZXNzYWdlKCksXG4gICAgICAgICAgICBjb2RlOiB0aGlzLmdldENvZGUoKSxcbiAgICAgICAgICAgIHN0YWNrOiB0aGlzLnN0YWNrXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB3cmFwKGVycm9yOiBzdHJpbmcgfCBFcnJvciB8IEZ1c2VFcnJvciB8IElGdXNlRXJyb3JTZXJpYWxpemVkIHwgdW5rbm93bik6IEZ1c2VFcnJvciB7XG4gICAgICAgIGxldCBmZXJyOiBGdXNlRXJyb3IgPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoJ1Vua25vd24nLCBlcnJvciwgbnVsbCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBGdXNlRXJyb3IpIHtcbiAgICAgICAgICAgIGZlcnIgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBmZXJyID0gbmV3IEZ1c2VFcnJvcihlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlLCBlcnJvciwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoRnVzZUVycm9yLiRpc1NlcmlhbGl6ZWRGdXNlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICBmZXJyID0gRnVzZUVycm9yLmZyb21TZXJpYWxpemVkKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vud3JhcHBhYmxlIEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoJ0Z1c2VFcnJvcicsICdVbndyYXBwYWJsZSBlcnJvcicsIG51bGwsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZlcnI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmcm9tU2VyaWFsaXplZChlcnJvcjogSUZ1c2VFcnJvclNlcmlhbGl6ZWQpOiBGdXNlRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEZ1c2VFcnJvcihlcnJvci5kb21haW4sIGVycm9yLm1lc3NhZ2UsIG51bGwsIGVycm9yLmNvZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuICdGdXNlRXJyb3InO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljICRpc1NlcmlhbGl6ZWRGdXNlRXJyb3IoZXJyb3I6IGFueSk6IGVycm9yIGlzIElGdXNlRXJyb3JTZXJpYWxpemVkIHtcbiAgICAgICAgcmV0dXJuICdtZXNzYWdlJyBpbiBlcnJvciAmJiAnZG9tYWluJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3I7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge1xuICAgIElGdXNlTG9nZ2VyLCBJTmF0aXZlTG9nRW50cnlcbn0gZnJvbSAnLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQge1RTZXJpYWxpemFibGV9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5pbXBvcnQge0lTZXJpYWxpemFibGV9IGZyb20gJy4vSVNlcmlhbGl6YWJsZSc7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tICcuL0Z1c2VMb2dnZXJMZXZlbCc7XG5cbmV4cG9ydCBjbGFzcyBGdXNlTG9nZ2VyU2VyaWFsaXplciB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplVG9TdHJpbmcob2JqOiBUU2VyaWFsaXphYmxlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gYWxsIGVsc2UgZmFpbHMsIGF0dGVtcHQgdG8gSlNPTiBzdHJpbmdpZnlcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgNCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVQcmltaXRpdmVUb1N0cmluZyhvYmo6IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVFcnJvclRvU3RyaW5nKG9iajogRXJyb3IpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc2VyaWFsaXplZEVycm9yID0ge1xuICAgICAgICAgICAgbmFtZTogb2JqLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBvYmoubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBvYmouc3RhY2tcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc2VyaWFsaXplZEVycm9yLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmo6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlcmlhbGl6ZShvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdXQ6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICBvdXQgPSBgW0Jsb2IgJHtvYmoudHlwZSB8fCAnQmluYXJ5J30gKCR7b2JqLnNpemV9IGJ5dGVzKV1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBvdXQgPSB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBvdXQgPSBgW0FycmF5QnVmZmVyICgke29iai5ieXRlTGVuZ3RofSBieXRlcyldYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0lTZXJpYWxpemFibGUob2JqKSkge1xuICAgICAgICAgICAgb3V0ID0gdGhpcy5zZXJpYWxpemUob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNob3VsZCBiZSBlaXRoZXIgSlNPTiBvYmplY3RzIG9yIGpzb24gYXJyYXlzIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICAgIG91dCA9IHRoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfaXNJU2VyaWFsaXphYmxlKHg6IGFueSk6IHggaXMgSVNlcmlhbGl6YWJsZSB7XG4gICAgICAgIHJldHVybiAhIXguc2VyaWFsaXplICYmIHR5cGVvZiB4LnNlcmlhbGl6ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG59XG5cbi8qKlxuICogQSBiYXNlIGxvZ2dlciBpbXBsZW1lbnRhdGlvbiB3aGljaCBpbmNsdWRlcyBhIHNlcmlhbGl6ZXIgZm9yIGNvbW1vbiB0eXBlcy5cbiAqIEl0IHdpbGwgc2VyaWFsaXplL2FjY2VwdCBhbGwgdmFsdWVzIHRoYXQgVFNlcmlhbGl6YWJsZSBhY2NlcHRzLCBob3dldmVyIEJsb2IvQXJyYXlCdWZmZXJcbiAqIG9yIG90aGVyIGJpbmFyeSBkYXRhIHR5cGVzIHdpbGwgbm90IGJlIHNlcmlhbGl6ZWQuIEluc3RlYWQgaXQgd2lsbCBwcmludCBhblxuICogb2JqZWN0IGlkZW50aWZpZXIsIHdpdGggbWltZSB0eXBlIGlmIHByZXNlbnQsIGFsb25nIHdpdGggdGhlIHNpemUgb2YgdGhlIGJ1ZmZlci5cbiAqIFxuICogVGhlIGJhc2UgbG9nZ2VyIGRvZXMgbm90IHByb3ZpZGUgYW55IG5hdGl2ZSBicmlkZ2luZy4gV2hpbGUgdXNhYmxlIGZvciBwdXJlbHkgd2VidmlldyBzaWRlLFxuICogdXNlIHRoZSBGdXNlTG9nZ2VyRmFjdG9yeSB0byBnZXQgYSBsb2dnZXIgc3BlY2lmaWMgZm9yIHlvdXIgcnVudGltZSBlbnZpcm9ubWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VMb2dnZXIgaW1wbGVtZW50cyBJRnVzZUxvZ2dlciB7XG4gICAgcHJpdmF0ZSAkbGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbDtcbiAgICBwcml2YXRlICRlbmFibGVOYXRpdmVCcmlkZ2U6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSAkc2VyaWFsaXplcjogRnVzZUxvZ2dlclNlcmlhbGl6ZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJGVuYWJsZU5hdGl2ZUJyaWRnZSA9IHRydWU7XG4gICAgICAgIHRoaXMuJGxldmVsID0gRnVzZUxvZ2dlckxldmVsLklORk8gfCBGdXNlTG9nZ2VyTGV2ZWwuV0FSTiB8IEZ1c2VMb2dnZXJMZXZlbC5FUlJPUjtcbiAgICAgICAgdGhpcy4kc2VyaWFsaXplciA9IG5ldyBGdXNlTG9nZ2VyU2VyaWFsaXplcigpO1xuICAgICAgICB0aGlzLl9yZWdpc3Rlck5hdGl2ZUNhbGJsYWNrKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9yZWdpc3Rlck5hdGl2ZUNhbGJsYWNrKCk6IHZvaWQge31cblxuICAgIHB1YmxpYyBzZXRMZXZlbChsZXZlbDogRnVzZUxvZ2dlckxldmVsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJGxldmVsID0gbGV2ZWw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExldmVsKCk6IEZ1c2VMb2dnZXJMZXZlbCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRsZXZlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlTmF0aXZlQnJpZGdlKGZsYWc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kZW5hYmxlTmF0aXZlQnJpZGdlID0gISFmbGFnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25OYXRpdmVMb2dFbnRyeShlbnRyeTogSU5hdGl2ZUxvZ0VudHJ5KTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuZ2V0TGV2ZWwoKSAmIGVudHJ5LmxldmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LmxldmVsID09PSBGdXNlTG9nZ2VyTGV2ZWwuU0lMRU5UKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGVudHJ5LmxldmVsKSB7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5ERUJVRzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGVudHJ5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGdXNlTG9nZ2VyTGV2ZWwuSU5GTzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5XQVJOOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLkVSUk9SOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbGV2ZWwgVGhlIGxvZyBsZXZlbCBmb3IgdGhpcyBsb2cgcHJpbnRcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBPdmVycmlkYWJsZSBob29rIHRvIHNlbmQgbG9ncyB0byB0aGUgbmF0aXZlIGVudmlyb25tZW50XG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9sb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHt9XG5cbiAgICBwcml2YXRlICRsb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBhcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLiRlbmFibGVOYXRpdmVCcmlkZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZXJpYWxpemVkQXJnczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VyaWFsaXplZEFyZ3MucHVzaCh0aGlzLiRzZXJpYWxpemVyLnNlcmlhbGl6ZShhcmdzW2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2dUb05hdGl2ZShsZXZlbCwgc2VyaWFsaXplZEFyZ3Muam9pbignXFx0JykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWJ1ZyguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuREVCVUcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmRlYnVnKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuREVCVUcsIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbmZvKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5JTkZPKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5pbmZvKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuSU5GTywgYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIHdhcm4oLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLldBUk4pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLndhcm4oLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5XQVJOLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXJyb3IoLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLkVSUk9SKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5lcnJvciguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLkVSUk9SLCBhcmdzKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9GdXNlTG9nZ2VyXCI7XG5pbXBvcnQgeyBJRnVzZUxvZ2dlciB9IGZyb20gXCIuL0lGdXNlTG9nZ2VyXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQge0lPU0Z1c2VMb2dnZXJ9IGZyb20gJy4vaW9zL0lPU0Z1c2VMb2dnZXInO1xuaW1wb3J0IHtBbmRyb2lkRnVzZUxvZ2dlcn0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRGdXNlTG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIEZ1c2VMb2dnZXJGYWN0b3J5IHtcbiAgICBwcml2YXRlICRwbGF0Zm9ybTogUGxhdGZvcm07XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgICAgIHRoaXMuJHBsYXRmb3JtID0gcGxhdGZvcm07XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZSgpOiBJRnVzZUxvZ2dlciB7XG4gICAgICAgIHN3aXRjaCAodGhpcy4kcGxhdGZvcm0pIHtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uSU9TOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSU9TRnVzZUxvZ2dlcigpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5BTkRST0lEOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQW5kcm9pZEZ1c2VMb2dnZXIoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uVEVTVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZ1c2VMb2dnZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuZXhwb3J0IGVudW0gRnVzZUxvZ2dlckxldmVsIHtcbiAgICBTSUxFTlQgID0gMCxcbiAgICBERUJVRyAgID0gMSxcbiAgICBJTkZPICAgID0gMixcbiAgICBXQVJOICAgID0gNCxcbiAgICBFUlJPUiAgID0gOFxufVxuIiwiXG5cbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SUZ1c2VHcmFudFJlc3VsdH0gZnJvbSAnLi9JRnVzZUdyYW50UmVzdWx0JztcbmltcG9ydCB7RnVzZVBlcm1pc3Npb25TdGF0ZX0gZnJvbSAnLi9GdXNlUGVybWlzc2lvblN0YXRlJztcblxuZXhwb3J0IGNsYXNzIEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24gZXh0ZW5kcyBudW1iZXIgPSBudW1iZXI+IHtcbiAgICBwcml2YXRlICRyZXN1bHRzOiBJRnVzZUdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihyZXN1bHRzOiBJRnVzZUdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPikge1xuICAgICAgICB0aGlzLiRyZXN1bHRzID0gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNHcmFudGVkKHBlcm1pc3Npb246IFRTdXBwb3J0ZWRQZXJtaXNzaW9uKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyZXN1bHRzW3Blcm1pc3Npb25dID09PSBGdXNlUGVybWlzc2lvblN0YXRlLkdSQU5URUQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQWxsR3JhbnRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLiRyZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kcmVzdWx0c1tpXSAhPT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5HUkFOVEVEKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlamVjdEp1c3RpZmljYXRpb25zKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuJHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRyZXN1bHRzW2ldID09PSBGdXNlUGVybWlzc2lvblN0YXRlLlJFUVVJUkVTX0pVU1RJRklDQVRJT04pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyZXN1bHRzW2ldID0gRnVzZVBlcm1pc3Npb25TdGF0ZS5ERU5JRUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdWxkSnVzdGlmeSgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLiRyZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kcmVzdWx0c1tpXSA9PT0gRnVzZVBlcm1pc3Npb25TdGF0ZS5SRVFVSVJFU19KVVNUSUZJQ0FUSU9OKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gJy4vQ29udGVudFR5cGUnO1xuaW1wb3J0IHsgRnVzZUFQSVJlc3BvbnNlIH0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHsgRnVzZUVycm9yIH0gZnJvbSAnLi9GdXNlRXJyb3InO1xuaW1wb3J0IHtUQVBJQnJpZGdlRnVuY3Rpb259IGZyb20gJy4vRnVzZVBsdWdpbic7XG5pbXBvcnQge0lGdXNlUGVybWlzc2lvblJlcXVlc3R9IGZyb20gJy4vSUZ1c2VQZXJtaXNzaW9uUmVxdWVzdCc7XG5pbXBvcnQgeyBURnVzZVNlcmlhbGl6YWJsZSB9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5pbXBvcnQge0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHR9IGZyb20gJy4vRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCc7XG5cbi8qKlxuICogSW52b2tlZCB0byBoYW5kbGUgd2hlbiBwZXJtaXNzaW9uIGp1c3RpZmljYXRpb24gaXMgbmVjZXNzYXJ5LlxuICogXG4gKiBUaGlzIGlzIGFuIGFuZHJvaWQgY29uY2VwdCwgc28gaXQgd2lsbCBvbmx5IGJlIGludm9rZWQgb24gQW5kcm9pZCBkZXZpY2VzLFxuICogYXMgaU9TIGhhcyBqdXN0aWZpY2F0aW9uIHRleHQgZW1iZWRkZWQgaW50byB0aGUgYWN0dWFsIHBlcm1pc3Npb24gcHJvbXB0LlxuICogXG4gKiBVc2VyIGRpYWxvZyBzaG91bGQgYmUgZGlzcGxheWVkIHRvIGV4cGxhaW4gd2h5IHRoZSBhcHAgd2FudHMgdG8gdXNlIHRoZSBwZXJtaXNzaW9uLlxuICogQW5kcm9pZCByZWNvbW1lbmRzIGdpdmluZyB0aGUgdXNlciB0aGUgYWJpbGl0eSB0byBhY2NlcHQgb3IgZGVueSBhdCB0aGlzIHRpbWUsIGlmIHRoZSB1c2VyIGRlbnksXG4gKiB0aGVuIHJlc29sdmUgdGhlIHByb21pc2Ugd2lsbCBmYWxzZS5cbiAqIFxuICogUmV0dXJuIHRydWUgaWYgdGhlIHBlcm1pc3Npb24gcmVxdWVzdCBzaG91bGQgcHJvY2VlZC5cbiAqL1xuZXhwb3J0IHR5cGUgVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlciA9ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG5cbmludGVyZmFjZSBfX0lQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50czxUIGV4dGVuZHMgbnVtYmVyPiB7XG4gICAgcGVybWlzc2lvblNldDogVFtdO1xuICAgIGlzSnVzdGlmaWVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBURnVzZVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQgZXh0ZW5kcyBudW1iZXI+ID0gVEZ1c2VTZXJpYWxpemFibGU8X19JUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VD4+O1xuXG5leHBvcnQgdHlwZSBURnVzZUFQSVBlcm1pc3Npb25SZXF1ZXN0PFQgZXh0ZW5kcyBudW1iZXIgPSBudW1iZXI+ID0gVEFQSUJyaWRnZUZ1bmN0aW9uPENvbnRlbnRUeXBlLkpTT04sIFRGdXNlUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VD4+O1xuXG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgdG8gaGFuZGxlIHBlcm1pc3Npb24gcmVxdWVzdC5cbiAqIENvbmNyZXRlIGNsYXNzZXMgc2hvdWxkIGltcGxlbWVudCB0aGUgcHJvdGVjdGVkIF9yZXF1ZXN0IG1ldGhvZCB0byBjYWxsIG9uIHRoZWlyXG4gKiBwZXJtaXNzaW9uIHJlcXVlc3QgRnVzZSBBUEkuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24gZXh0ZW5kcyBudW1iZXI+IGltcGxlbWVudHMgSUZ1c2VQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4ge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRBRzogc3RyaW5nID0gJ1Blcm1pc3Npb25SZXF1ZXN0JztcblxuICAgIHByaXZhdGUgJGFwaTogVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbj47XG4gICAgcHJpdmF0ZSAkcGVybWlzc2lvblNldDogVFN1cHBvcnRlZFBlcm1pc3Npb25bXTtcbiAgICBwcml2YXRlICRqdXN0aWZpY2F0aW9uSGFuZGxlcjogVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlciB8IG51bGw7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYXBpQnJpZGdlOiBURnVzZUFQSVBlcm1pc3Npb25SZXF1ZXN0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPiwgcGVybWlzc2lvblNldDogVFN1cHBvcnRlZFBlcm1pc3Npb25bXSwganVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgPSBudWxsKSB7XG4gICAgICAgIGlmICghcGVybWlzc2lvblNldCB8fCAocGVybWlzc2lvblNldCAmJiBwZXJtaXNzaW9uU2V0Lmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBGdXNlRXJyb3IoRnVzZVBlcm1pc3Npb25SZXF1ZXN0LlRBRywgJ0F0IGxlYXN0IG9uZSBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRhcGkgPSBhcGlCcmlkZ2U7XG4gICAgICAgIHRoaXMuJHBlcm1pc3Npb25TZXQgPSBwZXJtaXNzaW9uU2V0O1xuICAgICAgICB0aGlzLiRqdXN0aWZpY2F0aW9uSGFuZGxlciA9IGp1c3RpZmljYXRpb25IYW5kbGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQZXJtaXNzaW9uU2V0KCk6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy4kcGVybWlzc2lvblNldDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jICRyZXF1ZXN0KGlzSnVzdGlmaWVkOiBib29sZWFuKTogUHJvbWlzZTxGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPj4ge1xuICAgICAgICBsZXQgcmVzcG9uc2U6IEZ1c2VBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMuJGFwaShDb250ZW50VHlwZS5KU09OLCB7XG4gICAgICAgICAgICBwZXJtaXNzaW9uU2V0OiB0aGlzLmdldFBlcm1pc3Npb25TZXQoKSxcbiAgICAgICAgICAgIGlzSnVzdGlmaWVkOiBpc0p1c3RpZmllZFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICB0aHJvdyBhd2FpdCByZXNwb25zZS5yZWFkQXNFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0KGF3YWl0IHJlc3BvbnNlLnJlYWRBc0pTT04oKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyAkb25KdXN0aWZpY2F0aW9uUmVxdWVzdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRqdXN0aWZpY2F0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdQZXJtaXNzaW9uIHJlcXVpcmVzIGp1c3RpZmljYXRpb24sIGJ1dCB0aGlzIHJlcXVlc3QgaGFzIG5vIFRKdXN0aWZpY2F0aW9uSGFuZGxlcicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJGp1c3RpZmljYXRpb25IYW5kbGVyKCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0KCk6IFByb21pc2U8RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4+IHtcbiAgICAgICAgbGV0IHJlc3VsdHM6IEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+ID0gYXdhaXQgdGhpcy4kcmVxdWVzdChmYWxzZSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdHMuc2hvdWxkSnVzdGlmeSgpKSB7XG4gICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy4kb25KdXN0aWZpY2F0aW9uUmVxdWVzdCgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IGF3YWl0IHRoaXMuJHJlcXVlc3QodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnJlamVjdEp1c3RpZmljYXRpb25zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCBlbnVtIEZ1c2VQZXJtaXNzaW9uU3RhdGUge1xuICAgIEdSQU5URUQsXG4gICAgUkVRVUlSRVNfSlVTVElGSUNBVElPTixcbiAgICBERU5JRURcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnlcIjtcbmltcG9ydCB7IEZ1c2VBUEkgfSBmcm9tIFwiLi9GdXNlQVBJXCI7XG5pbXBvcnQge1RGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyfSBmcm9tICcuL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuaW1wb3J0IHsgRnVzZUNvbnRleHQgfSBmcm9tIFwiLi9GdXNlQ29udGV4dFwiO1xuaW1wb3J0IHtGdXNlQVBJUmVzcG9uc2V9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSBcIi4vQ29udGVudFR5cGVcIjtcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9UU2VyaWFsaXphYmxlXCI7XG5pbXBvcnQgeyBGdXNlU2VyaWFsaXplciB9IGZyb20gXCIuL0Z1c2VTZXJpYWxpemVyXCI7XG5cbmV4cG9ydCB0eXBlIFRBUElCcmlkZ2VGdW5jdGlvbjxUQ29udGVudFR5cGUgZXh0ZW5kcyBDb250ZW50VHlwZSA9IENvbnRlbnRUeXBlLCBURGF0YSBleHRlbmRzIFRTZXJpYWxpemFibGUgPSBUU2VyaWFsaXphYmxlPiA9ICh0eXBlPzogVENvbnRlbnRUeXBlLCBkYXRhPzogVERhdGEpID0+IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPjtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBGdXNlIFBsdWdpbnNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZ1c2VQbHVnaW48VEFQSU9wdHMgPSB1bmtub3duPiB7XG4gICAgcHJpdmF0ZSAkY29udGV4dDogRnVzZUNvbnRleHQ7XG4gICAgcHJpdmF0ZSAkYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZXh0OiBGdXNlQ29udGV4dCkge1xuICAgICAgICB0aGlzLiRjb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy4kYXBpRmFjdG9yeSA9IHRoaXMuX2NyZWF0ZUFQSUZhY3RvcnkoKSB8fCBjb250ZXh0LmdldERlZmF1bHRBUElGYWN0b3J5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgQVBJIGJyaWRnZVxuICAgICAqIEBwYXJhbSBwbGF0Zm9ybSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFQSShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUZhY3RvcnkoKS5jcmVhdGUocGxhdGZvcm0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlQVBJRmFjdG9yeSgpOiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9nZXRBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gdGhpcy4kYXBpRmFjdG9yeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUQVBJT3B0cyBpcyBhIHBsdWdpbiBnZW5lcmljIHR5cGUgZGVjbGFyaW5nIG9wdGlvbnMuXG4gICAgICogVXNlciBtYXkgdXNlIHRoaXMgdG8gZGVjbGFyZSBhIHBhdGggb24gaG93IHRvIGdldCBhIHBhcnRpY3VsYXIgRnVzZUFQSS5cbiAgICAgKiBcbiAgICAgKiBUaGlzIEFQSSBtYXkgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzIHRvIHV0aWxpc2UgdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgdG8gc2ltcGx5IHJldHVybiBhIHN0YW5kYXJkIEZ1c2VBUEkuXG4gICAgICogXG4gICAgICogQHBhcmFtIG9wdHMgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9nZXRBUEkob3B0cz86IFRBUElPcHRzKTogRnVzZUFQSSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRnZXRBUEkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RhbmRhcmQgRnVzZUFQSVxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByaXZhdGUgJGdldEFQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFQSUZhY3RvcnkoKS5jcmVhdGUodGhpcy5nZXRDb250ZXh0KCkuZ2V0UGxhdGZvcm0oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNhbGxiYWNrIGNvbnRleHQgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIG5hdGl2ZVxuICAgICAqIFRoZSBuYXRpdmUgY29kZSBjYW4gdXNlIHRoZSBjYWxsYmFja0lEIHRvIGNhbGxiYWNrIHRvIHRoZSBKUyBjb2RlLlxuICAgICAqIFxuICAgICAqIFRoZSBjYWxsYmFjayBjYW4gYmUgdXNlZCBzZXZlcmFsIHRpbWVzLlxuICAgICAqIFxuICAgICAqIFJlbGVhc2UgdGhlIGNhbGxiYWNrIHVzaW5nIF9yZWxlYXNlQ2FsbGJhY2sgd2l0aCB0aGUgZ2l2ZW4gY2FsbGJhY2tJRC5cbiAgICAgKiBUaGVzZSBBUEkgdXNhZ2VzIHNob3VsZCBiZSBwYXJ0IG9mIHlvdXIgcGx1Z2luIEFQSS4gV2hlbiByZWxlYXNpbmcgYSBjYWxsYmFjayxcbiAgICAgKiBhIHN0YW5kYXJkIEFQSSBjYWxsIHNob3VsZCBiZSBtYWRlIHRvIHlvdXIgcGx1Z2luIHRvIHRlbGwgdGhlIG5hdGl2ZSBzaWRlIHRoYXRcbiAgICAgKiB0aGUgY2FsbGJhY2sgaXMgbm8gbG9uZ2VyIHVzYWJsZSwgYW5kIGl0IHNob3VsZCBjbGVhbiB1cCB0aGUgbmF0aXZlIHJlc291cmNlcyBzdXJyb3VuZGluZ1xuICAgICAqIHRoZSBjYWxsYmFjayBjb250ZXh0LlxuICAgICAqIFxuICAgICAqIE5vdGUgdGhhdCBjYWxsYmFjayBkYXRhIHBheWxvYWRzIG9ubHkgc3VwcG9ydHMgc3RyaW5ncy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2IgXG4gICAgICogQHJldHVybnMgU3RyaW5nIC0gY2FsbGJhY2tJRFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY3JlYXRlQ2FsbGJhY2soY2I6IFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyLCBhcGlPcHRzPzogVEFQSU9wdHMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLmNyZWF0ZUNhbGxiYWNrQ29udGV4dChjYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZXMgYSBjcmVhdGVkIGNhbGxiYWNrLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBpZCBjYWxsYmFja0lEXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9yZWxlYXNlQ2FsbGJhY2soaWQ6IHN0cmluZywgYXBpT3B0cz86IFRBUElPcHRzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dldEFQSShhcGlPcHRzKS5yZWxlYXNlQ2FsbGJhY2soaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIEZ1c2VDb250ZXh0XG4gICAgICogXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIGdldENvbnRleHQoKTogRnVzZUNvbnRleHQge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBDb25jcmV0ZSBjbGFzc2VzIHNob3VsZCBpbXBsZW1lbnQgYW5kIHJldHVybiBhIHN0cmluZyB0aGF0IHVuaXF1ZWx5IHJlcHJlc2VudHMgdGhpcyBwbHVnaW4uXG4gICAgICogVGhlIHN0cmluZyBtdXN0IGNvbmZvcm0gdG8gVVJMIGZyYWdtZW50IHJ1bGVzLiBJdCBzaGFsbCBvbmx5IGNvbnRhaW4gdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzOlxuICAgICAqICAtIEFscGhhYmV0aWNhbCBsZXR0ZXJzXG4gICAgICogIC0gTnVtYmVyc1xuICAgICAqICAtIGRvdHMgYW5kIGh5cGhlbnNcbiAgICAgKiBcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2dldElEKCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBsdWdpbiBJRFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJRCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0SUQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZXhlY3V0aW9uIEFQSS4gQ29uY3JldGUgY2xhc3NlcyBjYW4gY2FsbCB0aGlzIHRvIHBlcmZvcm0gY2FsbHMgdG8gdGhlIG5hdGl2ZSBzaWRlLlxuICAgICAqIFxuICAgICAqIFRoZSBjb25jcmV0ZSBjbGFzcyBzaG91bGQgZXhwb3NlIHB1YmxpYyBtZXRob2RzIHdpdGggdHlwZSBpbmZvcm1hdGlvbiBleHBvc2VkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBtZXRob2QgVGhlIG1ldGhvZCBsaW5rLCB0aGlzIHNob3VsZCBtYXRjaCB0aGUgZW5kcG9pbnQgZGVmaW5lZCBpbiB0aGUgbmF0aXZlIEFQSS5cbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGUgdGhlIE1JTUUgdHlwZSBvZiB0aGUgZGF0YSB5b3UgYXJlIHBhc3NpbmcgaW4uXG4gICAgICogQHBhcmFtIGRhdGEgLSBUaGUgZGF0YSB0byBwYXNzIHRvIHRoZSBuYXRpdmUgZW52aXJvbm1lbnRcbiAgICAgKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFRoZSByZXNwb25zZSBib2R5IGZyb20gbmF0aXZlLiBGdXNlUmVzcG9uc2VSZWFkZXIgaGFzIHNvbWUgdXRpbGl0eSBtZXRob2RzIHRvIHJlYWQgdGhlIGRhdGEgaW4gY29tbW9uIGZvcm1hdHMgKGUuZy4gdGV4dCBvciBKU09OKVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhc3luYyBfZXhlYyhtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU/OiBzdHJpbmcsIGRhdGE/OiBUU2VyaWFsaXphYmxlLCBhcGlPcHRzPzogVEFQSU9wdHMpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLmV4ZWN1dGUodGhpcy5nZXRJRCgpLCBtZXRob2QsIGNvbnRlbnRUeXBlLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFQSUJyaWRnZShyb3V0ZTogc3RyaW5nLCBzZXJpYWxpemVyPzogRnVzZVNlcmlhbGl6ZXIpOiBUQVBJQnJpZGdlRnVuY3Rpb24ge1xuICAgICAgICBpZiAoIXNlcmlhbGl6ZXIpIHtcbiAgICAgICAgICAgIHNlcmlhbGl6ZXIgPSBuZXcgRnVzZVNlcmlhbGl6ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3luYyAodHlwZT86IENvbnRlbnRUeXBlLCBkYXRhPzogVFNlcmlhbGl6YWJsZSk6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZXhlYyhyb3V0ZSwgdHlwZSwgc2VyaWFsaXplci5zZXJpYWxpemUoZGF0YSkpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBBIHN0YXRpYyBjbGFzcyB3aXRoIGNvbnZlbmllbmNlIG1ldGhvZHMgZm9yIHJlYWRpbmcgY29tbW9uXG4gKiByZXNwb25zZSBjb250ZW50IGJvZHkgZm9ybWF0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VSZXNwb25zZVJlYWRlciB7XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlYWRBc1RleHQoZGF0YTogQXJyYXlCdWZmZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVhZGVyOiBGaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSg8c3RyaW5nPnJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KG5ldyBCbG9iKFtkYXRhXSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlYWRBc0pTT048VD4oZGF0YTogQXJyYXlCdWZmZXIpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgbGV0IHN0cjogc3RyaW5nID0gYXdhaXQgdGhpcy5yZWFkQXNUZXh0KGRhdGEpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSVNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL0lTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9UU2VyaWFsaXphYmxlXCI7XG5cbmV4cG9ydCBjbGFzcyBGdXNlU2VyaWFsaXplciB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplVG9TdHJpbmcob2JqOiBUU2VyaWFsaXphYmxlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gYWxsIGVsc2UgZmFpbHMsIGF0dGVtcHQgdG8gSlNPTiBzdHJpbmdpZnlcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVQcmltaXRpdmVUb1N0cmluZyhvYmo6IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVFcnJvclRvU3RyaW5nKG9iajogRXJyb3IpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc2VyaWFsaXplZEVycm9yID0ge1xuICAgICAgICAgICAgbmFtZTogb2JqLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBvYmoubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBvYmouc3RhY2tcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc2VyaWFsaXplZEVycm9yLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmo6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlcmlhbGl6ZShvYmo6IFRTZXJpYWxpemFibGUpOiBCbG9iIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmluOiBCbG9iO1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgYmluID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbb2JqXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIGJpbiA9IG5ldyBCbG9iKFt0aGlzLnNlcmlhbGl6ZShvYmouc2VyaWFsaXplKCkpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgZWl0aGVyIEpTT04gb2JqZWN0cyBvciBqc29uIGFycmF5cyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJpbjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2lzSVNlcmlhbGl6YWJsZSh4OiBhbnkpOiB4IGlzIElTZXJpYWxpemFibGUge1xuICAgICAgICByZXR1cm4gISF4LnNlcmlhbGl6ZSAmJiB0eXBlb2YgeC5zZXJpYWxpemUgPT09ICdmdW5jdGlvbic7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gJy4vQ29udGVudFR5cGUnO1xuaW1wb3J0IHtGdXNlQVBJfSBmcm9tICcuL0Z1c2VBUEknO1xuaW1wb3J0IHsgRnVzZUFQSVJlc3BvbnNlIH0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHtGdXNlRXJyb3J9IGZyb20gJy4vRnVzZUVycm9yJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIHRoYXQgdXNlcyBIVFRQIHByb3RvY29sIHRvIG1ha2UgbmF0aXZlIGNhbGxzXG4gKi9cbmV4cG9ydCBjbGFzcyBIVFRQRnVzZUFQSSBleHRlbmRzIEZ1c2VBUEkge1xuICAgIFxuICAgIHByb3RlY3RlZCBhc3luYyBfZ2V0RW5kcG9pbnQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBfaW5pdEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge307XG5cbiAgICBwdWJsaWMgYXN5bmMgYnVpbGRSb3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGxldCBlbmRwb2ludDogc3RyaW5nID0gYXdhaXQgdGhpcy5fZ2V0RW5kcG9pbnQoKTtcbiAgICAgICAgcmV0dXJuIGAke2VuZHBvaW50fSR7dGhpcy5fY3JlYXRlUm91dGUocGx1Z2luSUQsIG1ldGhvZCl9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2V4ZWN1dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcsIGRhdGE6IEJsb2IpOiBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4ge1xuICAgICAgICBsZXQgeGhyOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCBhd2FpdCB0aGlzLmJ1aWxkUm91dGUocGx1Z2luSUQsIG1ldGhvZCkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY29udGVudFR5cGUgPSBDb250ZW50VHlwZS5CSU5BUlk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLl9pbml0SGVhZGVycyh4aHIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZG9SZXF1ZXN0KHhociwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kb1JlcXVlc3QoeGhyOiBYTUxIdHRwUmVxdWVzdCwgZGF0YTogQmxvYik6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlOiBGdXNlQVBJUmVzcG9uc2UgPSBuZXcgRnVzZUFQSVJlc3BvbnNlKHhoci5yZXNwb25zZSwgeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLCB4aHIuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChhd2FpdCByZXNwb25zZS5yZWFkQXNFcnJvcigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEZ1c2VFcnJvcignRnVzZUFQSScsICdOZXR3b3JrIEVycm9yJykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9udGltZW91dCA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBGdXNlRXJyb3IoJ0Z1c2VBUEknLCAnQVBJIFRpbWVvdXQnKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9kb1NlbmQoeGhyLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9kb1NlbmQoeGhyOiBYTUxIdHRwUmVxdWVzdCwgZGF0YTogQmxvYik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkICYmIGRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHhoci5zZW5kKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBFbnVtZXJhdGlvbiBmb3Igc3VwcG9ydGVkIHBsYXRmb3Jtc1xuICovXG5leHBvcnQgZW51bSBQbGF0Zm9ybSB7XG4gICAgSU9TID0gMSxcbiAgICBBTkRST0lELFxuICAgIC8qKlxuICAgICAqIFNwZWNpYWxpemVkIHBsYXRmb3JtIHVzZWQgZm9yIHRlc3QgZW52aXJvbm1lbnRzLFxuICAgICAqIHdpbGwgbm90IGJlIHVzZWQgZm9yIHJlZ3VsYXIgcnVudGltZXMuXG4gICAgICovXG4gICAgVEVTVFxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5cbi8qKlxuICogQSBzdHJhdGVneSB0byByZXNvbHZlIHRoZSBydW50aW1lJ3MgcGxhdGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXRmb3JtUmVzb2x2ZXIge1xuICAgIHB1YmxpYyByZXNvbHZlKCk6IFBsYXRmb3JtIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJT1NFbnZpcm9ubWVudCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUGxhdGZvcm0uSU9TO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIG9ubHkgb3RoZXIgc3VwcG9ydGVkIHBsYXRmb3JtIGlzIEFuZHJvaWQsIHNvXG4gICAgICAgICAgICAvLyBpdCdzIGFzc3VtZWRcbiAgICAgICAgICAgIHJldHVybiBQbGF0Zm9ybS5BTkRST0lEO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzSU9TRW52aXJvbm1lbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2J0ZnVzZTonO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FuZHJvaWRFbnZpcm9ubWVudCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzSU9TRW52aXJvbm1lbnQoKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCBjbGFzcyBWZXJzaW9uIHtcbiAgICBwcml2YXRlICRtYWpvcjogbnVtYmVyO1xuICAgIHByaXZhdGUgJG1pbm9yOiBudW1iZXI7XG4gICAgcHJpdmF0ZSAkcGF0Y2g/OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExFU1NfVEhBTjogbnVtYmVyID0gLTE7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFUVVBTDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdSRUFURVJfVEhBTjogbnVtYmVyID0gMTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYWpvcjogbnVtYmVyLCBtaW5vcj86IG51bWJlciwgcGF0Y2g/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kbWFqb3IgPSBtYWpvcjtcbiAgICAgICAgdGhpcy4kbWlub3IgPSBtaW5vciB8fCAwO1xuICAgICAgICB0aGlzLiRwYXRjaCA9IHBhdGNoIHx8IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZVZlcnNpb25TdHJpbmcodmVyc2lvbjogc3RyaW5nKTogVmVyc2lvbiB7XG4gICAgICAgIGxldCBwYXJ0czogc3RyaW5nW10gPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgbGV0IG1ham9yOiBudW1iZXIgPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgIGxldCBtaW5vcjogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICBsZXQgcGF0Y2g6IG51bWJlciA9IHBhcnNlSW50KHBhcnRzWzJdKTtcblxuICAgICAgICBpZiAoaXNOYU4obWFqb3IpKSB7XG4gICAgICAgICAgICBtYWpvciA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4obWlub3IpKSB7XG4gICAgICAgICAgICBtaW5vciA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4ocGF0Y2gpKSB7XG4gICAgICAgICAgICBwYXRjaCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFZlcnNpb24obWFqb3IsIG1pbm9yLCBwYXRjaCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1ham9yKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtYWpvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWlub3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG1pbm9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQYXRjaCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kcGF0Y2g7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLiRtYWpvcn0uJHt0aGlzLiRtaW5vcn0uJHt0aGlzLiRwYXRjaH1gO1xuICAgIH1cblxuICAgIFxuICAgIHB1YmxpYyBjb21wYXJlKGI6IFZlcnNpb24pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIGIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29tcGFyZShsaHM6IFZlcnNpb24sIHJoczogVmVyc2lvbik6IG51bWJlciB7XG4gICAgICAgIGlmIChsaHMuJG1ham9yID09PSByaHMuJG1ham9yICYmIGxocy4kbWlub3IgPT09IHJocy4kbWlub3IgJiYgbGhzLiRwYXRjaCA9PT0gcmhzLiRwYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uRVFVQUw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGhzLiRtYWpvciA9PT0gcmhzLiRtYWpvcikge1xuICAgICAgICAgICAgaWYgKGxocy4kbWlub3IgPT09IHJocy4kbWlub3IpIHtcbiAgICAgICAgICAgICAgICBpZiAobGhzLiRwYXRjaCA9PT0gcmhzLiRwYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGRuJ3QgaGF2ZSByZWFjaGVkIGhlcmUuLi4gYXMgaXQgc2hvdWxkIGhhdmUgYmVlbiBjYXVnaHQgYnkgdGhlIHNpbXBsZSB0ZXN0IGFib3ZlIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBmb3IgY29uc2lzdGVuY3kgd2Ugd2lsbCBrZWVwIGl0IGhlcmUuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLkVRVUFMXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGhzLiRwYXRjaCA+IHJocy4kcGF0Y2ggPyBWZXJzaW9uLkdSRUFURVJfVEhBTiA6IFZlcnNpb24uTEVTU19USEFOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaHMuJG1pbm9yID4gcmhzLiRtaW5vciA/IFZlcnNpb24uR1JFQVRFUl9USEFOIDogVmVyc2lvbi5MRVNTX1RIQU47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGhzLiRtYWpvciA+IHJocy4kbWFqb3IgPyBWZXJzaW9uLkdSRUFURVJfVEhBTiA6IFZlcnNpb24uTEVTU19USEFOO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJTmF0aXZlTG9nRW50cnkgfSBmcm9tICcuLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQge0Z1c2VMb2dnZXJ9IGZyb20gJy4uL0Z1c2VMb2dnZXInO1xuaW1wb3J0IHtGdXNlTG9nZ2VyTGV2ZWx9IGZyb20gJy4uL0Z1c2VMb2dnZXJMZXZlbCc7XG5pbXBvcnQgeyBGdXNlQ2FsbGJhY2tNYW5hZ2VyIH0gZnJvbSAnLi4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBBbmRyb2lkRnVzZUxvZ2dlciBleHRlbmRzIEZ1c2VMb2dnZXIge1xuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfbG9nVG9OYXRpdmUobGV2ZWw6IEZ1c2VMb2dnZXJMZXZlbCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5CVEZ1c2VOYXRpdmUubG9nKGxldmVsLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7XG4gICAgICAgIHdpbmRvdy5CVEZ1c2VOYXRpdmUuc2V0TG9nQ2FsbGJhY2soRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNhbGxiYWNrKChwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnRyeTogSU5hdGl2ZUxvZ0VudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZW50cnkgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9vbk5hdGl2ZUxvZ0VudHJ5KGVudHJ5KTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtIVFRQRnVzZUFQSX0gZnJvbSAnLi4vSFRUUEZ1c2VBUEknO1xuXG4vKipcbiAqIEEgRnVzZSBBUEkgaW1wbGVtZW50YXRpb24gZm9yIGFuIGVtYmVkZGVkIEhUVFAgc2VydmVyIHRvIGJyaWRnZSB0aGUgSlMgYW5kIE5hdGl2ZSBBUEkgY2FsbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbmRyb2lkU2NoZW1lRnVzZUFQSSBleHRlbmRzIEhUVFBGdXNlQVBJIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgX2dldEVuZHBvaW50KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9sb2NhbGhvc3Q6JHt3aW5kb3cuQlRGdXNlTmF0aXZlLmdldEFQSVBvcnQoKX1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfaW5pdEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1GdXNlLVNlY3JldCcsIHdpbmRvdy5CVEZ1c2VOYXRpdmUuZ2V0QVBJU2VjcmV0KCkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLy8gQ29tbW9uIEFQSVxuZXhwb3J0IHtQbGF0Zm9ybX0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5leHBvcnQge1BsYXRmb3JtUmVzb2x2ZXJ9IGZyb20gJy4vUGxhdGZvcm1SZXNvbHZlcic7XG5leHBvcnQge0Z1c2VDb250ZXh0fSBmcm9tICcuL0Z1c2VDb250ZXh0JztcbmV4cG9ydCB7RnVzZUNvbnRleHRCdWlsZGVyfSBmcm9tICcuL0Z1c2VDb250ZXh0QnVpbGRlcic7XG5leHBvcnQge1ZlcnNpb259IGZyb20gJy4vVmVyc2lvbic7XG5leHBvcnQge1xuICAgIEZ1c2VBUEksXG4gICAgVEZ1c2VBUElSZXNwb25zZURhdGEsXG4gICAgSUZ1c2VBUElDYWxsUGFja2V0XG59IGZyb20gJy4vRnVzZUFQSSc7XG5leHBvcnQge0Z1c2VDYWxsYmFja01hbmFnZXIsIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyfSBmcm9tICcuL0Z1c2VDYWxsYmFja01hbmFnZXInO1xuZXhwb3J0IHtGdXNlQVBJUmVzcG9uc2V9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmV4cG9ydCB7Q29udGVudFR5cGV9IGZyb20gJy4vQ29udGVudFR5cGUnO1xuZXhwb3J0IHtGdXNlUmVzcG9uc2VSZWFkZXJ9IGZyb20gJy4vRnVzZVJlc3BvbnNlUmVhZGVyJztcbmV4cG9ydCB7RnVzZUFQSUZhY3Rvcnl9IGZyb20gJy4vRnVzZUFQSUZhY3RvcnknO1xuZXhwb3J0IHtBYnN0cmFjdEZ1c2VBUElGYWN0b3J5fSBmcm9tICcuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnknO1xuZXhwb3J0IHtcbiAgICBGdXNlUnVudGltZSxcbiAgICBUUGF1c2VDYWxsYmFja0hhbmRsZXIsXG4gICAgVFJlc3VtZUNhbGxiYWNrSGFuZGxlcixcbiAgICBJUnVudGltZUluZm9cbn0gZnJvbSAnLi9wbHVnaW5zL0Z1c2VSdW50aW1lJztcbmV4cG9ydCB7RnVzZVBsdWdpbiwgVEFQSUJyaWRnZUZ1bmN0aW9ufSBmcm9tICcuL0Z1c2VQbHVnaW4nO1xuZXhwb3J0IHtIVFRQRnVzZUFQSX0gZnJvbSAnLi9IVFRQRnVzZUFQSSc7XG5leHBvcnQge0Z1c2VFcnJvcn0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG4vLyBVdGlsaXRpZXNcbmV4cG9ydCB7SVNlcmlhbGl6YWJsZX0gZnJvbSAnLi9JU2VyaWFsaXphYmxlJztcbmV4cG9ydCB7VFNlcmlhbGl6YWJsZSwgVEZ1c2VTZXJpYWxpemFibGV9IGZyb20gJy4vVFNlcmlhbGl6YWJsZSc7XG5leHBvcnQge0Z1c2VTZXJpYWxpemVyfSBmcm9tICcuL0Z1c2VTZXJpYWxpemVyJztcbmV4cG9ydCB7SUZ1c2VQZXJtaXNzaW9uUmVxdWVzdH0gZnJvbSAnLi9JRnVzZVBlcm1pc3Npb25SZXF1ZXN0JztcbmV4cG9ydCB7RnVzZVBlcm1pc3Npb25TdGF0ZX0gZnJvbSAnLi9GdXNlUGVybWlzc2lvblN0YXRlJztcbmV4cG9ydCB7XG4gICAgRnVzZVBlcm1pc3Npb25SZXF1ZXN0LFxuICAgIFRGdXNlQVBJUGVybWlzc2lvblJlcXVlc3QsXG4gICAgVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlcixcbiAgICBURnVzZVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzXG59IGZyb20gJy4vRnVzZVBlcm1pc3Npb25SZXF1ZXN0JztcbmV4cG9ydCB7SUZ1c2VHcmFudFJlc3VsdH0gZnJvbSAnLi9JRnVzZUdyYW50UmVzdWx0JztcbmV4cG9ydCB7RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdH0gZnJvbSAnLi9GdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0JztcblxuLy8gTG9nZ2VyXG5leHBvcnQge0Z1c2VMb2dnZXJMZXZlbH0gZnJvbSAnLi9GdXNlTG9nZ2VyTGV2ZWwnO1xuZXhwb3J0IHtJRnVzZUxvZ2dlciwgSU5hdGl2ZUxvZ0VudHJ5fSBmcm9tICcuL0lGdXNlTG9nZ2VyJztcbmV4cG9ydCB7RnVzZUxvZ2dlciwgRnVzZUxvZ2dlclNlcmlhbGl6ZXJ9IGZyb20gJy4vRnVzZUxvZ2dlcic7XG5leHBvcnQge0Fic3RyYWN0RnVzZUxvZ2dlckZhY3Rvcnl9IGZyb20gJy4vQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSc7XG5leHBvcnQge0Z1c2VMb2dnZXJGYWN0b3J5fSBmcm9tICcuL0Z1c2VMb2dnZXJGYWN0b3J5JztcblxuLy8gaU9TIFNwZWNpZmljIEFQSXMgLyBJbXBsZW1lbnRhdGlvbnNcbmV4cG9ydCB7SU9TU2NoZW1lRnVzZUFQSX0gZnJvbSAnLi9pb3MvSU9TU2NoZW1lRnVzZUFQSSc7XG5leHBvcnQge0lPU0Z1c2VMb2dnZXJ9IGZyb20gJy4vaW9zL0lPU0Z1c2VMb2dnZXInO1xuXG4vLyBBbmRyb2lkIFNwZWNpZmljIEFQSXMgLyBJbXBsZW1lbnRhdGlvbnNcbmV4cG9ydCB7QW5kcm9pZFNjaGVtZUZ1c2VBUEl9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkU2NoZW1lRnVzZUFQSSc7XG5leHBvcnQge0FuZHJvaWRGdXNlTG9nZ2VyfSBmcm9tICcuL2FuZHJvaWQvQW5kcm9pZEZ1c2VMb2dnZXInO1xuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBJTmF0aXZlTG9nRW50cnkgfSBmcm9tICcuLi9JRnVzZUxvZ2dlcic7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyIH0gZnJvbSBcIi4uL0Z1c2VMb2dnZXJcIjtcbmltcG9ydCB7IEZ1c2VMb2dnZXJMZXZlbCB9IGZyb20gXCIuLi9GdXNlTG9nZ2VyTGV2ZWxcIjtcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIgfSBmcm9tICcuLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIElPU0Z1c2VMb2dnZXIgZXh0ZW5kcyBGdXNlTG9nZ2VyIHtcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2xvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5sb2cucG9zdE1lc3NhZ2UoW2xldmVsLCBtZXNzYWdlXSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9yZWdpc3Rlck5hdGl2ZUNhbGJsYWNrKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5zZXRMb2dDYWxsYmFjay5wb3N0TWVzc2FnZShGdXNlQ2FsbGJhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGVudHJ5OiBJTmF0aXZlTG9nRW50cnkgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX29uTmF0aXZlTG9nRW50cnkoZW50cnkpO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0hUVFBGdXNlQVBJfSBmcm9tICcuLi9IVFRQRnVzZUFQSSc7XG5cbi8qKlxuICogQSBGdXNlIEFQSSBpbXBsZW1lbnRhdGlvbiBmb3IgaU9TIHRoYXQgdXNlcyBXS1VSTFNjaGVtZUhhbmRsZXIgdG8gYnJpZGdlIHRoZSBKUyBhbmQgTmF0aXZlIEFQSSBjYWxscy5cbiAqL1xuZXhwb3J0IGNsYXNzIElPU1NjaGVtZUZ1c2VBUEkgZXh0ZW5kcyBIVFRQRnVzZUFQSSB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYGh0dHBzOi8vbG9jYWxob3N0OiR7YXdhaXQgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuZ2V0QVBJUG9ydC5wb3N0TWVzc2FnZShcIlwiKX1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfaW5pdEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1GdXNlLVNlY3JldCcsIGF3YWl0IHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmdldEFQSVNlY3JldC5wb3N0TWVzc2FnZShcIlwiKSk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBDb250ZW50VHlwZSB9IGZyb20gJy4uL0NvbnRlbnRUeXBlJztcbmltcG9ydCB7IEZ1c2VDb250ZXh0IH0gZnJvbSAnLi4vRnVzZUNvbnRleHQnO1xuaW1wb3J0IHtGdXNlUGx1Z2lufSBmcm9tICcuLi9GdXNlUGx1Z2luJztcbmltcG9ydCB7RnVzZUFQSVJlc3BvbnNlfSBmcm9tICcuLi9GdXNlQVBJUmVzcG9uc2UnO1xuXG5leHBvcnQgdHlwZSBUUGF1c2VDYWxsYmFja0hhbmRsZXIgPSAoKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgVFJlc3VtZUNhbGxiYWNrSGFuZGxlciA9ICgpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJ1bnRpbWVJbmZvIHtcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgZGVidWdNb2RlOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRnVzZVJ1bnRpbWUgZXh0ZW5kcyBGdXNlUGx1Z2luIHtcbiAgICBwcml2YXRlICRjYWxsYmFja0lEczogc3RyaW5nW107XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogRnVzZUNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrSURzID0gW107XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9nZXRJRCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ0Z1c2VSdW50aW1lJztcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGFzeW5jIGdldEluZm8oKTogUHJvbWlzZTxJUnVudGltZUluZm8+IHtcbiAgICAgICAgbGV0IGRhdGE6IEZ1c2VBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2V4ZWMoJy9pbmZvJyk7XG4gICAgICAgIHJldHVybiBhd2FpdCBkYXRhLnJlYWRBc0pTT04oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2I6IFRQYXVzZUNhbGxiYWNrSGFuZGxlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGxldCBjYklEOiBzdHJpbmcgPSB0aGlzLl9jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvcmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYklEKTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMucHVzaChjYklEKTtcblxuICAgICAgICByZXR1cm4gY2JJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFja0lEOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3VucmVnaXN0ZXJQYXVzZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNiOiBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgbGV0IGNiSUQ6IHN0cmluZyA9IHRoaXMuX2NyZWF0ZUNhbGxiYWNrKChwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy9yZWdpc3RlclJlc3VtZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYklEKTtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRHMucHVzaChjYklEKTtcblxuICAgICAgICByZXR1cm4gY2JJRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdW5yZWdpc3RlclJlc3VtZUhhbmRsZXIoY2FsbGJhY2tJRDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy91bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcicsIENvbnRlbnRUeXBlLlRFWFQsIGNhbGxiYWNrSUQpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTklMXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9uaWwuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfcGFyc2UuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInYxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmFsaWRhdGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZhbGlkYXRlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmVyc2lvblwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdmVyc2lvbi5kZWZhdWx0O1xuICB9XG59KTtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MS5qc1wiKSk7XG5cbnZhciBfdjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzLmpzXCIpKTtcblxudmFyIF92MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjQuanNcIikpO1xuXG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG5cbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb24uanNcIikpO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIikpO1xuXG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8qXG4gKiBCcm93c2VyLWNvbXBhdGlibGUgSmF2YVNjcmlwdCBNRDVcbiAqXG4gKiBNb2RpZmljYXRpb24gb2YgSmF2YVNjcmlwdCBNRDVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XG4gKlxuICogQ29weXJpZ2h0IDIwMTEsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqIEJhc2VkIG9uXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxuICogVmVyc2lvbiAyLjIgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDA5XG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXG4gKi9cbmZ1bmN0aW9uIG1kNShieXRlcykge1xuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlc1tpXSA9IG1zZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZDVUb0hleEVuY29kZWRBcnJheSh3b3Jkc1RvTWQ1KGJ5dGVzVG9Xb3JkcyhieXRlcyksIGJ5dGVzLmxlbmd0aCAqIDgpKTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYW4gYXJyYXkgb2YgYnl0ZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIGNvbnN0IG91dHB1dCA9IFtdO1xuICBjb25zdCBsZW5ndGgzMiA9IGlucHV0Lmxlbmd0aCAqIDMyO1xuICBjb25zdCBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XG4gICAgY29uc3QgeCA9IGlucHV0W2kgPj4gNV0gPj4+IGkgJSAzMiAmIDB4ZmY7XG4gICAgY29uc3QgaGV4ID0gcGFyc2VJbnQoaGV4VGFiLmNoYXJBdCh4ID4+PiA0ICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKSwgMTYpO1xuICAgIG91dHB1dC5wdXNoKGhleCk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgb3V0cHV0IGxlbmd0aCB3aXRoIHBhZGRpbmcgYW5kIGJpdCBsZW5ndGhcbiAqL1xuXG5cbmZ1bmN0aW9uIGdldE91dHB1dExlbmd0aChpbnB1dExlbmd0aDgpIHtcbiAgcmV0dXJuIChpbnB1dExlbmd0aDggKyA2NCA+Pj4gOSA8PCA0KSArIDE0ICsgMTtcbn1cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoLlxuICovXG5cblxuZnVuY3Rpb24gd29yZHNUb01kNSh4LCBsZW4pIHtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCBsZW4gJSAzMjtcbiAgeFtnZXRPdXRwdXRMZW5ndGgobGVuKSAtIDFdID0gbGVuO1xuICBsZXQgYSA9IDE3MzI1ODQxOTM7XG4gIGxldCBiID0gLTI3MTczMzg3OTtcbiAgbGV0IGMgPSAtMTczMjU4NDE5NDtcbiAgbGV0IGQgPSAyNzE3MzM4Nzg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgIGNvbnN0IG9sZGEgPSBhO1xuICAgIGNvbnN0IG9sZGIgPSBiO1xuICAgIGNvbnN0IG9sZGMgPSBjO1xuICAgIGNvbnN0IG9sZGQgPSBkO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4Mik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgOSwgMzgwMTYwODMpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3Myk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcbiAgICBhID0gc2FmZUFkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZUFkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZUFkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZUFkZChkLCBvbGRkKTtcbiAgfVxuXG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBieXRlcyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJ5dGVzVG9Xb3JkcyhpbnB1dCkge1xuICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDg7XG4gIGNvbnN0IG91dHB1dCA9IG5ldyBVaW50MzJBcnJheShnZXRPdXRwdXRMZW5ndGgobGVuZ3RoOCkpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7XG4gICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0W2kgLyA4XSAmIDB4ZmYpIDw8IGkgJSAzMjtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuXG5cbmZ1bmN0aW9uIHNhZmVBZGQoeCwgeSkge1xuICBjb25zdCBsc3cgPSAoeCAmIDB4ZmZmZikgKyAoeSAmIDB4ZmZmZik7XG4gIGNvbnN0IG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gbXN3IDw8IDE2IHwgbHN3ICYgMHhmZmZmO1xufVxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJpdFJvdGF0ZUxlZnQobnVtLCBjbnQpIHtcbiAgcmV0dXJuIG51bSA8PCBjbnQgfCBudW0gPj4+IDMyIC0gY250O1xufVxuLypcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVjbW4ocSwgYSwgYiwgeCwgcywgdCkge1xuICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKTtcbn1cblxuZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBjIHwgfmIgJiBkLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgJiBkIHwgYyAmIH5kLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZnVuY3Rpb24gbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICByZXR1cm4gbWQ1Y21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xufVxuXG52YXIgX2RlZmF1bHQgPSBtZDU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG52YXIgX2RlZmF1bHQgPSB7XG4gIHJhbmRvbVVVSURcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gcGFyc2UodXVpZCkge1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgbGV0IHY7XG4gIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gUGFyc2UgIyMjIyMjIyMtLi4uLi0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLSMjIyMtLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLSMjIyMtLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0jIyMjLS4uLi4uLi4uLi4uLlxuXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLS4uLi4tIyMjIyMjIyMjIyMjXG4gIC8vIChVc2UgXCIvXCIgdG8gYXZvaWQgMzItYml0IHRydW5jYXRpb24gd2hlbiBiaXQtc2hpZnRpbmcgaGlnaC1vcmRlciBieXRlcylcblxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxuXG52YXIgX2RlZmF1bHQgPSBwYXJzZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9kZWZhdWx0ID0gL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBybmc7XG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcblxuZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8vIEFkYXB0ZWQgZnJvbSBDaHJpcyBWZW5lc3MnIFNIQTEgY29kZSBhdFxuLy8gaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9zaGExLmh0bWxcbmZ1bmN0aW9uIGYocywgeCwgeSwgeikge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4geCAmIHkgXiB+eCAmIHo7XG5cbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggJiB5IF4geCAmIHogXiB5ICYgejtcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gIH1cbn1cblxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5cbmZ1bmN0aW9uIHNoYTEoYnl0ZXMpIHtcbiAgY29uc3QgSyA9IFsweDVhODI3OTk5LCAweDZlZDllYmExLCAweDhmMWJiY2RjLCAweGNhNjJjMWQ2XTtcbiAgY29uc3QgSCA9IFsweDY3NDUyMzAxLCAweGVmY2RhYjg5LCAweDk4YmFkY2ZlLCAweDEwMzI1NDc2LCAweGMzZDJlMWYwXTtcblxuICBpZiAodHlwZW9mIGJ5dGVzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cblxuICBieXRlcy5wdXNoKDB4ODApO1xuICBjb25zdCBsID0gYnl0ZXMubGVuZ3RoIC8gNCArIDI7XG4gIGNvbnN0IE4gPSBNYXRoLmNlaWwobCAvIDE2KTtcbiAgY29uc3QgTSA9IG5ldyBBcnJheShOKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50MzJBcnJheSgxNik7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyArK2opIHtcbiAgICAgIGFycltqXSA9IGJ5dGVzW2kgKiA2NCArIGogKiA0XSA8PCAyNCB8IGJ5dGVzW2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tpICogNjQgKyBqICogNCArIDJdIDw8IDggfCBieXRlc1tpICogNjQgKyBqICogNCArIDNdO1xuICAgIH1cblxuICAgIE1baV0gPSBhcnI7XG4gIH1cblxuICBNW04gLSAxXVsxNF0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4IC8gTWF0aC5wb3coMiwgMzIpO1xuICBNW04gLSAxXVsxNF0gPSBNYXRoLmZsb29yKE1bTiAtIDFdWzE0XSk7XG4gIE1bTiAtIDFdWzE1XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggJiAweGZmZmZmZmZmO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgKytpKSB7XG4gICAgY29uc3QgVyA9IG5ldyBVaW50MzJBcnJheSg4MCk7XG5cbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDE2OyArK3QpIHtcbiAgICAgIFdbdF0gPSBNW2ldW3RdO1xuICAgIH1cblxuICAgIGZvciAobGV0IHQgPSAxNjsgdCA8IDgwOyArK3QpIHtcbiAgICAgIFdbdF0gPSBST1RMKFdbdCAtIDNdIF4gV1t0IC0gOF0gXiBXW3QgLSAxNF0gXiBXW3QgLSAxNl0sIDEpO1xuICAgIH1cblxuICAgIGxldCBhID0gSFswXTtcbiAgICBsZXQgYiA9IEhbMV07XG4gICAgbGV0IGMgPSBIWzJdO1xuICAgIGxldCBkID0gSFszXTtcbiAgICBsZXQgZSA9IEhbNF07XG5cbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDgwOyArK3QpIHtcbiAgICAgIGNvbnN0IHMgPSBNYXRoLmZsb29yKHQgLyAyMCk7XG4gICAgICBjb25zdCBUID0gUk9UTChhLCA1KSArIGYocywgYiwgYywgZCkgKyBlICsgS1tzXSArIFdbdF0gPj4+IDA7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IFJPVEwoYiwgMzApID4+PiAwO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gVDtcbiAgICB9XG5cbiAgICBIWzBdID0gSFswXSArIGEgPj4+IDA7XG4gICAgSFsxXSA9IEhbMV0gKyBiID4+PiAwO1xuICAgIEhbMl0gPSBIWzJdICsgYyA+Pj4gMDtcbiAgICBIWzNdID0gSFszXSArIGQgPj4+IDA7XG4gICAgSFs0XSA9IEhbNF0gKyBlID4+PiAwO1xuICB9XG5cbiAgcmV0dXJuIFtIWzBdID4+IDI0ICYgMHhmZiwgSFswXSA+PiAxNiAmIDB4ZmYsIEhbMF0gPj4gOCAmIDB4ZmYsIEhbMF0gJiAweGZmLCBIWzFdID4+IDI0ICYgMHhmZiwgSFsxXSA+PiAxNiAmIDB4ZmYsIEhbMV0gPj4gOCAmIDB4ZmYsIEhbMV0gJiAweGZmLCBIWzJdID4+IDI0ICYgMHhmZiwgSFsyXSA+PiAxNiAmIDB4ZmYsIEhbMl0gPj4gOCAmIDB4ZmYsIEhbMl0gJiAweGZmLCBIWzNdID4+IDI0ICYgMHhmZiwgSFszXSA+PiAxNiAmIDB4ZmYsIEhbM10gPj4gOCAmIDB4ZmYsIEhbM10gJiAweGZmLCBIWzRdID4+IDI0ICYgMHhmZiwgSFs0XSA+PiAxNiAmIDB4ZmYsIEhbNF0gPj4gOCAmIDB4ZmYsIEhbNF0gJiAweGZmXTtcbn1cblxudmFyIF9kZWZhdWx0ID0gc2hhMTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuZXhwb3J0cy51bnNhZmVTdHJpbmdpZnkgPSB1bnNhZmVTdHJpbmdpZnk7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5mdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbnZhciBfZGVmYXVsdCA9IHN0cmluZ2lmeTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcbmxldCBfbm9kZUlkO1xuXG5sZXQgX2Nsb2Nrc2VxOyAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcblxuXG5sZXQgX2xhc3RNU2VjcyA9IDA7XG5sZXQgX2xhc3ROU2VjcyA9IDA7IC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5cbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGxldCBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICBjb25zdCBiID0gYnVmIHx8IG5ldyBBcnJheSgxNik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsZXQgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBsZXQgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxOyAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcblxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICBjb25zdCBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpO1xuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtzZWVkQnl0ZXNbMF0gfCAweDAxLCBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XV07XG4gICAgfVxuXG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9IC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuXG5cbiAgbGV0IG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7IC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcblxuICBsZXQgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7IC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcblxuICBjb25zdCBkdCA9IG1zZWNzIC0gX2xhc3RNU2VjcyArIChuc2VjcyAtIF9sYXN0TlNlY3MpIC8gMTAwMDA7IC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9IC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcblxuXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9IC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcblxuXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInV1aWQudjEoKTogQ2FuJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjXCIpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxOyAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcblxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDsgLy8gYHRpbWVfbG93YFxuXG4gIGNvbnN0IHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjsgLy8gYHRpbWVfbWlkYFxuXG4gIGNvbnN0IHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjsgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcblxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG5cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7IC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDsgLy8gYGNsb2NrX3NlcV9sb3dgXG5cbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmOyAvLyBgbm9kZWBcblxuICBmb3IgKGxldCBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgfHwgKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShiKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdjE7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xuXG52YXIgX21kID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9tZDUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCB2MyA9ICgwLCBfdi5kZWZhdWx0KSgndjMnLCAweDMwLCBfbWQuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSB2MztcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5VUkwgPSBleHBvcnRzLkROUyA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdCA9IHYzNTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbnZhciBfcGFyc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIGNvbnN0IGJ5dGVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuY29uc3QgRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnRzLkROUyA9IEROUztcbmNvbnN0IFVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0cy5VUkwgPSBVUkw7XG5cbmZ1bmN0aW9uIHYzNShuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgX25hbWVzcGFjZTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHN0cmluZ1RvQnl0ZXModmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gKDAsIF9wYXJzZS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmICgoKF9uYW1lc3BhY2UgPSBuYW1lc3BhY2UpID09PSBudWxsIHx8IF9uYW1lc3BhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9uYW1lc3BhY2UubGVuZ3RoKSAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkoYnl0ZXMpO1xuICB9IC8vIEZ1bmN0aW9uI25hbWUgaXMgbm90IHNldHRhYmxlIG9uIHNvbWUgcGxhdGZvcm1zICgjMjcwKVxuXG5cbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICB9IGNhdGNoIChlcnIpIHt9IC8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5cblxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX25hdGl2ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbmF0aXZlLmpzXCIpKTtcblxudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAoX25hdGl2ZS5kZWZhdWx0LnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBfbmF0aXZlLmRlZmF1bHQucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nLmRlZmF1bHQpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkocm5kcyk7XG59XG5cbnZhciBfZGVmYXVsdCA9IHY0O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjM1LmpzXCIpKTtcblxudmFyIF9zaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3NoYTEuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5jb25zdCB2NSA9ICgwLCBfdi5kZWZhdWx0KSgndjUnLCAweDUwLCBfc2hhLmRlZmF1bHQpO1xudmFyIF9kZWZhdWx0ID0gdjU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9yZWdleCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcmVnZXguanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgX3JlZ2V4LmRlZmF1bHQudGVzdCh1dWlkKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmFsaWRhdGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2ZXJzaW9uKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxNSksIDE2KTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmVyc2lvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuLypcbkNvcHlyaWdodCAyMDIzLTIwMjQgQnJlYXV0ZWtcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5GdXNlTmF0aXZlVmlld05vZGUgPSB2b2lkIDA7XG5jbGFzcyBGdXNlTmF0aXZlVmlld05vZGUge1xuICAgIGNvbnN0cnVjdG9yKGFwaSwgaWQsIG5vZGUpIHtcbiAgICAgICAgdGhpcy4kYXBpID0gYXBpO1xuICAgICAgICB0aGlzLiRpZCA9IGlkO1xuICAgICAgICB0aGlzLiRub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy4kaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kaXNVcGRhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLiR0aW1lciA9IG51bGw7XG4gICAgICAgIHRoaXMuJGxhc3RVcGRhdGVkUmVjdCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJHRpY2sgPSB0aGlzLiR0aWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlKHRydWUpO1xuICAgIH1cbiAgICBnZXRJRCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGlkO1xuICAgIH1cbiAgICBnZXROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kbm9kZTtcbiAgICB9XG4gICAgc2V0QWN0aXZlKGZsYWcpIHtcbiAgICAgICAgdGhpcy4kaXNBY3RpdmUgPSBmbGFnO1xuICAgICAgICBpZiAoZmxhZykge1xuICAgICAgICAgICAgdGhpcy4kdGltZXIgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuJHRpY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuJHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuJHRpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGlzQWN0aXZlO1xuICAgIH1cbiAgICBhc3luYyAkdXBkYXRlKHJlY3QpIHtcbiAgICAgICAgYXdhaXQgdGhpcy4kYXBpLnVwZGF0ZSh0aGlzLmdldElEKCksIHJlY3QpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TmF0aXZlUmVjdChub2RlKSB7XG4gICAgICAgIGxldCBkb21SZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHJlY3QgPSB7XG4gICAgICAgICAgICB4OiBkb21SZWN0LngsXG4gICAgICAgICAgICB5OiBkb21SZWN0LnksXG4gICAgICAgICAgICB3OiBkb21SZWN0LndpZHRoLFxuICAgICAgICAgICAgaDogZG9tUmVjdC5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfVxuICAgICRoYXNSZWN0Q2hhbmdlcyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLnggIT09IGIueCB8fCBhLnkgIT09IGIueSB8fCBhLncgIT09IGIudyB8fCBhLmggIT09IGIuaDtcbiAgICB9XG4gICAgYXN5bmMgJHRpY2soKSB7XG4gICAgICAgIGxldCByZWN0ID0gRnVzZU5hdGl2ZVZpZXdOb2RlLmdldE5hdGl2ZVJlY3QodGhpcy4kbm9kZSk7XG4gICAgICAgIGlmICghdGhpcy4kaXNVcGRhdGluZyAmJiAodGhpcy4kbGFzdFVwZGF0ZWRSZWN0ID09IG51bGwgfHwgdGhpcy4kaGFzUmVjdENoYW5nZXModGhpcy4kbGFzdFVwZGF0ZWRSZWN0LCByZWN0KSkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaXNVcGRhdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy4kdXBkYXRlKHJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFVwZGF0ZWRSZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGlzVXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGxhc3RVcGRhdGVkUmVjdCA9IHJlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuJGlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLiR0aW1lciA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy4kdGljayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiR0aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzdHJveXMgdGhpcyBmdXNlIG5hdGl2ZSB2aWV3LiBXaGVuIGRlc3Ryb3llZCwgdGhlIG5hdGl2ZVxuICAgICAqIHZpZXcgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIERPTSBhbmQgdGhpcyBub2RlIHdpbGwgbm8gbG9uZ2VyIGJlIHRyYWNrZWQuXG4gICAgICovXG4gICAgYXN5bmMgZGVzdHJveSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy4kYXBpLmRlc3Ryb3kodGhpcyk7XG4gICAgICAgIHRoaXMuJGlzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLkZ1c2VOYXRpdmVWaWV3Tm9kZSA9IEZ1c2VOYXRpdmVWaWV3Tm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVJuVnpaVTVoZEdsMlpWWnBaWGRPYjJSbExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDBaMWMyVk9ZWFJwZG1WV2FXVjNUbTlrWlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRMEU3T3pzN096czdPenM3T3pzN08wVkJZMFU3T3p0QlFVdEdMRTFCUVdFc2EwSkJRV3RDTzBsQlZUTkNMRmxCUVcxQ0xFZEJRWGxDTEVWQlFVVXNSVUZCVlN4RlFVRkZMRWxCUVdsQ08xRkJRM1pGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRE8xRkJRMmhDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRMlFzU1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNN1VVRkRiRUlzU1VGQlNTeERRVUZETEZOQlFWTXNSMEZCUnl4TFFVRkxMRU5CUVVNN1VVRkRka0lzU1VGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4TFFVRkxMRU5CUVVNN1VVRkRla0lzU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNN1VVRkRia0lzU1VGQlNTeERRVUZETEdkQ1FVRm5RaXhIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU0zUWl4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExFdEJRVXNzUTBGQlF6dFJRVU14UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMjVETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRGVrSXNRMEZCUXp0SlFVVk5MRXRCUVVzN1VVRkRVaXhQUVVGUExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTTdTVUZEY0VJc1EwRkJRenRKUVVWTkxFOUJRVTg3VVVGRFZpeFBRVUZQTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1NVRkRkRUlzUTBGQlF6dEpRVVZOTEZOQlFWTXNRMEZCUXl4SlFVRmhPMUZCUXpGQ0xFbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUTNSQ0xFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTTdXVUZEVUN4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF5eHhRa0ZCY1VJc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdVVUZETTBRc1EwRkJRenRoUVVOSkxFTkJRVU03V1VGRFJpeEpRVUZKTEVsQlFVa3NRMEZCUXl4TlFVRk5MRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU03WjBKQlEzWkNMRTFCUVUwc1EwRkJReXh2UWtGQmIwSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03V1VGRE4wTXNRMEZCUXp0UlFVTk1MRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJSVTBzVVVGQlVUdFJRVU5ZTEU5QlFVOHNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJRenRKUVVNeFFpeERRVUZETzBsQlJVOHNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGdlFqdFJRVU4wUXl4TlFVRk5MRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU12UXl4RFFVRkRPMGxCUlUwc1RVRkJUU3hEUVVGRExHRkJRV0VzUTBGQlF5eEpRVUZwUWp0UlFVTjZReXhKUVVGSkxFOUJRVThzUjBGQldTeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFVkJRVVVzUTBGQlF6dFJRVVZ3UkN4SlFVRkpMRWxCUVVrc1IwRkJSenRaUVVOUUxFTkJRVU1zUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTmFMRU5CUVVNc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU5hTEVOQlFVTXNSVUZCUlN4UFFVRlBMRU5CUVVNc1MwRkJTenRaUVVOb1FpeERRVUZETEVWQlFVVXNUMEZCVHl4RFFVRkRMRTFCUVUwN1UwRkRjRUlzUTBGQlF6dFJRVVZHTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJoQ0xFTkJRVU03U1VGRlR5eGxRVUZsTEVOQlFVTXNRMEZCYVVJc1JVRkJSU3hEUVVGcFFqdFJRVU40UkN4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU53UlN4RFFVRkRPMGxCUlU4c1MwRkJTeXhEUVVGRExFdEJRVXM3VVVGRFppeEpRVUZKTEVsQlFVa3NSMEZCYlVJc2EwSkJRV3RDTEVOQlFVTXNZVUZCWVN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFJRVU40UlN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4blFrRkJaMElzU1VGQlNTeEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRMR1ZCUVdVc1EwRkJReXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETzFsQlF6VkhMRWxCUVVrc1EwRkJRenRuUWtGRFJDeEpRVUZKTEVOQlFVTXNWMEZCVnl4SFFVRkhMRWxCUVVrc1EwRkJRenRuUWtGRGVFSXNUVUZCVFN4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFsQlF6ZENMRU5CUVVNN1dVRkRSQ3hQUVVGUExFVkJRVVVzUlVGQlJTeERRVUZETzJkQ1FVTlNMRWxCUVVrc1EwRkJReXhuUWtGQlowSXNSMEZCUnl4SlFVRkpMRU5CUVVNN1dVRkRha01zUTBGQlF6dFpRVU5FTEVsQlFVa3NRMEZCUXl4WFFVRlhMRWRCUVVjc1MwRkJTeXhEUVVGRE8xbEJRM3BDTEVsQlFVa3NRMEZCUXl4blFrRkJaMElzUjBGQlJ5eEpRVUZKTEVOQlFVTTdVVUZEYWtNc1EwRkJRenRSUVVWRUxFbEJRVWtzU1VGQlNTeERRVUZETEZOQlFWTXNSVUZCUlN4RFFVRkRPMWxCUTJwQ0xFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRSUVVNelJDeERRVUZETzJGQlEwa3NRMEZCUXp0WlFVTkdMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETzFGQlEzWkNMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJSVVE3T3p0UFFVZEhPMGxCUTBrc1MwRkJTeXhEUVVGRExFOUJRVTg3VVVGRGFFSXNUVUZCVFN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTTVRaXhKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTTNRaXhEUVVGRE8wTkJRMG83UVVGc1IwUXNaMFJCYTBkREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbi8qXG5Db3B5cmlnaHQgMjAyMy0yMDI0IEJyZWF1dGVrXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRnVzZU5hdGl2ZVZpZXdQbHVnaW4gPSB2b2lkIDA7XG5jb25zdCBjb3JlXzEgPSByZXF1aXJlKFwiQGJ0ZnVzZS9jb3JlXCIpO1xuY29uc3QgRnVzZU5hdGl2ZVZpZXdOb2RlXzEgPSByZXF1aXJlKFwiLi9GdXNlTmF0aXZlVmlld05vZGVcIik7XG5jbGFzcyBGdXNlTmF0aXZlVmlld1BsdWdpbiBleHRlbmRzIGNvcmVfMS5GdXNlUGx1Z2luIHtcbiAgICBfZ2V0SUQoKSB7XG4gICAgICAgIHJldHVybiBcIkZ1c2VOYXRpdmVWaWV3XCI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBvdmVybGF5IHZpZXcuIFRoZSBnaXZlbiBub2RlIHdpbGwgYmUgdHJhY2tlZFxuICAgICAqIGFjY29yZGluZyB0byBpdCdzIHBvc2l0aW9uIGFuZCBzaXplIG9uIHNjcmVlbi5cbiAgICAgKlxuICAgICAqIEEgbmF0aXZlIHZpZXcgd2lsbCBiZSBwb3NpdGlvbmVkIGluIHRoZSBzYW1lIHBvc2l0aW9uIG9uIHRvcCBvZlxuICAgICAqIHRoZSB3ZWJ2aWV3LlxuICAgICAqXG4gICAgICogSWYgYSBvdmVybGF5IGlzIGRlc2lyYWJsZSwgb3B0aW9uYWxseSBhIHBhdGggdG8gYSBIVE1MIGZpbGUgY2FuIGJlIGdpdmVuLlxuICAgICAqIFRoaXMgSFRNTCBmaWxlIHdpbGwgYmUgbG9hZGVkIGluIGEgc2VwYXJhdGUgd2VidmlldyBwcm9jZXNzLiBUaGlzIHNlcGFyYXRlXG4gICAgICogd2VidmlldyB3aWxsIHByb2Nlc3Mgd2lsbCBoYXZlIGxpbWl0ZWQgY2FwYWJpbGl0aWVzLCBidXQgaXQgd2lsbCBiZSBzaXplZFxuICAgICAqIGFuZCBwb3NpdGlvbmVkIGluIHRoZSBzYW1lIGFyZWEgb2YgdGhlIHRyYW5zcGFyZW50IG1hc2ssIGhvd2V2ZXJcbiAgICAgKiBhYm92ZSB0aGUgd2Vidmlldy4gSWYgdGhlIG92ZXJsYXkgZmlsZSBpcyBub3Qgc3BlY2lmaWVkLCBhIHdlYnZpZXcgb3ZlcmxheVxuICAgICAqIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBUQkQ6IE5vdGVzIG9uIGV2ZW50IHByb3BhZ2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gdHJhY2tcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZShub2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICByZWN0OiBGdXNlTmF0aXZlVmlld05vZGVfMS5GdXNlTmF0aXZlVmlld05vZGUuZ2V0TmF0aXZlUmVjdChub2RlKSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMgfHwge31cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2NyZWF0ZScsIGNvcmVfMS5Db250ZW50VHlwZS5KU09OLCBwYXJhbXMpO1xuICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICB0aHJvdyBhd2FpdCByZXNwb25zZS5yZWFkQXNFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpZCA9IGF3YWl0IHJlc3BvbnNlLnJlYWRBc1RleHQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlTmF0aXZlVmlld05vZGVfMS5GdXNlTmF0aXZlVmlld05vZGUodGhpcywgaWQsIG5vZGUpO1xuICAgIH1cbiAgICBhc3luYyBkZXN0cm95KG5vZGUpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL2Rlc3Ryb3knLCBjb3JlXzEuQ29udGVudFR5cGUuVEVYVCwgbm9kZS5nZXRJRCgpKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgdGhyb3cgYXdhaXQgcmVzcG9uc2UucmVhZEFzRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyB1cGRhdGUoaWQsIHJlY3QpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZXhlYygnL3VwZGF0ZScsIGNvcmVfMS5Db250ZW50VHlwZS5KU09OLCB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICByZWN0OiByZWN0XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocmVzcG9uc2UuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICB0aHJvdyBhd2FpdCByZXNwb25zZS5yZWFkQXNFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5GdXNlTmF0aXZlVmlld1BsdWdpbiA9IEZ1c2VOYXRpdmVWaWV3UGx1Z2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUm5WelpVNWhkR2wyWlZacFpYZFFiSFZuYVc0dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12Um5WelpVNWhkR2wyWlZacFpYZFFiSFZuYVc0dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVU5CT3pzN096czdPenM3T3pzN096dEZRV05GT3pzN1FVRkZSaXgxUTBGQmVVWTdRVUZEZWtZc05rUkJRVEJFTzBGQmRVTXhSQ3hOUVVGaExHOUNRVUZ4UWl4VFFVRlJMR2xDUVVGVk8wbEJRemRDTEUxQlFVMDdVVUZEY2tJc1QwRkJUeXhuUWtGQlowSXNRMEZCUXp0SlFVTTFRaXhEUVVGRE8wbEJSVVE3T3pzN096czdPenM3T3pzN096czdPenRQUVd0Q1J6dEpRVU5KTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJhVUlzUlVGQlJTeFBRVUZyUXp0UlFVTnlSU3hKUVVGSkxFMUJRVTBzUjBGQkswSTdXVUZEY2tNc1NVRkJTU3hGUVVGRkxIVkRRVUZyUWl4RFFVRkRMR0ZCUVdFc1EwRkJReXhKUVVGSkxFTkJRVU03V1VGRE5VTXNUMEZCVHl4RlFVRkZMRTlCUVU4c1NVRkJTU3hGUVVGRk8xTkJRM3BDTEVOQlFVTTdVVUZGUml4SlFVRkpMRkZCUVZFc1IwRkJiMElzVFVGQlRTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1JVRkJSU3hyUWtGQlZ5eERRVUZETEVsQlFVa3NSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVOMFJpeEpRVUZKTEZGQlFWRXNRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkJSU3hEUVVGRE8xbEJRM0pDTEUxQlFVMHNUVUZCVFN4UlFVRlJMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRVU03VVVGRGRrTXNRMEZCUXp0UlFVVkVMRWxCUVVrc1JVRkJSU3hIUVVGWExFMUJRVTBzVVVGQlVTeERRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRPMUZCUXpkRExFOUJRVThzU1VGQlNTeDFRMEZCYTBJc1EwRkJReXhKUVVGSkxFVkJRVVVzUlVGQlJTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJ4RUxFTkJRVU03U1VGRlRTeExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVhkQ08xRkJRM3BETEVsQlFVa3NVVUZCVVN4SFFVRnZRaXhOUVVGTkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWVUZCVlN4RlFVRkZMR3RDUVVGWExFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRemRHTEVsQlFVa3NVVUZCVVN4RFFVRkRMRTlCUVU4c1JVRkJSU3hGUVVGRkxFTkJRVU03V1VGRGNrSXNUVUZCVFN4TlFVRk5MRkZCUVZFc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6dFJRVU4yUXl4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWTkxFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCVlN4RlFVRkZMRWxCUVc5Q08xRkJRMmhFTEVsQlFVa3NVVUZCVVN4SFFVRnZRaXhOUVVGTkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4RlFVRkZMR3RDUVVGWExFTkJRVU1zU1VGQlNTeEZRVUZGTzFsQlF6RkZMRVZCUVVVc1JVRkJSU3hGUVVGRk8xbEJRMDRzU1VGQlNTeEZRVUZGTEVsQlFVazdVMEZEWWl4RFFVRkRMRU5CUVVNN1VVRkZTQ3hKUVVGSkxGRkJRVkVzUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZCUlN4RFFVRkRPMWxCUTNKQ0xFMUJRVTBzVFVGQlRTeFJRVUZSTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1VVRkRka01zUTBGQlF6dEpRVU5NTEVOQlFVTTdRMEZEU2p0QlFYaEVSQ3h2UkVGM1JFTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuQ29weXJpZ2h0IDIwMjMtMjAyNCBCcmVhdXRla1xuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZ1c2VOYXRpdmVWaWV3UGx1Z2luID0gZXhwb3J0cy5GdXNlTmF0aXZlVmlld05vZGUgPSB2b2lkIDA7XG52YXIgRnVzZU5hdGl2ZVZpZXdOb2RlXzEgPSByZXF1aXJlKFwiLi9GdXNlTmF0aXZlVmlld05vZGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGdXNlTmF0aXZlVmlld05vZGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEZ1c2VOYXRpdmVWaWV3Tm9kZV8xLkZ1c2VOYXRpdmVWaWV3Tm9kZTsgfSB9KTtcbnZhciBGdXNlTmF0aXZlVmlld1BsdWdpbl8xID0gcmVxdWlyZShcIi4vRnVzZU5hdGl2ZVZpZXdQbHVnaW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGdXNlTmF0aXZlVmlld1BsdWdpblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gRnVzZU5hdGl2ZVZpZXdQbHVnaW5fMS5GdXNlTmF0aXZlVmlld1BsdWdpbjsgfSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVlYQnBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwyRndhUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlEwRTdPenM3T3pzN096czdPenM3TzBWQlkwVTdPenRCUVVWR0xESkVRVUYzUkR0QlFVRm9SQ3gzU0VGQlFTeHJRa0ZCYTBJc1QwRkJRVHRCUVVNeFFpd3JSRUZCTkVRN1FVRkJjRVFzTkVoQlFVRXNiMEpCUVc5Q0xFOUJRVUVpZlE9PSIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2U7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChlbnYuc3RhY2subGVuZ3RoKSB7XG4gICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcbiAgICAgICAgaWYgKHJlYy5hc3luYykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuLypcbiAgIENvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAgIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAgIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCJAYnRmdXNlL2NvcmVcIik7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvYXBpXCIpO1xubGV0IGRhdGFDb250YWluZXI7XG5sZXQgcGx1Z2luO1xud2luZG93Lm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYnVpbGRlciA9IG5ldyBjb3JlXzEuRnVzZUNvbnRleHRCdWlsZGVyKCk7XG4gICAgbGV0IGNvbnRleHQgPSBhd2FpdCBidWlsZGVyLmJ1aWxkKCk7XG4gICAgcGx1Z2luID0gbmV3IGFwaV8xLkZ1c2VOYXRpdmVWaWV3UGx1Z2luKGNvbnRleHQpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVFYQndMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkR0Z3Y0M5emNtTXZRWEJ3TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHM3T3pzN096czdPenM3T3pzN1JVRmpSVHM3UVVGRlJpeDFRMEZIYzBJN1FVRkZkRUlzZFVOQlJYVkNPMEZCUlhaQ0xFbEJRVWtzWVVGQk1FSXNRMEZCUXp0QlFVTXZRaXhKUVVGSkxFMUJRVFJDTEVOQlFVTTdRVUZGYWtNc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eExRVUZMTEVsQlFVa3NSVUZCUlR0SlFVTjJRaXhKUVVGSkxFOUJRVThzUjBGQmRVSXNTVUZCU1N4NVFrRkJhMElzUlVGQlJTeERRVUZETzBsQlF6TkVMRWxCUVVrc1QwRkJUeXhIUVVGblFpeE5RVUZOTEU5QlFVOHNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRKUVVOcVJDeE5RVUZOTEVkQlFVY3NTVUZCU1N3d1FrRkJiMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTXZReXhEUVVGRExFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuLypcbiAgIENvcHlyaWdodCAyMDIzIEJyZWF1dGVrXG5cbiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG4gICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAgIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAgIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCJAYnRmdXNlL2NvcmVcIik7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvYXBpXCIpO1xubGV0IGRhdGFDb250YWluZXI7XG5sZXQgcGx1Z2luO1xud2luZG93Lm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgYnVpbGRlciA9IG5ldyBjb3JlXzEuRnVzZUNvbnRleHRCdWlsZGVyKCk7XG4gICAgbGV0IGNvbnRleHQgPSBhd2FpdCBidWlsZGVyLmJ1aWxkKCk7XG4gICAgcGx1Z2luID0gbmV3IGFwaV8xLkZ1c2VOYXRpdmVWaWV3UGx1Z2luKGNvbnRleHQpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVFYQndMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmRHVnpkR0Z3Y0M5emNtTXZRWEJ3TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHM3T3pzN096czdPenM3T3pzN1JVRmpSVHM3UVVGRlJpeDFRMEZIYzBJN1FVRkZkRUlzZFVOQlJYVkNPMEZCUlhaQ0xFbEJRVWtzWVVGQk1FSXNRMEZCUXp0QlFVTXZRaXhKUVVGSkxFMUJRVFJDTEVOQlFVTTdRVUZGYWtNc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eExRVUZMTEVsQlFVa3NSVUZCUlR0SlFVTjJRaXhKUVVGSkxFOUJRVThzUjBGQmRVSXNTVUZCU1N4NVFrRkJhMElzUlVGQlJTeERRVUZETzBsQlF6TkVMRWxCUVVrc1QwRkJUeXhIUVVGblFpeE5RVUZOTEU5QlFVOHNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRKUVVOcVJDeE5RVUZOTEVkQlFVY3NTVUZCU1N3d1FrRkJiMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTXZReXhEUVVGRExFTkJRVU1pZlE9PSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==