import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({ template: `` })
export class CallbackComponent implements OnInit {

  constructor(private okta: OktaAuthService) {}

  ngOnInit(): void {
    // Handles the response from Okta and parses tokens
    this.okta.handleAuthentication();
    console.log("asdfasdf");
  }
}
