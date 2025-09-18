import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanetDashboardComponent} from './planet/planet-dashboard/planet-dashboard.component';
import {PlanetDetailsComponent} from './planet/planet-dashboard/detail/planet-details/planet-details.component';

const routes: Routes = [
    {path: 'dashboard', component: PlanetDashboardComponent},
    {path: 'planet-details/:id', component: PlanetDetailsComponent},
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
