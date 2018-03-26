import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';

const APP_ROUTES: Routes = [
    { path: 'photos', component: PhotosComponent },
    { path: 'load', component: LoadComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'photos' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
