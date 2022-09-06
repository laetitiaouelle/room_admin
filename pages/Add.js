import React from 'react'
import Construction from './components/Add/Construction'
import Estatetype from './components/Add/Estatetype'
import Parking from './components/Add/Parking'
import Partitioning from './components/Add/Partitioning'
import TransactionType from './components/Add/Transactiontype'
import Uploads from './components/Add/Uploads'
import MapView from './components/Map'
import SearchBar from './components/SearchBar'

function Add() {
  return (
    <div >
        <MapView/>
        <SearchBar/>
        <TransactionType/>
        <Estatetype/>
        
        <Parking/>
        <Uploads/>
    </div>
  )
}

export default Add