import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { categoriesComponent } from './categories.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: categoriesComponent }

	])],
	exports: [RouterModule]
})
export class categoriesRoutingModule { }
