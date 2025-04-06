import { style } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  providers: [MessageService],
  styleUrls: ['./customer-profile.component.scss'],
})
export class CustomerProfileComponent {
  public flightHistoryData: Array<any> = [];
  activeIndex = 0;
  activeFilterIndex = 0;
  public isLoading: boolean = false;
  public currentUser: User | undefined;
  user: any = null;
  public userProfileData: any;
  constructor(
    private sharedService: SharedService,
    private flightService: FlightService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.currentUser = this.authenticationService.affliateUser;
    if (Object.keys(this.currentUser).length > 1) {
      this.user = this.currentUser;
      this.getUserFlightBookings(this.user.customerUser_ID);
    }
  }
  getUserFlightBookings(userid: any) {
    let obj = {
      UserID: userid.toString(),
    };
    
    this.isLoading = true;
    this.flightService.GetUserFlightBookings(obj).subscribe({
      complete: () => {
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.statusText,
        });
      },
      next: (data: any) => {
        if (data.success) {
          this.flightHistoryData = data.data;
          console.log("flight history",this.flightHistoryData);
          this.isLoading = false;
        }
      },
    });
  }
}
