

import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy, NgClass, NgForOf, NgIf} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';

import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TableModule} from "primeng/table";

import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {RatingModule} from "primeng/rating";
import {ChartModule} from "primeng/chart";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ListboxModule} from "primeng/listbox";
import {MultiSelectModule} from "primeng/multiselect";
import {RadioButtonModule} from "primeng/radiobutton";
import {StaffService} from "./demo/service/staff.service";
import {CountryService} from "./demo/service/country.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AppHttpInterceptor} from "./demo/interceptors/app-http.interceptor";


@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        NgClass,
        ButtonModule,
        RippleModule,
        FormsModule,
        NgIf,
        InputTextModule,
        AutoCompleteModule,
        TableModule,
        NgForOf,
        DataViewModule,
        DropdownModule,
        RatingModule,
        ReactiveFormsModule,
        ChartModule,
        InputTextareaModule,
        ListboxModule,
        MultiSelectModule,
        RadioButtonModule,

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        StaffService,CountryService,
        {provide : HTTP_INTERCEPTORS,useClass : AppHttpInterceptor , multi:true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
