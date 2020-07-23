import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.error = this.activatedRoute.snapshot.params.err;
  }

  getError() {
    switch (this.error) {
      case '404':
        return 'Страница не найдена.';
      case 'tech':
        return 'Ведутся технические работы.';
    }
  }
}
