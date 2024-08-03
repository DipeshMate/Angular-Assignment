import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Order {
  product: string;
  quantity: number | null;
}

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  products: string[] = ["Pencil", "Eraser", "Pens", "Geometry box", "Sharpeners", "Notebooks", "Calculators", "Highlighters"];
  quantities: number[] = [0, 1, 2, 3, 4, 5];
  orders: Order[] = [{ product: '', quantity: 0 }];
  orderDisplayed = false;
  displayedOrders: Order[] = [];

  uttr: SpeechSynthesisUtterance;
  
  constructor() { 
    this.uttr = new SpeechSynthesisUtterance();
    this.uttr.lang = 'en-US';
  }

  // readOrder() {
  //   const text = this.displayedOrders.map(order => `Product Name: ${order.product}, Quantity: ${order.quantity}`).join('. ');
  //   this.uttr.text = text
  //   window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  // }

  ngOnInit(): void { }

  addRow(index: number) {
    if (this.orders[index].product && this.orders[index].quantity !== null) {
      
      if (this.orders[index].quantity === 0) {
        alert('please choose 1 or more than 1');
        return;
      }
      const isDuplicate = this.orders.some((order, i) => order.product === this.orders[index].product && i !== index)
      if (isDuplicate) {
        alert("can't import the same product");
        return;
      }
      else {
        this.orders.push({ product: '', quantity: 0 });
      }
    
    } else {
      alert('Please choose both product and quantity');
    }
  
   
  }

  validateRow(index: number) {
    if (this.orders[index].product && this.orders[index].quantity === null) {
      alert('Please choose a quantity');
    }
   if (!this.orders[index].product && this.orders[index].quantity !== null) {
       alert('Please choose a product');
    }
    
  }

  showOrder() {
    this.orders = this.orders.filter(order => order.product && order.quantity !== 0);
    if (this.orders.length === 0)
      {
      alert('there is nothing to show!!');
      this.orderDisplayed = false;
      }
      else {
        this.displayedOrders = [...this.orders];
      this.orderDisplayed = true;
    }
  }

  async speakText(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);
      window.speechSynthesis.speak(utterance);
    });
  }

  async readOrder() {
    const orders = this.displayedOrders;
    
    for (const order of orders) {
      const text = `Product Name: ${order.product}, Quantity: ${order.quantity}`;
      try {
        await this.speakText(text);
      } catch (error) {
        console.error('Error occurred while speaking:', error);
      }
    }
  }
  
}
