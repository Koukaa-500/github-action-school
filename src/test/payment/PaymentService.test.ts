import { PaymentAdapter } from '../../app/payment/PaymentAdapter';
import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const paymentDetails : PaymentDetails = {amount : 123 ,currency:'DT' , method:PaymentMethod.CreditCard }
    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    const mockProcessPaymentResponse = {
      status:'success',
      transactionId:'txn_1234567890'
    }
     paymentAdapterMock.processPayment.mockImplementation(()=>
      mockProcessPaymentResponse
     )
    //TODO: Mock processPayment implementation
    // Act
    const result = paymentService.makePayment(paymentDetails);
    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    expect(result).toEqual(`Payment successful. Transaction ID: ${mockProcessPaymentResponse.transactionId}`)
    // Check that processPayment inside makePayment has been called with paymentDetails
  });

  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const paymentDetails : PaymentDetails = {amount : 123 ,currency:'DT' , method:PaymentMethod.CreditCard }
    //TODO: Create mockProcessPaymentResponse object containing failure status
    const mockProcessPaymentResponse = {
      status:'failed'
    }
     paymentAdapterMock.processPayment.mockImplementation(()=>
      mockProcessPaymentResponse
     )
    //TODO: Mock processPayment implementation
    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const paymentDetails : PaymentDetails = {amount : 0 ,currency:'DT' , method:PaymentMethod.CreditCard }
    
    // Act & Assert
    
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  });
});
