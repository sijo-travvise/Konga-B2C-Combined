import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserProfile } from 'src/app/Models/User';
import { RegExpValidators } from 'src/app/shared/validators';
interface SalutatioType {
  name: string;
  code: string;
}
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  providers: [MessageService],
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
  SalutationTypeArray: SalutatioType[];
  public userForm: FormGroup;
  isEditUserInfo: boolean = false;
  public userProfileData: any;
  @Output() updateUser: EventEmitter<any> = new EventEmitter();
  @Input() userinfo: UserProfile;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    this.SalutationTypeArray = [
      { name: 'Mr', code: 'Mr' },
      { name: 'Mrs', code: 'Mrs' },
      { name: 'Ms', code: 'Ms' },
    ];
  }
  ngOnInit(): void {
    this.buildForm();
    if (this.userinfo) {
      this.userFormData(this.userinfo);
      this.userForm.disable();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['userinfo'] &&
      changes['userinfo'].currentValue &&
      this.userForm
    ) {
      if (this.userinfo !== null && this.userinfo !== undefined) {
        this.userFormData(this.userinfo);
        this.userForm.disable();
      }
    }

    if (changes['userinfo'].previousValue) {
      this.userFormData(changes['userinfo'].currentValue);
    }
  }
  buildForm() {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      fName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(RegExpValidators.alphalettersWithSpaces),
        ],
      ],
      lName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
          Validators.pattern(RegExpValidators.alphalettersWithSpaces),
        ],
      ],
      emailID: ['', [Validators.required, Validators.email]],
      DOB: [null, [Validators.required]],
      pNumber: ['', [Validators.required]],
    });
  }
  get title() {
    return this.userForm?.get('title') as FormControl<any>;
  }
  get fName() {
    return this.userForm?.get('fName') as FormControl<any>;
  }
  get lName() {
    return this.userForm?.get('lName') as FormControl<any>;
  }
  get emailID() {
    return this.userForm?.get('emailID') as FormControl<any>;
  }
  get DOB() {
    return this.userForm?.get('DOB') as FormControl<any>;
  }
  get pNumber() {
    return this.userForm?.get('pNumber') as FormControl<any>;
  }
  onClick() {
    if (this.isEditUserInfo) {
      if (this.userForm.valid) {
        this.updateUser.emit(this.userForm.value);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully!',
        });
        this.isEditUserInfo = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Fill All Required Fields!',
        });
        this.userForm.markAllAsTouched();
      }
    } else {
      // Not in edit mode: enable form for editing
      this.userForm.enable();
      this.isEditUserInfo = true;
    }
  }

  userFormData(userData: UserProfile) {
    ;
    if (!this.userForm) return;

    // this.userForm.patchValue({
    //   title: this.SalutationTypeArray.find((pax: any) => pax.value === userData.v_Title),
    //   fName: userData.v_FirstName,
    //   lName: userData.v_LastName,
    //   emailID: userData.v_Email,
    //   DOB: new Date(userData.d_DOB),
    //   pNumber:  userData.v_PhoneNumber,
    //   profilePhotoURL: userData.nV_ProfilePictureFilePath,
    //   user_HTID: userData.i_User_HTID
    // });

    this.cdr.detectChanges();
  }
  enableEditing() {
    if (this.isEditUserInfo) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
    this.isEditUserInfo = !this.isEditUserInfo;
  }
}
