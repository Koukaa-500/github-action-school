import { PaymentAdapter } from './PaymentAdapter';
import { PaymentDetails } from './PaymentDetails';

export class PaymentService {
  private paymentAdapter: PaymentAdapter;

  constructor(paymentProcessor: PaymentAdapter) {
    this.paymentAdapter = paymentProcessor;
  }

  makePayment(paymentDetails: PaymentDetails): string {
    if (!paymentDetails.amount || paymentDetails.amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    const result = this.paymentAdapter.processPayment(paymentDetails);
    console.log(result);
    
    if (result.status === 'success') {
      console.log('hello');
      return `Payment successful. Transaction ID: ${result.transactionId}`;
      
    } else {
      console.log('error');
      throw new Error('Payment failed');
    }
  }
}
