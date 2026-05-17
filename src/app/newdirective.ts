
// structure directive

import { ViewContainerRef, TemplateRef, Directive, input, Input } from "@angular/core";

@Directive({
    selector: '[ttif]'
})

export class customdirective {
    constructor(private viewcontainerref: ViewContainerRef, private templateRef: TemplateRef<any>) { }
    private condition = false;
    @Input()
    set ttif(value: boolean) {
        this.condition = value;
        this.Updateview();
    }
    private Updateview() {
        if (this.condition) {
            this.viewcontainerref.createEmbeddedView(this.templateRef);
        }
    }
}
