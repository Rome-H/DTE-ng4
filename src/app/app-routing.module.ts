import { Routes, RouterModule } from '@angular/router';

import { DsContainerComponent } from './components/ds-container/ds-container.component';
import { DsListComponent } from './components/ds-container/ds-list/ds-list.component';
import { AppInitResolve } from './services/resolvers/app-init.resolve';
import { EditResolve } from './services/resolvers/edit.resolve';
import { EditGuard } from './services/guards/edit.guard';



export const routes: Routes = [

  {path: ':id',
    component: DsContainerComponent,
    resolve: {
      resolve: AppInitResolve
    },
    children: [
      {path: '', component: DsListComponent},
      {path: 'edit', component: DsListComponent,
        canActivate: [EditGuard], // TODO: tell that guard exec faster than resolve, so we can't get data to check
        resolve: {
        edit: EditResolve
      },
      },
    ]
  }
];

export const routing = RouterModule.forRoot(routes, {enableTracing: false});
