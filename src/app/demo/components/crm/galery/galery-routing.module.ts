import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { galeryComponent } from './galery.component';
import { ContactClientComponent } from './ContactClient/contact-client/contact-client.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: galeryComponent },
		{ path: 'ContactClient/:clientId', component : ContactClientComponent}

	])],
	exports: [RouterModule]
})
export class galeryRoutingModule { }
