import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    AfterViewInit,
    inject,
} from '@angular/core';
import {Planet} from '../../../../models/planet.model';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-planet-table-view',
    templateUrl: './planet-table-view.component.html',
    styleUrl: './planet-table-view.component.scss',
})
export class PlanetTableViewComponent implements AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;

    @Input()
    set planets(value: Planet[]) {
        if (value?.length) {
            this._planets = value;
            this.dataSource = new MatTableDataSource<Planet>(value);
            this.dataSource.sortingDataAccessor = (
                item: Planet,
                property: string
            ): string | number => {
                switch (property as "planetName" | "planetColor" | "planetRadiusKM" | "fromSun" | "fromEarth") {
                    case 'fromSun':
                        return item.distInMillionsKM?.fromSun ?? 0;
                    case 'fromEarth':
                        return item.distInMillionsKM?.fromEarth ?? 0;
                    case 'planetName':
                        return item.planetName;
                    case 'planetColor':
                        return item.planetColor;
                    case 'planetRadiusKM':
                        return item.planetRadiusKM;
                    default:
                        return '';
                }
            };
            if (this.sort) {
                this.dataSource.sort = this.sort;
            }
        }
    }

    get planets(): Planet[] {
        return this._planets;
    }

    @Output() planetId: EventEmitter<number> = new EventEmitter<number>();

    private _liveAnnouncer: LiveAnnouncer = inject(LiveAnnouncer);
    private _planets: Planet[] = [];

    displayedColumns: string[] = [
        'planetName',
        'planetColor',
        'planetRadiusKM',
        'fromSun',
        'fromEarth',
    ];

    dataSource: MatTableDataSource<Planet> = new MatTableDataSource<Planet>();

    planetToShow(id: number): void {
        this.planetId.emit(id);
    }

    announceSortChange(sortState: Sort): void {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }
}
