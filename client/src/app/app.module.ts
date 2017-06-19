import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms'
import { HttpModule }            from '@angular/http';

import { AppRoutingModule }      from './app-routing.module';
import { FlashMessagesModule }   from 'angular2-flash-messages';

import { AppComponent }          from './app.component';
import { NavbarComponent }       from './components/navbar/navbar.component';
import { HomeComponent }         from './components/home/home.component';
import { DashboardComponent }    from './components/dashboard/dashboard.component';
import { RegisterComponent }     from './components/register/register.component';

import { AuthService }           from './services/auth.service';
import { AuthGuard }             from './guards/auth.guard';
import { NotAuthGuard }          from './guards/notAuth.guard';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        DashboardComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        FlashMessagesModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        NotAuthGuard
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
