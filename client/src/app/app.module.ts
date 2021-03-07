import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } 
       from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({

declarations: [

AppComponent,

DashboardComponent

],

imports: [

BrowserModule,
FormsModule,
HttpClientModule,
MaterialModule,
BrowserAnimationsModule,
ReactiveFormsModule

],

providers: [],

bootstrap: [AppComponent]

})

export class AppModule { }