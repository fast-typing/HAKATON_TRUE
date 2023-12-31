import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { CookiesService } from './services/cookies.service';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { PageComponent } from './page/page.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { EventsComponent } from './page/events/events.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductsComponent } from './page/products/products.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';

const mapConfig: YaConfig = {
  apikey: '54f1889a-0cc9-49d2-bfa1-c8d65d1fe91e',
  lang: 'ru_RU',
};

const routes: Routes = [
  { path: '', component: PageComponent, },
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageComponent,
    CardComponent,
    EventsComponent,
    CardProductComponent,
    ProductsComponent,
  ],
  imports: [
    CalendarModule,
    TabViewModule,
    AccordionModule,
    ProgressBarModule,
    FileUploadModule,
    ConfirmPopupModule,
    ToastModule,
    RatingModule,
    DividerModule,
    FormsModule,
    SelectButtonModule,
    InputNumberModule,
    InputMaskModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CarouselModule,
    DropdownModule,
    InputTextModule,
    AngularYandexMapsModule,
    DialogModule,
    BrowserModule,
    HttpClientModule,
    ProgressSpinnerModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  providers: [CookiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
