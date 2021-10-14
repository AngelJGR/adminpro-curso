import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
      Swal.fire('Save', 'Changes was saved successfully!', 'success');
    }, error => {
      this.profileForm.controls['name'].setValue(this.user.name);
      this.profileForm.controls['email'].setValue(this.user.email);
      Swal.fire('Error', error.error.msg, 'error');
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
      Swal.fire('Save', 'The Image was uploaded successfully', 'success');
    }, error => {
      console.log(error);
      Swal.fire('Error', 'An error was ocurred when image is loading', 'error');
    });
  }

}
