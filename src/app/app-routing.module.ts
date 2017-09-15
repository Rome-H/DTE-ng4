import { Routes, RouterModule } from '@angular/router';

import { DsContainerComponent } from './components/ds-container/ds-container.component';
import { DsListComponent } from './components/ds-container/ds-list/ds-list.component';
import { DsContainerResolve } from './services/resolvers/ds-container.resolve';


export const routes: Routes = [
  {path: ':id',
    component: DsContainerComponent,
    resolve: {
      table: DsContainerResolve // TODO: rename maybe
    },
    children: [
      {path: '', component: DsListComponent},
      {path: 'edit', component: DsListComponent},
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});
