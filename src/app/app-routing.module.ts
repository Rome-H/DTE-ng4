import { Routes, RouterModule } from '@angular/router';

import {DsContainerComponent} from './components/ds-container/ds-container.component';
import {DsListComponent} from './components/ds-container/ds-list/ds-list.component';
import {FormBuilderComponent} from "./components/ds-container/form-builder/form-builder.component";

export const routes: Routes = [
  {path: ':id',
    component: DsContainerComponent,
    children: [
      {path: '', component: DsListComponent},
      {path: 'edit', component: DsListComponent},
    ]
  }

];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});
