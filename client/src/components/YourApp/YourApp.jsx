import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react'

export const YourApp = () => {

  const [baycData, setBaycData] = useState([])

  useEffect(() => {
    getBAYCData()
  }, [])

  const contractAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
  const apiUrl = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}?chain=eth&format=decimal`

  const getBAYCData = async () => {
    try {
      const apiResponse = await fetch(apiUrl, {
        headers: {
          'X-API-Key': '5AbnHY6C1k8qwlF5qwoqVZIJ5zHba1AuXFLjzu1b8JDtKSiSwVicyweLmIZH0L3Z'
        }
      })
      const images = []
      const jsonResponse = await apiResponse.json()
      for (let index = 0; index < 10; index++) {
        const metadata = jsonResponse.result[index].metadata
        const tokenId = jsonResponse.result[index].token_id
        const imageUrl = 'https://ipfs.io/ipfs/' + JSON.parse(metadata).image.split('/')[2]
        const openseaUrl = `https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${tokenId}`

        console.log('https://ipfs.io/ipfs/' + JSON.parse(metadata).image.split('/')[2])
        images.push({ openseaUrl, imageUrl })
      }
      setBaycData(images)
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <ConnectButton />
      {
        baycData && baycData[0] && baycData.map((img, index) => {
          return (
            <div>
              <img src={img.imageUrl} key={index} alt='' />
              <a href={img.openseaUrl} target="_blank" rel='noreferrer'>Buy on Opensea</a>
            </div>
          )
        })
      }
    </div>
  )

};
