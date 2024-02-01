import { NativeDOMPlugin } from './NativeViewPlugin';

export class NativeViewNode {
    private $context: NativeDOMPlugin;
    private $id: string;
    private $node: HTMLElement;
    private $isActive: boolean;
    private $timer: number | null;
    private $lastUpdatedRect: DOMRect | null;
    private $isUpdating: boolean;

    public constructor(context: NativeDOMPlugin, id: string, node: HTMLElement) {
        this.$context = context;
        this.$id = id;
        this.$node = node;
        this.$isActive = false;
        this.$isUpdating = false;
        this.$timer = null;
        this.$lastUpdatedRect = null;
        this.$tick = this.$tick.bind(this);
    }

    public getID(): string {
        return this.$id;
    }

    public getNode(): HTMLElement {
        return this.$node;
    }

    public setActive(flag: boolean): void {
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

    public isActive(): boolean {
        return this.$isActive;
    }

    private async $update(rect: DOMRect): Promise<void> {
        await this.$context.update(this.getID(), rect);
    }

    private async $tick(): Promise<void> {
        let rect: DOMRect = this.$node.getBoundingClientRect();

        if (this.$lastUpdatedRect == null && !this.$isUpdating) {
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
}
