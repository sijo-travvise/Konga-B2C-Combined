import { Component } from '@angular/core';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss']
})
export class ReviewPostComponent {
  rating: string;
  public countryOptionList: any = [];
  
}
