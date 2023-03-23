import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContextProvider';


const CheckOut= ({ booking }) => {

    const{ user } = useContext(AuthContext);


    
    const buyeremail= user?.email;


    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const [clientSecret, setClientSecret] = useState("");


    const stripe = useStripe();
    const elements = useElements();

    const {  price,  _id } = booking;

    
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [ price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error.message)
        }
        else {
            setCardError('')
            // console.log('[PaymentMethod]', paymentMethod);
        }

        setSuccess('');
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        
                        email: buyeremail,

                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {


            const payment = {
                price,
                transactionId: paymentIntent.id,
                email: buyeremail,
                CourseId: _id,
                
            }

           

            fetch('http://localhost:5000/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess("Congratulation! Your Enroll Successfully.");
                        setTransactionId(paymentIntent.id);


                        toast.success("Congratulation! Your Payment Completed.")


                    }

                })

        }
        setProcessing(false)

        // console.log(paymentIntent);

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#808080',
                                },
                                backgroundColor: "#FFFFFF",
                                
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn px-3 py-2 bg-green-800 text-white mt-16 btn-sm'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Payment
                </button>
            </form>

            <p className='text-red-600'>{cardError}</p>

            {
                success && <div className='border-2 mt-16 rounded-lg border-green-500'>
                    <p className='w-full text-xl text-green-600 p-4 text-center font-bold'>{success} </p>
                    <p className=' text-xl text-green-600 p-4 text-center font-semibold'>Your Transaction Id: <span className='font-bold'>{transactionId}</span> </p>
                </div>
            }
        </>
    );
};

export default CheckOut;