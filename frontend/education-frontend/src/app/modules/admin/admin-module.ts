import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { BatchCreateComponent } from './batches/batch-create/batch-create.component';
import { BatchListComponent } from './batches/batch-list/batch-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BatchCreateComponent,  
    BatchListComponent ,
  ]
})
export class AdminModule { }
