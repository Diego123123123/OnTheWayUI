import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminComponent } from './create-admin.component';
import { MdbCardComponent, ModalModule, MdbCardBodyComponent } from 'angular-bootstrap-md';
import { DialogComponent } from '../../../common/dialog/dialog.component';
import { PipeModule } from '../../../modules/pipe/pipe.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '../../../common/dialog/dialog.service';
import { UserService } from '../../../services/user.service';

describe('CreateAdminComponent', () => {
  let component: CreateAdminComponent;
  let fixture: ComponentFixture<CreateAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdminComponent, MdbCardComponent, MdbCardBodyComponent, DialogComponent],
      imports: [PipeModule, RouterTestingModule, FormsModule, ModalModule.forRoot(), ReactiveFormsModule],
      providers: [DialogService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminComponent);
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

});
