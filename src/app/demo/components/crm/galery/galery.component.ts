import { Component, OnInit } from '@angular/core';
import { ArtClient as Client } from 'src/app/demo/api/ArtClient';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CountryService } from 'src/app/demo/service/country.service';
import { ContactClientService } from 'src/app/demo/service/contactclient.service';
import { Country } from 'src/app/demo/api/Country';
import { Currency } from 'src/app/demo/api/Currency';
import { CurrencyService } from 'src/app/demo/service/currency.service';
import { StaffService } from 'src/app/demo/service/staff.service';
import { Staff } from 'src/app/demo/api/Staff';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import {ArtClientService} from "../../../service/artClient.service";
import {PaintService} from "../../../service/Paint.service";
import {Paint, Product} from "../../../api/Paint";
import { DataView } from 'primeng/dataview';


@Component({
    templateUrl: './galery.component.html',
    providers: [MessageService,ArtClientService,PaintService,ContactClientService,CurrencyService,CountryService,StaffService]
})
export class galeryComponent implements OnInit {

    products: Paint[] = [];

    sortOptions: any[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];


    countries: Country[] = [];

    currencies: Currency[] =[];

    listStaff: Staff[]=[];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];





    client : Client ={};
    clients : Client[] =[];

    paint:Paint={};
    paints:Paint[]=[];

    paintDialog: boolean = false;
    deletePaintDialog: boolean = false;
    StaffDialog: boolean =false;

    submitted: boolean = false;

    cols: any[] = [];


    Total_Clients : number =0;
    Total_Active_Clients : number =0;
    Total_Inactive_Clients : number =0;

    Total_Contacts : number =0;
    Total_Active_Contacts : number =0;
    Total_Inactive_Contacts : number =0;
    FullName:string=" ";

    Staff: Staff={};


    constructor(private router: Router,private clientService: ArtClientService,private contactService: ContactClientService,
      private messageService: MessageService, private countryService: CountryService, private currencyService: CurrencyService,
      private StaffService: StaffService,private paintService:PaintService) { }

    ngOnInit() {

        this.paintService.getPaints().subscribe({next: (data: Paint[])=>{this.products=data;
        console.log(this.products)}});
      this.clientService.getArtClients().subscribe({next: (data: Client[])=>{this.clients=data}});



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

  navigateToContactClient(clientId: bigint) {
    this.router.navigate(['/crm/client/ContactClient', clientId]);
  }



  onCountrySelectionChangeS(selectedCountry: any) {
    if (selectedCountry && selectedCountry.countryId) {
      // this.client.shippingCountryId = selectedCountry.countryId;
    }
  }
  onCountrySelectionChangeB(selectedCountry: any) {
    if (selectedCountry && selectedCountry.countryId) {
      // this.client.billingCountryId = selectedCountry.countryId;
    }
  }
  onCountrySelectionChange(selectedCountry: any) {
    if (selectedCountry && selectedCountry.countryId) {
      // this.client.countryId = selectedCountry.countryId;
    }
  }

  onCurrencySelectionChange(selectedCurrency: any) {
    if (selectedCurrency && selectedCurrency.currencyId) {
      // this.client.defaultCurrencyId = selectedCurrency.currencyId;
    }
  }
  onStaffSelectionChange(selectedStaff: any) {
    if (selectedStaff && selectedStaff.staffId) {
      this.Staff.staffId = selectedStaff.staffId;
    }
  }




    ajouterPaint(){

        this.paint = {};
        this.submitted = false;
        this.paintDialog = true;
    }






    editPaint(paint: Paint) {
        this.paint = { ...paint };
        this.paintDialog = true;
    }


    //delete client
    deletePaint(paint: Paint) {
        this.deletePaintDialog = true;
        this.paint = { ...paint };
    }
    confirmDelete(){
      this.deletePaintDialog = false;
      this.clientService.deleteArtClientById(this.client.clientId!).subscribe(
        response => {
          if (response.message === 'Le client a été supprimé avec succès') {
            this.clientService.getArtClients().subscribe({next: (data: Client[])=>{this.clients=data;}});
            this.clients = this.clients.filter(val => val.clientId !== this.client.clientId);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
          }else{
            this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la suppression du client',life: 3000});
          }
        })
        this.client = {};
    }


    hideDialog() {
        this.paintDialog = false;
        this.submitted = false;
        this.StaffDialog=false;
        this.clientService.getArtClients().subscribe({next: (data: Client[])=>{this.clients=data;}});
    }


     saveClient() {
    //     this.submitted = true;
    //     if (this.client.company?.trim()&&this.client.iceClient?.trim()&&this.client.address?.trim()&&this.client.city?.trim()&&this.client.codeComptable?.trim()&&this.client.codeAuxi?.trim()&&this.client.defaultCurrencyId ) {
    //       if (this.client.clientId) {// la modification de client
    //         this.clientService.updateClient(this.client.clientId, this.client).subscribe(
    //           response => {
    //           if (response.message === 'Le client a été modifié avec succès') {
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: response.message, life: 3000 });
    //           } else {
    //             this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du client',life: 3000});
    //           }},error => {
    //             this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de la modification du client',life: 3000});});
    //
    //           } else if (!this.client.clientId) {// la creation de client
    //
    //             this.clientService.addNewClient(this.client).subscribe(responseMessage => {
    //             if (responseMessage === 'Le client a été ajouté avec succès') {
    //               this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le client a été ajouté avec succès', life: 3000 });
    //             }else {
    //               this.messageService.add({severity: 'error',summary: 'Error Message',detail: 'Une erreur s\'est produite lors de l\'ajout du client',life: 3000});
    //             }
    //           },error => {  this.messageService.add({severity: 'error',summary: 'Error',detail: 'Cet email est déjà utilisé',life: 3000
    //                 });
    //             });
    //       }
    //       this.clients = [...this.clients];
    //       this.paintDialog = false;
    //       this.client = {};
    //       this.ngOnInit()
    //
    //     } else{
    //       this.messageService.add({severity: 'warn',summary: 'Warning Message',detail: 'Remplir les champs vides!',life: 3000});
    //     }
      }








    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    exportToExcel(): void {
      const columnsToExport = [
        {field:'company', header: 'Societé' },
        {field:'staffFullName', header: 'Commercial'},
        {field:'email', header: 'Email' },
        {field:'phoneNumber', header: 'Tél' }];
      let filteredData = this.clients.map((row: Client) => {
        const newRow: any = {};
        for (const column of columnsToExport) newRow[column.header] = row[column.field as keyof Client];
        return newRow;
      });

      const headers = columnsToExport.map(column => column.header);
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData, { header: headers });
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'liste-Clients.xlsx';
      downloadLink.click();

  }




}




