import { Component, Input } from '@angular/core'

@Component({
  selector: 'category-card',
  templateUrl: 'category-card.component.html',
  styleUrls: ['category-card.component.css'],
})
export class CategoryCard {
  @Input()
  category_img: string =
    'https://images.unsplash.com/photo-1632094183960-266df564e674?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8VG9iYWNjb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  @Input()
  image_alt: string = 'image'
  @Input()
  name: string = 'Dry Grocery'
  constructor() {}
}
