import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { About } from './pages/about/about';
import { List } from './pages/list/list';

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
    {
        path: 'registered-list',
        component: List, 
        title: 'User List',
    },
];
