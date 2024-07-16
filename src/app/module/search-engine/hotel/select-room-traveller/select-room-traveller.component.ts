import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchRoomsInfo } from 'src/app/Models/SearchRoomsInfo';

@Component({
  selector: 'app-select-room-traveller',
  templateUrl: './select-room-traveller.component.html',
  styleUrls: ['./select-room-traveller.component.scss']
})
export class SelectRoomTravellerComponent {
  public isAdultButtonDisable = false;
  public isChildButtonDisable = false;
  room_list: any[] = [];
  @Input() searchRoomsInfo: SearchRoomsInfo[] = [];
  public roomCount: number = 1;
  @Input() totalAdultCount: number = 1;
  @Input() totalChildCount: number = 0;

  passenger: any = {
    adult: 1,
    childeren: 0,
    total: 1,
  };
  @Output() AdultChange = new EventEmitter<any>();
  @Output() ChildChange = new EventEmitter<any>();
  @Output() GetSearchRoomsInfo = new EventEmitter<any>();
  @Output() total_room_count = new EventEmitter<any>();

  ngOnInit(): void {
    // debugger;
    //this.passengerChange.emit(this.passenger);
    this.total_room_count.emit(this.room_list.length);
    if (this.searchRoomsInfo.length == 0) {
      this.searchRoomsInfo.push({
        adultCount: 1,
        childDetails: [],
        showorhide: true,
      });
    } else {
      this.searchRoomsInfo[0].showorhide = true;
    }
    this.roomCount = this.searchRoomsInfo.length;
  }

  IncrementAdult(roomIndex: number, e: any) {
    this.StopEventProp(e);
    this.searchRoomsInfo[roomIndex].adultCount++;
    this.totalAdultCount++;
    this.AdultChange.emit(this.totalAdultCount);
    this.GetSearchRoomsInfo.emit(this.searchRoomsInfo);
  }

  DecrementAdult(roomIndex: number, e: any) {
    this.StopEventProp(e);
    if (this.searchRoomsInfo[roomIndex].adultCount > 1) {
      this.searchRoomsInfo[roomIndex].adultCount--;
      this.totalAdultCount--;
      this.AdultChange.emit(this.totalAdultCount);
      this.GetSearchRoomsInfo.emit(this.searchRoomsInfo);
    } else {
      this.removeRoom(roomIndex, e);
    }
  }

  IncrementChild(roomIndex: number, e: any) {
    this.StopEventProp(e);
    this.totalChildCount++;
    this.searchRoomsInfo[roomIndex].childDetails.push({ childAge: 17 });
    this.ChildChange.emit(this.totalChildCount);
    this.GetSearchRoomsInfo.emit(this.searchRoomsInfo);
  }

  DecrementChild(roomIndex: number, e: any) {
    this.StopEventProp(e);

    if (
      this.totalChildCount > 0 &&
      this.searchRoomsInfo[roomIndex].childDetails.length > 0
    ) {
      this.totalChildCount--;
      this.searchRoomsInfo[roomIndex].childDetails.splice(-1);
      this.ChildChange.emit(this.totalChildCount);
      this.GetSearchRoomsInfo.emit(this.searchRoomsInfo);
    }
  }

  ChildAgeChange(e: any, roomIndex: number, childIndex: number) {
    this.searchRoomsInfo[roomIndex].childDetails[childIndex].childAge =
      e.target.value;
    this.GetSearchRoomsInfo.emit(this.searchRoomsInfo);
  }

  StopEventProp(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  addAnotherRoom(e: any) {
    this.StopEventProp(e);
    //this.room_list.push({});
    this.roomCount++;
    this.searchRoomsInfo.forEach((element) => {
      element.showorhide = false;
    });
    this.searchRoomsInfo.push({
      adultCount: 1,
      childDetails: [],
      showorhide: true,
    });
    this.total_room_count.emit(this.roomCount);
    this.totalAdultCount++;
    this.AdultChange.emit(this.totalAdultCount);
    this.GetSearchRoomsInfo.emit(this.searchRoomsInfo);
  }

  removeRoom(index: number, e: any) {
    this.StopEventProp(e);
    //this.room_list.splice(index,1);
    if (this.roomCount > 1) {
      this.totalAdultCount =
        this.totalAdultCount - this.searchRoomsInfo[index].adultCount;
      this.AdultChange.emit(this.totalAdultCount);

      this.totalChildCount =
        this.totalChildCount - this.searchRoomsInfo[index].childDetails.length;
      this.ChildChange.emit(this.totalChildCount);

      this.roomCount--;

      this.searchRoomsInfo.splice(index, 1);
      this.total_room_count.emit(this.roomCount);
      this.GetSearchRoomsInfo.emit(this.searchRoomsInfo);
    } else {
      // Swal.fire({
      //   icon: 'warning',
      //   // title: 'You must have at least one room',
      //   html:
      //     'You must have at least one room',
      //   showConfirmButton: true,
      //   // timer: 1500,
      // });
      alert("You must have at least one room");
    }
    this.searchRoomsInfo[this.searchRoomsInfo.length - 1].showorhide = true;
  }
  editRoom(index: number, e: any){
    // debugger
    this.StopEventProp(e);
    this.searchRoomsInfo.forEach((element,i) => {
      if(i==index){
        element.showorhide = true;
      }
      else{
        element.showorhide = false;
      }
    });
    // this.searchRoomsInfo.showorhide = true;
    // this.searchRoomsInfo.splice(index, 1);
  }
}
