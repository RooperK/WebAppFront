
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication-service';
import {CategoryService} from '../../services/category-service';
import {CategoryModel} from '../../models/category/category.model';
import {Router} from '@angular/router';
import {PictureService} from '../../services/picture.service';
import {UserModel} from '../../models/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: CategoryModel[];
  searchForm: FormGroup;
  currentUser: UserModel;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthenticationService, private categoryService: CategoryService) {
  }

  get f() {
    return this.searchForm.controls;
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search_text: ['', Validators.required],
    });
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
    if (this.authService.currentUserValue) {
      this.currentUser = this.authService.currentUserValue;
    } else {
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  setCurrentCategory(category: CategoryModel) {
    this.categoryService.setCurrentCategory(category);
    this.router.navigate(['/filter', category.id]);
  }

  getCurrentCategoryName() {
    if (this.categoryService.getCurrentCategory()) {
      return this.categoryService.getCurrentCategory().name;
    } else {
      return 'Категория';
    }
  }

  onSubmit() {
    if (this.searchForm.invalid && this.searchForm.errors !== null) {
      return;
    }

    const catId = this.categoryService.getCurrentCategory() ? this.categoryService.getCurrentCategory().id : 0;
    this.router.navigate(['/search', catId, this.f.search_text.value]);
  }

  logout() {
    this.authService.logout();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  getAvatar() {
    return PictureService.getAvatarSrc(this.authService.currentUserValue.avatar);
  }
}
