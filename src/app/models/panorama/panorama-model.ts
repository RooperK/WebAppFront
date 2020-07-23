import {UserModel} from '../user/user.model';

export class PanoramaModel extends BaseModel {
  name: string;
  isPublic: boolean;
  position: number[]; // X Y Z
  tileSize: number[]; // X Y
  imageSizeHq: number[];
  imageSizeLq: number[];
  user: UserModel;
}
