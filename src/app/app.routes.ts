import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { About } from './pages/about/about';

export const routes: Routes = [
    {
        path: '',
        component: Register, 
        title: 'Regiser',
    },
    {
        path: 'about',
        component: About, 
        title: 'About',
    },
];
