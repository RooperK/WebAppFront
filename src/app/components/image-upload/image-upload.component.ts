import {Component, Input, NgZone, OnInit} from '@angular/core';
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {AdditemComponent} from '../../pages/additem/additem.component';
import {EditUserComponent} from '../edit-user/edit-user.component';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile } from 'ng2-file-drop';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input()
  responses: Array<any>;
  @Input() addItemComponent: AdditemComponent;
  @Input() editUserComponent: EditUserComponent;
  private readonly title: string;

  constructor() {
    this.responses = [];
    this.title = '';
  }

  ngOnInit(): void {

  }
  private dragFileOverStart() {
  }

  // File being dragged has moved out of the drop region
  private dragFileOverEnd() {
  }

  // File being dragged has been dropped and is valid
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
  }

  // File being dragged has been dropped and has been rejected
  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
  }

  private dragFilesDropped(droppedFile: Ng2FileDropFilesDropped) {

  }
}
