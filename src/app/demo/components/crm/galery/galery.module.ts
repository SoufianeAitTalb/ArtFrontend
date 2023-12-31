import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { galeryRoutingModule } from './galery-routing.module';
import { galeryComponent } from './galery.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from "primeng/autocomplete";
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/demo/service/client.service';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import {DataViewModule} from "primeng/dataview";
import {ImageModule} from "primeng/image";
import {CardModule} from "primeng/card";
import {MessageModule} from "primeng/message";


@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        galeryRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        SelectButtonModule,
        AutoCompleteModule,
        HttpClientModule,
        TabViewModule,
        InputSwitchModule,
        ImageModule,
        CardModule,
        MessageModule
    ],
    declarations: [galeryComponent],
    providers:[ClientService]
})
export class galeryModule { }
