import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Planet} from '../../../../models/planet.model';
import {PlanetService} from '../../planet.service';
import {PlanetDialogComponent} from '../../../../shared/planet-dialog/planet-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import {ConfirmAction, ConfirmActionType} from '../../../../models/confirm-action.enum';

@Component({
    selector: 'app-planet-details',
    templateUrl: './planet-details.component.html',
    styleUrl: './planet-details.component.scss'
})
export class PlanetDetailsComponent implements OnInit {
    planet = signal<Planet>({} as Planet);
    private planetId: number;

    constructor(private planetService: PlanetService,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private router: Router) {
        this.planetId = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
        this.getPlanet(this.planetId);
    }

    getPlanet(id: number) {
        this.planetService.getPlanetById(id).subscribe((planet: Planet) => {
            this.planet.set(planet);
        });
    }

    openEditDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = this.planet();
        const dialogRef = this.dialog.open(PlanetDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result.planet) {
                this.planet.set(result.planet);
            }
        });
    }

    openDeleteConfirmationDialog(): void {
        const dialogRef = this.dialog.open<ConfirmationDialogComponent, {
            planetName: string,
            mode: string,
            action: string
        }, { flag: boolean; mode: string }>(ConfirmationDialogComponent, {
            data: {planetName: this.planet().planetName, mode: ConfirmActionType.Delete, action: ConfirmAction.Deleting}
        });
        dialogRef.updateSize('400px');
        dialogRef.afterClosed().subscribe((result) => {
            if (result?.flag) {
                this.planetService.deletePlanet(this.planetId).subscribe(() => {
                    this.router.navigate(['/dashboard']);
                });
            }
        });
    }

}
