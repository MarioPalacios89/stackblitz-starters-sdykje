import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
    {
        path: "configuraciones-generales",
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
export class ConfiguracionesGeneralesModule { }
