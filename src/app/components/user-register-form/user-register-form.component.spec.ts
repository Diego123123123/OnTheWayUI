import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterFormComponent } from './user-register-form.component';
import { MdbCardComponent, MdbCardBodyComponent, ModalModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { DialogService } from '../../common/dialog/dialog.service';
import { UserService } from '../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClientModule } from '@angular/common/http';

describe('UserRegisterFormComponent', () => {
  let component: UserRegisterFormComponent;
  let fixture: ComponentFixture<UserRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisterFormComponent, MdbCardComponent, MdbCardBodyComponent, DialogComponent],
      imports: [FormsModule, ReactiveFormsModule, ModalModule.forRoot(), HttpClientModule, RouterTestingModule],
      providers: [DialogService, UserService, Md5]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.cardForm.valid).toBeFalsy(); 
  });

  it('name field validity', () => {
    let name = component.cardForm.controls['name']; 
    expect(name.valid).toBeFalsy(); 

    let errors = name.errors || {};
    expect(errors['required']).toBeTruthy(); 

    name.setValue("carla");
    errors = name.errors || {};
    expect(name.errors['pattern']).toBeTruthy();

    name.setValue("123");
    errors = name.errors || {};
    expect(errors['pattern']).toBeTruthy();

    name.setValue("./'/./");
    errors = errors || {};
    expect(name.errors['pattern']).toBeTruthy();
    
    name.setValue("Carla123");
    errors = errors || {};
    expect(errors['pattern']).toBeTruthy();

    name.setValue("Carla carla");
    errors = errors || {};
    expect(errors['pattern']).toBeTruthy();

    name.setValue("Carla");
    expect(name.valid).toBeTruthy();

    name.setValue("Carla Carla");
    expect(name.valid).toBeTruthy();
  });

  it('last name field validity', () => {
    let lastName = component.cardForm.controls['lastName']; 
    expect(lastName.valid).toBeFalsy(); 

    let errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy(); 

    lastName.setValue("chavez");
    errors = lastName.errors || {};
    expect(lastName.errors['pattern']).toBeTruthy();

    lastName.setValue("123");
    errors = lastName.errors || {};
    expect(errors['pattern']).toBeTruthy();

    lastName.setValue("./'/./");
    errors = errors || {};
    expect(lastName.errors['pattern']).toBeTruthy();
    
    lastName.setValue("Chavez123");
    errors = errors || {};
    expect(errors['pattern']).toBeTruthy();

    lastName.setValue("Chavez soliz");
    errors = errors || {};
    expect(errors['pattern']).toBeTruthy();

    lastName.setValue("Chavez Soliz");
    expect(lastName.valid).toBeTruthy();
  });

  it('cellphone field validity', () => {
    let cellPhone = component.cardForm.controls['cellPhone']; 
    expect(cellPhone.valid).toBeFalsy(); 

    let errors = cellPhone.errors || {};
    expect(errors['required']).toBeTruthy(); 

    cellPhone.setValue("ASdf./'/./");
    errors = errors || {};
    expect(cellPhone.errors['pattern']).toBeTruthy();

    cellPhone.setValue("12344");
    errors = cellPhone.errors || {};
    expect(cellPhone.errors['pattern']).toBeTruthy();

    cellPhone.setValue("76666");
    errors = cellPhone.errors || {};
    expect(errors['minlength']).toBeTruthy();

    cellPhone.setValue("7899994848");
    errors = cellPhone.errors || {};
    expect(errors['maxlength']).toBeTruthy();

    cellPhone.setValue("60600000");
    expect(cellPhone.valid).toBeTruthy();

    cellPhone.setValue("78787878");
    expect(cellPhone.valid).toBeTruthy();
  });

  it('email field validity', () => {
    let email = component.cardForm.controls['email']; 
    expect(email.valid).toBeFalsy(); 

    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy(); 

    email.setValue("test");
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();

    email.setValue("carla@gmail.com")
    expect(email.valid).toBeTruthy();
  });

  it('birthday field validity', () => {
    let birthday = component.cardForm.controls['birthday']; 
    expect(birthday.valid).toBeFalsy();

    let errors = birthday.errors || {};
    expect(errors['required']).toBeTruthy(); 

    let dateNow = new Date();
    let dateTest = new Date();

    dateTest.setFullYear(dateNow.getFullYear() - 600);
    birthday.setValue(dateTest);
    errors = birthday.errors || {};
    expect(errors['compare']).toBeTruthy();

    dateTest.setFullYear(dateNow.getFullYear() - 9);
    birthday.setValue(dateTest);
    errors = birthday.errors || {};
    expect(errors['compare']).toBeTruthy();

    dateTest.setFullYear(dateNow.getFullYear());
    birthday.setValue(dateTest);
    errors = birthday.errors || {};
    expect(errors['compare']).toBeTruthy();

    dateTest.setFullYear(dateNow.getFullYear() + 10);
    birthday.setValue(dateTest);
    errors = birthday.errors || {};
    expect(errors['compare']).toBeTruthy();

    dateTest.setFullYear(dateNow.getFullYear() - 60);
    birthday.setValue(dateTest);
    expect(birthday.valid).toBeTruthy();
  });

  it('password field validity', () => {
    let password = component.cardForm.controls['password'];
    let password2 = component.cardForm.controls['password2']; 

    expect(password.valid).toBeFalsy(); 
    expect(password2.valid).toBeFalsy(); 

    let errors = password.errors || {};
    let errors2 = password2.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors2['required']).toBeTruthy(); 

    password.setValue("a12");
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();
    password2.setValue("a12");
    errors2 = password2.errors || {};
    expect(errors2['minlength']).toBeTruthy();

    password.setValue("softure07-ontheway-2018-fundacion-jala");
    errors = password.errors || {};
    expect(errors['maxlength']).toBeTruthy();
    password2.setValue("softure07-ontheway-2018-fundacion-jala");
    errors2 = password2.errors || {};
    expect(errors2['maxlength']).toBeTruthy();

    password.setValue("ontheway-2018");
    password2.setValue("ontheway-2018-other");
    errors2 = password2.errors || {};
    expect(errors2['compare']).toBeTruthy();

    password.setValue("ontheway-2018");
    password2.setValue("ontheway-2018");
    expect(password.valid).toBeTruthy();
    expect(password2.valid).toBeTruthy();

  });
  
});
