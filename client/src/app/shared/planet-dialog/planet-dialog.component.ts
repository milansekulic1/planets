import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {Planet} from '../../models/planet.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlanetService} from '../../planet/planet-dashboard/planet.service';
import {ConfirmAction, ConfirmActionType} from '../../models/confirm-action.enum';
type FormDataObject = {
    [key: string]: string | number | boolean | File | FormDataObject | null | undefined;
};

@Component({
    selector: 'app-planet-dialog',
    templateUrl: './planet-dialog.component.html',
    styleUrl: './planet-dialog.component.scss'
})
export class PlanetDialogComponent implements OnInit {
    planetForm!: FormGroup;
    uploadedFile: File | null = null;
    public imageDetails = {name: '', url: ''};


    constructor(public dialogRef: MatDialogRef<PlanetDialogComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public planet: Planet,
                private formBuilder: FormBuilder, private planetService: PlanetService) {
    }

    ngOnInit(): void {
        this.createFormPlanet();
        if (this.planet) {
            this.planetForm.patchValue(this.planet);
            this.imageDetails = {
                name: this.planet.imageName,
                url: this.planet.imageUrl,
            }
        }
    }

    createFormPlanet() {
        this.planetForm = this.formBuilder.group({
            planetName: ['', Validators.required],
            description: [''],
            planetRadiusKM: [''],
            planetColor: [''],
            distInMillionsKM: this.formBuilder.group({
                fromSun: [''],
                fromEarth: ['']
            })
        });
    }

    openConfirmationDialog() {
        if (this.planetForm.invalid) {
            this.planetForm.markAllAsTouched();
            return;
        }
        let mode = ConfirmActionType.Create;
        let action = ConfirmAction.Creating;
        if (this.planet) {
            mode = ConfirmActionType.Edit;
            action = ConfirmAction.Editing;
        }
        const confDialogRef = this.dialog.open<ConfirmationDialogComponent, {
            planetName: string,
            mode: string,
            action: string
        }, { flag: boolean, mode: string }>(ConfirmationDialogComponent, {
            data: {planetName: this.planetForm.get('planetName')?.value, mode, action}
        });
        confDialogRef.updateSize('400px');
        confDialogRef.afterClosed().subscribe(result => {
            if (result?.flag) {
                this.submitForm();
                this.closeDialog();
            }
        });
    }


    submitForm(): void {
        const formData = new FormData();
        if (this.uploadedFile) {
            formData.append('file', this.uploadedFile);
        }
        const appendFormData = (data: FormDataObject, parentKey: string = '') => {
            Object.entries(data).forEach(([key, value]) => {
                const formKey = parentKey ? `${parentKey}[${key}]` : key;
                if (typeof value === 'object' && value !== null && !(value instanceof File)) {
                    appendFormData(value, formKey);
                } else {
                    formData.append(formKey, String(value));
                }
            });
        };
        appendFormData(this.planetForm.getRawValue());
        if (this.planet) {
            this.planetService.updatePlanet(formData, this.planet.id).subscribe(response => {
                this.closeDialog(false, response);
            });
        } else {
            this.planetService.createPlanet(formData).subscribe();
        }
    }

    closeDialog(flag? : boolean, planet?: Planet): void {
        this.dialogRef.close({flag, planet});
    }

    onFileReceived(file: File | null) {
        this.uploadedFile = file;
    }
}
