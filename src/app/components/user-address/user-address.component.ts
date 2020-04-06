import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  public addresses: any = [];

  constructor
  (
    private address: AddressService,
    private fb: FormBuilder,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses()
  {
    this.address.getUserAddresses()
        .subscribe(data => this.addresses = data);

  }


  /**
   *
   * Start of code for adding user address
   *
   **/
  showModal : boolean = false;

   // Create gettters for registation controls
  get name()
  {
    return this.addAddressForm.get('name');
  }

  get landmark()
  {
    return this.addAddressForm.get('landmark');
  }

  get city()
  {
    return this.addAddressForm.get('city');
  }

  get pincode()
  {
    return this.addAddressForm.get('pincode');
  }

  get state()
  {
    return this.addAddressForm.get('state');
  }

  get country()
  {
    return this.addAddressForm.get('country');
  }

  // End getters list


  addAddressForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    landmark: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    pincode: ['', [Validators.required, Validators.minLength(6)]],
    state: ['',[Validators.required, Validators.minLength(2)]],
    country: ['India', Validators.required],
  });


  //Submit form data through a service to the server


  errMsg = [];
  public error = [];


  onSubmit()
  {
    //console.log(this.addAddressForm.value);
    this.address.addUserAddress(this.addAddressForm.value)
        .subscribe(
          data => this.handleAddAddressResponse(data),
          error => this.handleAddAddressError(error),
        )
  }

  handleAddAddressResponse(data)
  {
    this.notification.showSuccess(data.message, "Success!");
    this.getAddresses();
    this.addAddressForm.reset();
  }

  handleAddAddressError(error)
  {
    this.error = error.error.errors;
  }

  /**
   * End of code for adding user address
   **/


  removeAddress(event: MouseEvent, id)
  {
    event.preventDefault();
    //console.log(id);
    this.address.removeUserAddress(id)
    .subscribe(data => {
      this.getAddresses(),
      this.notification.showSuccess(data.message, 'Success!')

    });
  }


  /**
   *
   * Start of code for editing user address
   *
   **/
  showeditModal : boolean = false;

  editAddress(event: MouseEvent, id)
  {
    event.preventDefault();

    this.address.getUserAddress(id)
    .subscribe(data =>
    {
      this.editAddressForm.setValue({
        id: data.data.id,
        name: data.data.name,
        landmark: data.data.landmark,
        city: data.data.city,
        pincode: data.data.pincode,
        state: data.data.state,
        country: data.data.country
      });
    })

    this.showeditModal = true;


  }

   // Create gettters for registation controls
   get editName()
   {
     return this.editAddressForm.get('name');
   }

   get editLandmark()
   {
     return this.editAddressForm.get('landmark');
   }

   get editCity()
   {
     return this.editAddressForm.get('city');
   }

   get editPincode()
   {
     return this.editAddressForm.get('pincode');
   }

   get editState()
   {
     return this.editAddressForm.get('state');
   }

   get editCountry()
   {
     return this.editAddressForm.get('country');
   }

   // End getters list


   editAddressForm = this.fb.group({
     id: [''],
     name: ['', [Validators.required, Validators.minLength(3)]],
     landmark: ['', [Validators.required, Validators.minLength(3)]],
     city: ['', [Validators.required, Validators.minLength(3)]],
     pincode: ['', [Validators.required, Validators.minLength(6)]],
     state: ['',[Validators.required, Validators.minLength(2)]],
     country: ['', Validators.required],
   });


   //Submit form data through a service to the server



   public errorUpdate = [];


   onUpdateSubmit()
   {
      console.log(this.editAddressForm.value.id);
     this.address.updateUserAddress(this.editAddressForm.value, this.editAddressForm.value.id)
         .subscribe(
           data => this.handleUpdateAddressResponse(data),
           error => this.handleUpdateAddressError(error),
         )
   }

   handleUpdateAddressResponse(data)
   {
     this.notification.showSuccess(data.message, "Success!");
     this.getAddresses();
     this.addAddressForm.reset();
   }

   handleUpdateAddressError(error)
   {
     this.errorUpdate = error.error.errors;
     console.log(this.errorUpdate);
   }

   /**
    * End of code for editing user address
    **/


}
