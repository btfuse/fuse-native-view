
import {ContentType, FuseAPIResponse, FusePlugin} from '@btfuse/core';
import { NativeViewNode } from './NativeViewNode';

export class NativeDOMPlugin extends FusePlugin {
    protected override _getID(): string {
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
     * @param overlayFile A path to a HTML file to use as the overlay
     * @returns 
     */
    public async create(node: HTMLElement, overlayFile?: string): Promise<NativeViewNode> {
        let response: FuseAPIResponse = await this._exec('/create');
        if (response.isError()) {
            throw await response.readAsError();
        }

        let id: string = await response.readAsText();
        return new NativeViewNode(this, id, node);
    }

    public async destroy(node: NativeViewNode): Promise<void> {
        let response: FuseAPIResponse = await this._exec('/destroy', ContentType.TEXT, node.getID());
        if (response.isError()) {
            throw await response.readAsError();
        }
    }

    public async update(id: string, rect: DOMRect): Promise<void> {
        let response: FuseAPIResponse = await this._exec('/destroy', ContentType.JSON, {
            id: id,
            rect: {
                top: rect.top,
                left: rect.left,
                right: rect.right,
                bottom: rect.bottom
            }
        });

        if (response.isError()) {
            throw await response.readAsError();
        }
    }
}
