import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductOrderComponent } from './product-order.component';

describe('ProductOrderComponent', () => {
  let component: ProductOrderComponent;
  let fixture: ComponentFixture<ProductOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOrderComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new row when Add button is clicked', () => {
    component.orders[0].product = 'Product1';
    component.orders[0].quantity = 1;
    component.addRow(0);
    expect(component.orders.length).toBe(2);
  });

  it('should validate row and show alert if product or quantity is missing', () => {
    spyOn(window, 'alert');
    component.orders[0].product = 'Product1';
    component.addRow(0);
    expect(window.alert).toHaveBeenCalledWith('Please choose both product and quantity');
  });

  it('should show order and remove unfilled rows', () => {
    component.orders[0].product = 'Product1';
    component.orders[0].quantity = 1;
    component.orders.push({ product: '', quantity: 0 });
    component.showOrder();
    expect(component.displayedOrders.length).toBe(1);
  });
});
