import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import BatchManagement from './BatchManagement'

const BatchDetails = () => {
    const {batches} = useContext(AppContext)

    const {id} = useParams()
    const batch = batches.find(b => b.id === id)

  return (
    <div>
    <BatchManagement batch={batch} />
    </div>
  )
}

export default BatchDetails
