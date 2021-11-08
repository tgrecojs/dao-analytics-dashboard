import { string, number } from 'prop-types'

const ViewNFT = ({
  daoName = 'default NFT name',
  price = 0,
  description = 'default NFT description',
  imgSrc = '/test.png'
}) => (
  <div className="nftWrapper">
    <h2>{daoName}</h2>
    <h4>{description}</h4>
    <p>Price: {price} ETH</p>
    <img src={imgSrc} alt={description} />
  </div>
)

ViewNFT.propTypes = {
  daoName: string,
  price: number,
  description: string,
  imgSrc: string
}

export default ViewNFT
