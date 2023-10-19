import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtClient as Client } from 'src/app/demo/api/ArtClient';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {ArtClientService} from "../../../service/artClient.service";
import {PaintService} from "../../../service/Paint.service";
import {Paint} from "../../../api/Paint";
import { DataView } from 'primeng/dataview';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import { FileUpload } from 'primeng/fileupload';


@Component({
    templateUrl: './newArtWorks.component.html',
    providers: [MessageService,ArtClientService,PaintService]
})
export class newArtWorksComponent implements OnInit {


    sortOptions: any[] = [];

    sortOrder: number = 0;

    sortField: string = '';


    client : Client ={};

    paint:Paint={};
    paints:Paint[]=[];


    materialsPossibilities:String[]=[
        "Watercolors",
        "Acrylic paints",
        "Oil paints",
        "Colored pencils",
        "Charcoal",
        "Pastels (soft and oil)",
        "Ink (pen and ink wash)",
        "Gouache paints",
        "Spray paint",
        "Collage materials (magazines, newspapers, fabric)",
        "Graphite pencils",
        "Markers (alcohol-based and water-based)",
        "Clay or sculpting materials",
        "Linocut or woodcut printing supplies",
        "Oil pastels",
        "Chalk",
        "Mixed media (combining various materials)",
        "Gold leaf or metallic foils",
        "Epoxy resin for resin art",
        "Found objects (recycled or natural materials)",
        "Digital art software and hardware (for digital artworks)",
        "Calligraphy pens and inks",
        "Airbrush and airbrush paints",
        "Glass or ceramic paints",
        "Woodburning tools (pyrography)",
        "Beads and jewelry-making supplies",
        "Fabric and textile dyes",
        "Sand and sand art tools",
        "Clay tools for pottery",
        "Stained glass materials"
    ];

    selectedMulti: any[] = [];
    inventoryStatusPossibilities=["INSTOCK","OUTOFSTOCK","LOWSTOCK"];

    name:any;
    materials:any;
    xDimension:any;
    yDimension:any;
    paintDescription:any;
    artistDescrption:any;
    price:any;
    quantity:any;
    inventoryStatus:any;
    rating:any;
    image:any;
    submitted:boolean=false;


    @ViewChild('fileUpload')
    fileUpload!: FileUpload;




    constructor(private router: Router,private clientService: ArtClientService,
      private messageService: MessageService,private paintService:PaintService,
                private http:HttpClient) { }

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


    onAddPaint() {

        this.submitted=true;

        if(this.paint.name && this.materials && this.paint.xDimension && this.paint.yDimension && this.paint.price && this.paint.quantity && this.paint.rating) {
            this.paint.materials=this.materials.join(" - ");
            this.paint = {...this.paint}
            console.log(this.paint);

            this.paintService.addPaint(this.paint);
            this.fileUpload.upload();
            this.paint={};
            this.router.navigateByUrl('/crm/galery');
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Paint added seccussfully' });

        }


    }



    uploadedFiles: any[] = [];


    onUpload(event: any) {
        console.log("called");
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }



    protected readonly environment = environment;
}




