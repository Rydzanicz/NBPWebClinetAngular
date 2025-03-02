import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Body} from './body/body.component';


export const routes: Routes = [
  {path: '', component: Body},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
