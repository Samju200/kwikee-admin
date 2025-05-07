import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSectorsComponent } from './list-sectors.component';

const routes: Routes = [{ path: '', component: ListSectorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSectorsRoutingModule { }
