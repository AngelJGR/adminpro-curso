import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public image: File;
  public imgTemp: string | ArrayBuffer = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name || '', Validators.required],
      email: [this.user.email || '', [Validators.required, Validators.email]],
    });
  }

  updateProfile(){
    this.userService.updateProfile(this.profileForm.value).subscribe(() => {
      const { name, email } = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;
    });
  }

  changeImage(file: File) {
    this.image = file;
    if (!file) {return this.imgTemp = '';}

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    this.fileUploadService.updateImage(this.image, 'users', this.user.uid).then(img => {
      this.user.img = img;
    })
  }

}
