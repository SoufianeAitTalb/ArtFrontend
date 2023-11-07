import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {AuthService} from "../demo/service/AuthService";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,public authService:AuthService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'CRM',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Gallery',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/crm/gallery']
                    },
                    {
                        label: 'New ArtWorks',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/crm/newArtWorks']
                    },
                    {
                        label: 'Categories',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/crm/categories']
                    },

                ]
            }

        ];
    }
}
