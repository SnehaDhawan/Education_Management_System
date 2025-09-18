import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core';
import { Login } from './login/login';

 export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule)
  },
  {
    path: 'trainer',
    loadChildren: () => import('./modules/trainer/trainer-module').then(m => m.TrainerModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student-module').then(m => m.StudentModule)
  },
  { path: '**', redirectTo: 'login' }


 ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }