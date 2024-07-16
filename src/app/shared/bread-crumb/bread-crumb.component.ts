import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})

export class BreadCrumbComponent implements OnInit{

  
  public bredcrumbItems = [
    
  ];
  
  @Input() currentLink = '';

  constructor(private actRoute: ActivatedRoute, public router:Router) {
    
    this.router.events.subscribe((res) => { 
        this.bredcrumbItems = [
          { label: 'Home', routerLink: ['/'] },
          { label: 'Page 1', routerLink: ['/page1'] },
          // { label: 'Page 2' }
        ];
        if(this.router.url!=="/"){
          this.bredcrumbItems.push({ label: 'Page 1', routerLink: [this.router.url] })
        }
    })
  }
  ngOnInit() {
    this.actRoute.paramMap.subscribe((params) => {
      console.log(params);
      // this.product_id = params.get('id')!;
    });

  
  }



}
