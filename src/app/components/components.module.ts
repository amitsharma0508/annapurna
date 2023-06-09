import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ItemCard } from './item-card/item-card.component'
import { SectionHeading } from './section-heading/section-heading.component'
import { CategoryCard } from './category-card/category-card.component'
import { BlogPostCard } from './blog-post-card/blog-post-card.component'

@NgModule({
  declarations: [ItemCard, SectionHeading, CategoryCard, BlogPostCard],
  imports: [CommonModule, RouterModule],
  exports: [ItemCard, SectionHeading, CategoryCard, BlogPostCard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
