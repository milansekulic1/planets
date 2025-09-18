import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
    @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;
    @Output() fileSelected = new EventEmitter<File | null>();

    @Input()
    set imageDetails(value: { url: string, name: string }) {
        this._imageUrl = value.url;
        this.imageName = value.name;
        if (value.url) {
            this.convertUrlToFile(value.url);
        }
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    file: File | null = null;
    public imageName = '';
    private _imageUrl = '';

    onClick(): void {
        this.fileUpload.nativeElement.click();
    }

    onFileSelected(event: Event | File, file = false): void {
        let selectedFile;
        if (file) {
            selectedFile = event as File;
        } else if(event instanceof Event) {
            const input = event.target as HTMLInputElement;
            selectedFile = input.files?.[0] ?? null;
        }

        if (selectedFile && this.isImage(selectedFile)) {
            this.file = selectedFile;
            this.fileSelected.emit(this.file);
        } else {
            this.file = null;
            this.fileSelected.emit(null);
        }

        this.clearInputElement();
    }

    removeFile(): void {
        this.file = null;
        this.fileSelected.emit(null);
        this.clearInputElement();
    }

    isImage(file: File): boolean {
        return file.type.startsWith('image/');
    }

    private clearInputElement(): void {
        this.fileUpload.nativeElement.value = '';
    }

    private convertUrlToFile(url: string) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], this.imageName, {type: blob.type});
                this.onFileSelected(file, true);
            })
            .catch(error => {
                console.error('Error converting URL to file:', error);
            });
    }
}
