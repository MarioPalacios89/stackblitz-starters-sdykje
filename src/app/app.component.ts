import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    mensaje = "";
    constructor(private cdr: ChangeDetectorRef)
    {
        sessionStorage.removeItem("loading");
    }

    isLoad() {
        if (sessionStorage.getItem("loading")) {
          const session = sessionStorage.getItem("loading");
          if (session?.trim()!="") {
            this.mensaje = session;
          }
          return true;
        } else {
          return false;
        }
      }

      ngAfterContentChecked(): void {
        this.cdr.detectChanges();
     }
}
