import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookiesService } from 'src/app/services/cookies.service';
import { HTTPService } from 'src/app/services/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(
    private readonly cookiesService: CookiesService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {}
}
