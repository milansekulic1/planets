import {Component, OnInit} from '@angular/core';
import {PlanetService} from './planet.service';
import {Planet} from '../../models/planet.model';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlanetDialogComponent} from '../../shared/planet-dialog/planet-dialog.component';
import {ViewMode} from '../../models/view-mode.enum';
import {MatButtonToggleChange} from '@angular/material/button-toggle';

@Component({
    selector: 'app-planet-dashboard',
    templateUrl: './planet-dashboard.component.html',
    styleUrl: './planet-dashboard.component.scss'
})
export class PlanetDashboardComponent implements OnInit {
    planets: Planet[] = [];
    filteredPlanets: Planet[] = [];
    isTableView: ViewMode = ViewMode.List;
    private debounceTimeout?: ReturnType<typeof setTimeout>;

    constructor(private planetService: PlanetService,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.loadPlanets();
    }

    private loadPlanets(): void {
        this.planetService.getPlanets().subscribe({
            next: (planets: Planet[]) => {
                this.planets = planets;
                this.filteredPlanets = planets;
            },
            error: err => console.error('Failed to load planets', err)
        });
    }

    changeView(event: MatButtonToggleChange): void {
        this.isTableView = event.value;
    }

    openSinglePlanet(id: number) {
        this.router.navigate(['/planet-details', id]);
    }

    openCreateDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        const dialogRef = this.dialog.open(PlanetDialogComponent, dialogConfig);
        dialogRef.updateSize('500px');
        dialogRef.afterClosed().subscribe(result => {
            if (!result.flag) {
                this.loadPlanets();
            }
        });
    }

    searchPlanet(event: Event): void {
        const input = event.target as HTMLInputElement;
        clearTimeout(this.debounceTimeout);

        if (!input.value.trim()) {
            this.filteredPlanets = [...this.planets];
            return;
        }

        this.debounceTimeout = setTimeout(() => {
            const query = input.value.trim().toLowerCase();
            this.filteredPlanets = this.planets.filter(planet =>
                planet.planetName.toLowerCase().includes(query)
            );
        }, 300);
    }

    protected readonly ViewMode = ViewMode;
}
