import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { ReactiveFormArrayComponent } from './reactive-form-array/reactive-form-array.component';

export const routes: Routes = [
    {path:'',component:DashboardComponent},
    {path:'home',component:DashboardComponent,title:'Home',canActivate:[authGuard]},
    {path:'login',component:LoginComponent,title:'Login Page'},
    {path:'about',component:AboutComponent,title:'About Us',canActivate:[authGuard]},
    {path:'temp-register',component:TemplateDrivenFormComponent,title:'Resgister User'},    
    {path:'register',component:ReactiveformComponent,title:'Resgister'},
    {path:'dynamic_ArrayForm_Control',component:ReactiveFormArrayComponent,title:'FormArray Reactive Form'},
    {path:'**',redirectTo:'/home'}
];  
