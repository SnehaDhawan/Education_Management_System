import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core';
import { roleGuard } from './guards/role.guard';
import { Login } from './login/login';
import { CompilerComponent } from './modules/student/compiler/compiler.component';

//  export const routes: Routes = [
// { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: Login },

//   {
//     path: 'admin',
//     loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule)
//   },
//   {
//     path: 'trainer',
//     loadChildren: () => import('./modules/trainer/trainer-module').then(m => m.TrainerModule)
//   },
//   {
//     path: 'student',
//     loadChildren: () => import('./modules/student/student-module').then(m => m.StudentModule)
//   },
//   { path: '**', redirectTo: 'login' }
//  ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule),
    canActivate: [roleGuard],               // 👈 Protect admin routes
    data: { role: 'ADMIN' }
  },
  {
    path: 'trainer',
    loadChildren: () => import('./modules/trainer/trainer-module').then(m => m.TrainerModule),
    canActivate: [roleGuard],               // 👈 Protect trainer routes
    data: { role: 'TRAINER' }
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student-module').then(m => m.StudentModule),
    canActivate: [roleGuard],               // 👈 Protect student routes
    data: { role: 'STUDENT' }
  },

  {path: 'compiler', component: CompilerComponent } ,

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}