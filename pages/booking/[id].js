import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

export default function BookingScreen() {
  const router = useRouter()

  const [bookingData, setBookingData] = useState({})
  const [loading, setLoading] = useState(false)

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchBooking = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/bookings/${id}`,
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
      setBookingData(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      fetchBooking(router.query.id)
    }
  }, [router.query.id])

  console.log('bookingData', bookingData)

  return <Layout></Layout>
}
