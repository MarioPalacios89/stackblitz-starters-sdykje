import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "proceso-compensacion",
        // canActivate: [AuthGuard],
        loadChildren: () =>
            import("./pages/pages.module").then(
                (m) => m.PagesModule
            ),
    },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(routes)
  ]
})
export class ProcesoCompensacionModule { }
