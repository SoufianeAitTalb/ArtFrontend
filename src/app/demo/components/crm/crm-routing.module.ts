import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthorizationGuard} from "../../guards/authorization.guard";

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'gallery', loadChildren: () => import('./galery/galery.module').then(m => m.galeryModule) },
        { path: 'newArtWorks',canActivate : [AuthorizationGuard], loadChildren: () => import('./newArtWorks/newArtWorks.module').then(m => m.newArtWorksModule) },
        { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.categoriesModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CrmRoutingModule { }
