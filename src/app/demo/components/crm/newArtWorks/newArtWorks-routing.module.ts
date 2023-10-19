import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { newArtWorksComponent } from './newArtWorks.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: newArtWorksComponent }

	])],
	exports: [RouterModule]
})
export class newArtWorksRoutingModule { }
