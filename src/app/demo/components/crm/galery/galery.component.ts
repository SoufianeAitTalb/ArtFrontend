import { Component, OnInit } from '@angular/core';
import { ArtClient as Client } from 'src/app/demo/api/ArtClient';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {ArtClientService} from "../../../service/artClient.service";
import {PaintService} from "../../../service/Paint.service";
import {Paint} from "../../../api/Paint";
import { DataView } from 'primeng/dataview';
import {PaymentInformations} from "../../../api/PaymentInformations";


@Component({
    templateUrl: './galery.component.html',
    providers: [MessageService,ArtClientService,PaintService]
})
export class galeryComponent implements OnInit {

    paymentInformation: PaymentInformations={};
    sortOptions: any[] = [];

    sortOrder: number = 0;

    sortField: string = '';


    client : Client ={};

    paints:Paint[]=[];


    paymentDialog:boolean=false;



    constructor(private router: Router,private clientService: ArtClientService,
      private messageService: MessageService,private paintService:PaintService) { }

    ngOnInit() {

        this.paintService.getPaints().subscribe({next: (data: Paint[])=>{this.paints=data;}});

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];

    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

  paintId:any;
    onPay(paintId:any) {
        this.paymentDialog=true;
        this.paintId=paintId;

    }

    confirmPayment() {
        this.paymentDialog=false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Congratulations! Your payment was successful.', life: 3000 });

    }
}




