import {ImageModel} from '../image/image.model';
import {LocationModel} from '../location/location.model';

export class PanoramaPreviewModel extends BaseModel{
  name: string;
  image: ImageModel;
}
