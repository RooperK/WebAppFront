import {Role} from '../role/role';
import {ImageModel} from '../image/image.model';

export class UserModel {
  id: string;
  name: string;
  email?: string;
  roles?: Role[];
  token?: string;
  avatar?: ImageModel;
}
