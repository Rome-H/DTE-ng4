import { Routes, RouterModule } from '@angular/router';

import { DsContainerComponent } from './components/ds-container/ds-container.component';
import { DsListComponent } from './components/ds-container/ds-list/ds-list.component';
import { AppInitResolve } from './services/resolvers/app-init.resolve';
import { EditResolve } from './services/resolvers/edit.resolve';



export const routes: Routes = [

  { path: ':id',
    component: DsContainerComponent,
    resolve: {
      resolve: AppInitResolve
    },
    children: [
      { path: '', component: DsListComponent },
      { path: 'edit', component: DsListComponent,
        resolve: {
          edit: EditResolve
        },
      },
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {enableTracing: true});
