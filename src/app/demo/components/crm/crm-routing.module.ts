import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'galery', loadChildren: () => import('./galery/galery.module').then(m => m.galeryModule) },
        { path: 'newArtWorks', loadChildren: () => import('./newArtWorks/newArtWorks.module').then(m => m.newArtWorksModule) },
        { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.categoriesModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CrmRoutingModule { }
