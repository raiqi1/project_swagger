import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CheckOutAnd from '../../components/Checkout/CheckoutAnd'
import Layout from '../../components/Layout'

export default function CheckoutSuccessPage() {
  const [dataCheckout, setDataCheckout] = useState({})
  const [paymentData, setPaymentData] = useState({})
  const [selectedChannel, setSelectedChannel] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState({})
  const router = useRouter()

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const checkoutSuccessData = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/checkout/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Api-Key': 'VACABADEV',
          },
        },
      )

      if (!response.ok) {
        if (response.status === 401) {
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      setDataCheckout(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchPayment = async () => {
    try {
      // Pastikan token telah diinisialisasi sebelum memanggil fetchPayment
      if (!token) return

      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments/methods`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Api-Key': 'VACABADEV',
          },
        },
      )

      if (!response.ok) {
        if (response.status === 401) {
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      setPaymentData(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const postPayment = async ({ paymentChannel }) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments`,
        {
          method: 'POST',
          body: JSON.stringify({
            bookingId: dataCheckout.bookingId,
            paymentChannel,
            paymentMethodId: 'point',
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Api-Key': 'VACABADEV',
          },
        },
      )

      if (!response.ok) {
        if (response.status === 401) {
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      setPaymentSuccess(data.data)
      console.log('payment data', data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleChannelChange = (channel) => {
    setSelectedChannel(channel)
    console.log('Nilai yang dipilih:', channel)
  }

  const handlePayment = () => {
    if (!selectedChannel) {
      console.log('Pilih metode pembayaran terlebih dahulu!')
      return
    }
    postPayment({ paymentChannel: selectedChannel })
  }

  useEffect(() => {
    const id = window.location.pathname.split('/').pop()
    checkoutSuccessData(id)
  }, [])

  useEffect(() => {
    fetchPayment()
  }, [token]) // Memperbarui fetchPayment hanya ketika token berubah

  useEffect(() => {
    if (dataCheckout.id) {
      router.push(`/booking/${dataCheckout.bookingId}`)
    }
  }, [paymentSuccess])

  console.log('dataCheckout', dataCheckout)
  console.log('paymentData', paymentData)

  return (
    <Layout>
      <div className="flex gap-1">
        <h1 className="text-xl font-bold  ">Payment</h1>
        <span className="mt-[2px]">{'>'}</span>
        <h1 className="mt-[2px]">{dataCheckout.productType}</h1>
      </div>
      <div>
        <div>
          <CheckOutAnd dataCheckout={dataCheckout} />
        </div>
      </div>
      <div className="">
        {Array.isArray(paymentData) &&
          paymentData.map((p, i) => (
            <div key={i} className="flex">
              <div>
                <div className="flex mb-2 font-bold items-center">
                  <h1 className="mr-2">{p.name}</h1>
                  <h1 className="mr-2">{p.description}</h1>
                  <h1 className="mr-2">{p.code}</h1>
                </div>
                <div>
                  {p.channels.map((channel, i) => (
                    <div key={i} className="mb-2">
                      <input
                        type="radio"
                        id={channel.code}
                        name="paymentChannel"
                        value={channel.code}
                        checked={selectedChannel === channel.code}
                        onChange={() => handleChannelChange(channel.code)}
                        className="mr-2"
                      />
                      <label htmlFor={channel.code} className="mr-2">
                        {channel.name} - {channel.description}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Bayar
      </button>
    </Layout>
  )
}
