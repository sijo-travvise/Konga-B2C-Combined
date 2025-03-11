import { style } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserProfileUpdate } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlightService } from 'src/app/services/flight.service';
import { SharedService } from 'src/app/services/shared.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
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
    private _userService: UserService
  ) {}
  ngOnInit() {
    this.currentUser = this.authenticationService.affliateUser;
    if (Object.keys(this.currentUser).length > 1) {
      this.user = this.currentUser;
      this.getUserFlightBookings(this.user.customerUser_ID);
    }
    //console.log('current user', this.user);
  }
  getUserFlightBookings(userid: any) {
    let obj = {
      UserID: userid.toString(),
    };

    this.flightService.GetUserFlightBookings(obj).subscribe({
      complete: () => {},
      error: (error: any) => {
        this.isLoading = false;
        //console.log('error',error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.statusText,
        });
      },
      next: (data: any) => {
        if (data.success) {
          this.flightHistoryData = data.data;
          this.isLoading = false;
          console.log('flightHistoryData', this.flightHistoryData);
        }
      },
    });
  }
  updateUserProfile(event: any) {
    console.log('user event for updating', event);
    
    let updateProfileData:UserProfileUpdate={
      id: this.user.customerUser_ID,
      email: event.emailID,
      title: event.title?.value || event.title,
      firstName: event.fName,
      lastName: event.lName,
      d_DOB: event.DOB,
      phoneNumber: event.pNumber.internationalNumber,
    }

    this.isLoading = true;

    this._userService.UpdateUserProfile(updateProfileData).subscribe({
      complete: () => {},
      error: (error: any) => {
        console.log('Error While Fetching', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!',
        });
        this.isLoading = false;
      },
      next: (data: any) => {
        if (data) {
          if (data.status === true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Profile Updated Successfully!',
            });
            //this.getUserProfile(this.currentUser?.user_HTID);

            this.isLoading = false;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: data.alertMSG,
            });
            this.isLoading = false;
          }
        } else {
          this.isLoading = false;
        }
      },
    });
  }
  onFileSelected(event:any){
    console.log("EVENT",event);
  }
}
