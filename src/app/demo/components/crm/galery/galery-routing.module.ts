import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { galeryComponent } from './galery.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: galeryComponent }

	])],
	exports: [RouterModule]
})
export class galeryRoutingModule { }
